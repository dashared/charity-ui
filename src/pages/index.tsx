import React, { FC } from "react";
import RoleSwitch from "@lib/components/RoleSwitch";
import { AuthConsumer } from "@providers/authContext";
import Home from "Home";

import Redirect from "./_redirect";

const Index: FC = () => {
  return (
    <AuthConsumer>
      {({ user }) => {
        return (
          <RoleSwitch
            role={user.role}
            perform="auth:login"
            yes={() => <Home />}
            no={() => <Redirect name="applications:index" />}
          />
        );
      }}
    </AuthConsumer>
  );
};

export const name = "home";

export default Index;
