import React, { FC } from "react";
import RoleSwitch from "@lib/components/RoleSwitch";
import { AuthConsumer } from "@providers/authContext";
import { Role } from "@providers/rbac-rules";
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
            no={() => {
              switch (user.role) {
                case Role.admin:
                  return <Redirect name="users:index" />;
                case Role.operator:
                  return <Redirect name="fund:index" />;
                default:
                  return <Redirect name="applications:index" />;
              }
            }}
          />
        );
      }}
    </AuthConsumer>
  );
};

export const name = "home";

export default Index;
