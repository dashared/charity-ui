import React, { FC } from "react";
import RoleSwitch from "@lib/components/RoleSwitch";
import { AuthConsumer } from "@providers/authContext";
import Unauthorized from "pages/_unauthorized";

const ChatsPage: FC = () => {
  return <></>;
};

export const name = "chats:index";

export const pageComponent: FC = () => (
  <AuthConsumer>
    {({ user }) => {
      return (
        <RoleSwitch
          role={user.role}
          perform={name}
          yes={() => <ChatsPage />}
          no={() => <Unauthorized />}
        />
      );
    }}
  </AuthConsumer>
);
