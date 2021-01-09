import React, { FC } from "react";
import { Button, Card } from "antd";
import RoleSwitch from "@lib/components/RoleSwitch";
import { AuthConsumer } from "@providers/authContext";

const LoginPage: FC = () => {
  return (
    <AuthConsumer>
      {({ initiateLogin, user }) => {
        return (
          <RoleSwitch
            role={user.role}
            perform="auth:login"
            yes={() => (
              <Card>
                Hello!{" "}
                <Button type="primary" onClick={initiateLogin}>
                  Login
                </Button>
              </Card>
            )}
            no={() => <>You are authenticated {user.role}!</>}
          />
        );
      }}
    </AuthConsumer>
  );
};

export default LoginPage;
