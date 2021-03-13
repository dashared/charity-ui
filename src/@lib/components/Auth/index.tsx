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

export type HeaderData = {
  user_id: string;
  role: UserApiRole;
  exp: number;
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
    expires: parseInt(localStorage.getItem("exp") ?? "0"),
  };

  initiateLogin = (credentials: Credentials): void => {
    LoginFactory.apiLoginPost(credentials)
      .then((r) => {
        const headerData = this.parseHeader(r.headers.authorization);

        this.handleAuthentication(headerData); // TODO: replace
      })
      .catch((e) => {
        if (e.response.status === 404 || e.response.status === 401) {
          notify(i18n.t(`Login:error.${e.response.status}`), "error");
        } else {
          notify(i18n.t("Login:error.undefined"), "error");
        }
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
      expires: undefined,
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
  saveToLocalStorage(
    role: Role,
    user: UserApiModel,
    exp: number,
    token: string,
  ): void {
    localStorage.setItem("authenticated", "true");
    localStorage.setItem("role", role);
    localStorage.setItem("uuid", user.id ?? "");
    localStorage.setItem("name", user.first_name ?? "");
    localStorage.setItem("surname", user.last_name ?? "");
    localStorage.setItem("accessToken", token);
    localStorage.setItem("exp", exp.toString());
  }

  // Function that will be called to refresh authorization
  // eslint-disable-next-line
  refreshAuthLogic = async (): Promise<HeaderData | undefined> =>
    LoginFactory.apiLoginRefreshPost()
      .then((r) => {
        return this.parseHeader(r.headers.authorization);
      })
      .catch(() => {
        return undefined;
      });

  setSession(headerData: HeaderData, user: UserApiModel): void {
    const role = mapRole(headerData.role); // TODO: remove

    if (role === Role.visitor) {
      notify(i18n.t("Login:error.denied"));
      return;
    }

    this.saveToLocalStorage(role, user, headerData.exp, headerData.token);

    this.setState({
      authenticated: true,
      user: {
        role,
        uuid: headerData.user_id,
        name: user.first_name,
        surname: user.last_name,
      },
      accessToken: headerData.token,
      expires: headerData.exp,
    });
  }

  render(): JSX.Element {
    const authProviderValue = {
      ...this.state,
      initiateLogin: this.initiateLogin,
      handleAuthentication: this.handleAuthentication,
      logout: this.logout,
    };

    // Add a request interceptor
    axios.interceptors.response.use(
      async (response) => {
        const originalResponce = response.config;

        if (originalResponce.url === `/api/login/refresh`) {
          return response;
        }

        const exp = parseInt(localStorage.getItem("exp") ?? "");

        if (exp && new Date(exp * 1000) < new Date()) {
          const headerData = await this.refreshAuthLogic();

          if (!headerData) {
            this.logout();
            return Promise.reject(response);
          }

          const { token, exp: expires } = headerData;

          localStorage.setItem("accessToken", token);
          localStorage.setItem("exp", expires.toString());

          axios.defaults.headers.common = {
            Authorization: token,
          };

          return axios(originalResponce);
        }

        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        if (originalRequest.url === `/api/login/refresh`) {
          return Promise.reject(error);
        }

        const exp = parseInt(localStorage.getItem("exp") ?? "");

        if (exp && new Date(exp * 1000) < new Date()) {
          const headerData = await this.refreshAuthLogic();

          if (!headerData) {
            this.logout();
            return Promise.reject(error);
          }

          const { token, exp: expired } = headerData;

          localStorage.setItem("accessToken", token);
          localStorage.setItem("exp", expired.toString());

          axios.defaults.headers.common = {
            Authorization: token,
          };

          return axios(originalRequest);
        }

        return Promise.reject(error);
      },
    );

    axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
          config.headers = {
            Authorization: token,
          };
        }

        console.log(
          config.url,
          config.headers.Authorization?.substr(
            config.headers.Authorization?.length - 10,
          ),
        );

        return config;
      },
      (error) => {
        Promise.reject(error);
      },
    );

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
