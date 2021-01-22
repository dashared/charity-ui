import React, { FC } from "react";
import RoleSwitch from "@lib/components/RoleSwitch";
import { AuthConsumer } from "@providers/authContext";
import Redirect from "pages/_redirect";

import LoginForm from "components/Login";

const LoginPage: FC = () => {
  return (
    <AuthConsumer>
      {({ initiateLogin, user }) => {
        return (
          <RoleSwitch
            role={user.role}
            perform="auth:login"
            yes={() => <LoginForm onLogin={initiateLogin} />}
            no={() => <Redirect name="home" />}
          />
        );
      }}
    </AuthConsumer>
  );
};

export default LoginPage;
