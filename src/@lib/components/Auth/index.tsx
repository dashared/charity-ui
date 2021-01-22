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
    authenticated: false,
    user: {
      role: Role.visitor, // Temporary solution without API
    },
    accessToken: "",
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
    this.setState({
      authenticated: true,
      user: {
        role: mapRole(headerData.role), // TODO: remove
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
