import React, { Component } from "react";
import { AuthProvider } from "@providers/authContext";
import { Role } from "@providers/rbac-rules";

class Auth extends Component {
  state = {
    authenticated: false,
    user: {
      role: Role.visitor,
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
        role: Role.manager,
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
