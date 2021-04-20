import React, { FC } from "react";
import RoleSwitch from "@lib/components/RoleSwitch";
import { AuthConsumer } from "@providers/authContext";
import Unauthorized from "pages/_unauthorized";

const EditPage: FC = () => {
  return <>Help</>;
};

export const name = "news:edit";

export const pageComponent: FC = () => {
  return (
    <AuthConsumer>
      {({ user }) => {
        return (
          <RoleSwitch
            role={user.role}
            perform={name}
            yes={() => <EditPage />}
            no={() => <Unauthorized />}
          />
        );
      }}
    </AuthConsumer>
  );
};
