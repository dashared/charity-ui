import React, { Component } from "react";
import { decode } from "@lib/utils/base64";
import { notify } from "@lib/utils/notification";
import { i18n } from "@providers";
import { AuthProvider, Credentials } from "@providers/authContext";
import {
  LoginFactory,
  UserApiModel,
  UserApiRole,
  UserRequestFactory,
} from "@providers/axios";
import { Role } from "@providers/rbac-rules";
import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

export type HeaderData = {
  user_id: string;
  role: UserApiRole;
  expires: number;
  token: string;
};

// TODO: replace or remove
function mapRole(apiRole: UserApiRole): Role {
  switch (apiRole) {
    case UserApiRole.Manager:
      return Role.manager;
    case UserApiRole.ContentManager:
      return Role.operator;
    case UserApiRole.SuperManager:
      return Role.supermanager;
    case UserApiRole.Admin:
      return Role.admin;
    case UserApiRole.User:
      return Role.visitor;
    case UserApiRole.Operator:
      return Role.operator;
  }
}

class Auth extends Component {
  state = {
    authenticated: localStorage.getItem("authenticated") === "true",
    user: {
      role: (localStorage.getItem("role") as Role) ?? Role.visitor,
      uuid: localStorage.getItem("uuid") ?? "",
      name: localStorage.getItem("name") ?? "",
      surname: localStorage.getItem("surname") ?? "",
    },
    accessToken: localStorage.getItem("accessToken") ?? "",
  };

  initiateLogin = (credentials: Credentials): void => {
    LoginFactory.apiLoginPost(credentials)
      .then((r) => {
        const headerData = this.parseHeader(r.headers.authorization);

        this.handleAuthentication(headerData); // TODO: replace
      })
      .catch((e) => {
        console.error(e);
        notify(i18n.t("Login:error", { error: e.message }), "error");
      });
  };

  logout = (): void => {
    localStorage.clear();

    this.setState({
      authenticated: false,
      user: {
        role: Role.visitor,
      },
      accessToken: "",
    });
  };

  handleAuthentication = async (headerData: HeaderData): Promise<void> => {
    const data = await UserRequestFactory.apiUserIdGet(headerData.user_id);

    if (data) {
      this.setSession(headerData, data.data);
    }
  };

  // Parse header https://git.infostrategic.com/hsecharity/android/-/blob/develop/app/src/main/java/com/hse/charity/screens/auth/AuthRepository.kt#L39
  parseHeader(authHeader: string): HeaderData {
    const fst = authHeader.indexOf(".");
    const lst = authHeader.lastIndexOf(".");
    const headerUndecodedData = authHeader.substring(fst + 1, lst);
    return {
      ...JSON.parse(decode(headerUndecodedData) ?? ""),
      token: authHeader,
    };
  }

  // Important data to save in LocalStorage
  saveToLocalStorage(role: Role, user: UserApiModel, token: string): void {
    localStorage.setItem("authenticated", "true");
    localStorage.setItem("role", role);
    localStorage.setItem("uuid", user.id ?? "");
    localStorage.setItem("name", user.first_name ?? "");
    localStorage.setItem("surname", user.last_name ?? "");
    localStorage.setItem("accessToken", token);
  }

  // Function that will be called to refresh authorization
  // eslint-disable-next-line
  refreshAuthLogic = (failedRequest: any) =>
    LoginFactory.apiLoginRefreshPost().then((tokenRefreshResponse) => {
      const headerData = this.parseHeader(
        tokenRefreshResponse.headers.authorization,
      );

      this.handleAuthentication(headerData);
      failedRequest.response.config.headers["Authorization"] =
        tokenRefreshResponse.headers.authorization;
      return Promise.resolve();
    });

  setSession(headerData: HeaderData, user: UserApiModel): void {
    const role = mapRole(headerData.role); // TODO: remove

    if (role === Role.visitor) {
      notify(i18n.t("Login:denied"));
      return;
    }

    this.saveToLocalStorage(role, user, headerData.token);

    this.setState({
      authenticated: true,
      user: {
        role,
        uuid: headerData.user_id,
        name: user.first_name,
        surname: user.last_name,
      },
      accessToken: headerData.token,
    });
  }

  render(): JSX.Element {
    const authProviderValue = {
      ...this.state,
      initiateLogin: this.initiateLogin,
      handleAuthentication: this.handleAuthentication,
      logout: this.logout,
    };

    // Instantiate the interceptor (you can chain it as it returns the axios instance)
    createAuthRefreshInterceptor(axios, this.refreshAuthLogic);

    axios.defaults.headers.common = {
      Authorization: `${this.state.accessToken}`,
    };

    return (
      <AuthProvider value={authProviderValue}>
        {this.props.children}
      </AuthProvider>
    );
  }
}

export default Auth;
