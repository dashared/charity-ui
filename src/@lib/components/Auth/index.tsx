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

export type HeaderData = {
  user_id: string;
  role: UserApiRole;
  expires: number;
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
    default:
      return Role.admin;
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
        const headerData = this.parseHeader(r.headers.http_auth);

        this.handleAuthentication(headerData); // TODO: replace
      })
      .catch((e) => {
        console.error(e);
        notify(i18n.t("Login:error"), "error");
      });
  };

  logout = (): void => {
    localStorage.clear();

    this.setState({
      authenticated: false,
      user: {
        role: Role.visitor,
      },
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
    return JSON.parse(decode(headerUndecodedData) ?? "") as HeaderData;
  }

  // Important data to save in LocalStorage
  saveToLocalStorage(role: Role, user: UserApiModel): void {
    localStorage.setItem("authenticated", "true");
    localStorage.setItem("role", role);
    localStorage.setItem("uuid", user.id ?? "");
    localStorage.setItem("name", user.first_name ?? "");
    localStorage.setItem("surname", user.last_name ?? "");
  }

  setSession(headerData: HeaderData, user: UserApiModel): void {
    const role = mapRole(headerData.role); // TODO: remove

    this.saveToLocalStorage(role, user);

    this.setState({
      authenticated: true,
      user: {
        role,
        uuid: headerData.user_id,
        name: user.first_name,
        surname: user.last_name,
      },
    });
  }

  render(): JSX.Element {
    const authProviderValue = {
      ...this.state,
      initiateLogin: this.initiateLogin,
      handleAuthentication: this.handleAuthentication,
      logout: this.logout,
    };

    return (
      <AuthProvider value={authProviderValue}>
        {this.props.children}
      </AuthProvider>
    );
  }
}

export default Auth;
