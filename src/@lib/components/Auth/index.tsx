import React, { Component } from "react";
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
      role: localStorage.getItem("role") as Role,
      uuid: localStorage.getItem("uuid") ?? "",
      name: localStorage.getItem("name") ?? "",
      surname: localStorage.getItem("surname") ?? "",
    },
    accessToken: localStorage.getItem("accessToken") ?? "",
  };

  initiateLogin = (credentials: Credentials): void => {
    LoginFactory.apiLoginPost(credentials).then((r) => {
      if (r.status === 400) {
        this.logout();
      } else {
        const fst = r.headers.http_auth.indexOf(".");
        const lst = r.headers.http_auth.lastIndexOf(".");
        const headerUndecodedData = r.headers.http_auth.substring(fst + 1, lst);
        const headerData = JSON.parse(atob(headerUndecodedData)) as HeaderData;

        this.handleAuthentication(headerData); // TODO: replace
      }
    });
  };

  logout = (): void => {
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

  setSession(headerData: HeaderData, user: UserApiModel): void {
    const role = mapRole(headerData.role); // TODO: remove

    localStorage.setItem("authenticated", "true");
    localStorage.setItem("role", role);
    localStorage.setItem("uuid", user.id ?? "");
    localStorage.setItem("name", user.first_name ?? "");
    localStorage.setItem("surname", user.last_name ?? "");

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
