import React, { Component } from "react";
import { AuthProvider, Credentials } from "@providers/authContext";
import { LoginFactory } from "@providers/axios";
import { Role } from "@providers/rbac-rules";

class Auth extends Component {
  state = {
    authenticated: false,
    user: {
      role: Role.visitor, // Temporary solution without API
    },
    accessToken: "",
  };

  initiateLogin = (credentials: Credentials): void => {
    console.log(credentials);

    LoginFactory.apiLoginPost(credentials).then((r) => {
      console.log(btoa(r.headers.split(".")));
    });

    this.handleAuthentication(); // TODO: replace
  };

  logout = (): void => {
    this.setState({
      authenticated: false,
      user: {
        role: Role.visitor,
      },
    });
  };

  handleAuthentication = (): void => {
    this.setSession();
  };

  setSession(): void {
    this.setState({
      authenticated: true,
      user: {
        role: Role.admin, // TODO: remove
        name: "Иван",
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
