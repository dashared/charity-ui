import React, { Component } from "react";
import { AuthProvider } from "@providers/authContext";
import { Role } from "@providers/rbac-rules";

class Auth extends Component {
  state = {
    authenticated: true,
    user: {
      role: Role.supermanager, // Temporary solution without API
      name: "Hello W",
    },
    accessToken: "",
  };

  initiateLogin = (): void => {
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
