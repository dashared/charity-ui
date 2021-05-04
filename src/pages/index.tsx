import React, { FC } from "react";
import Elm from "react-elm-components";
import RoleSwitch from "@lib/components/RoleSwitch";
import { router } from "@providers";
import { AuthConsumer } from "@providers/authContext";
import { Role } from "@providers/rbac-rules";
import Main from "Elm/Main.elm";

//import Home from "Home";
import Redirect from "./_redirect";

// eslint-disable-next-line
function setupPorts(ports: { clickedUrl: any }): void {
  ports.clickedUrl.subscribe((urlName: string) => {
    router.navigate({ url: router.url({ name: urlName }) });
  });
}

const Index: FC = () => {
  return (
    <AuthConsumer>
      {({ user }) => {
        return (
          <RoleSwitch
            role={user.role}
            perform="auth:login"
            yes={() => (
              /*<div style={{ background: "white" }}>*/
              <Elm
                src={Main.Elm.Elm.Main}
                flags={{ width: window.innerWidth, height: window.innerHeight }}
                ports={setupPorts}
              />
              //</div>
            )}
            no={() => {
              switch (user.role) {
                case Role.admin:
                  return <Redirect name="users:index" />;
                case Role.contentManager:
                  return <Redirect name="fund:description" />;
                case Role.operator:
                  return <Redirect name="chats:index" />;
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
