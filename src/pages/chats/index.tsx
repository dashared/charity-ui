import React, { FC } from "react";
import RoleSwitch from "@lib/components/RoleSwitch";
import { useTranslation, Workspace } from "@providers";
import { AuthConsumer } from "@providers/authContext";
import Unauthorized from "pages/_unauthorized";

// import styles from "./styles.module.less";

const ChatsPage: FC = () => {
  const { t } = useTranslation("Chats");

  return <Workspace title={t("title")} noRefresh></Workspace>;
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
