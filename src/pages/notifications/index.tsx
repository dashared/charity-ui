import React, { FC } from "react";
import { Card, Tabs } from "antd";
import RoleSwitch from "@lib/components/RoleSwitch";
import { useTranslation, Workspace } from "@providers";
import { AuthConsumer } from "@providers/authContext";
import Redirect from "pages/_redirect";

import { BlockchainNotificationsPage } from "components/Notifications/blockchain";

const { TabPane } = Tabs;

const NotificationsPage: FC = () => {
  const { t } = useTranslation("Notifications");

  return (
    <Workspace noRefresh title={t("title")}>
      <Card>
        <Tabs defaultActiveKey="1">
          <TabPane tab={t("all_title")} key="1">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab={t("blockchain_title")} key="2">
            <BlockchainNotificationsPage />
          </TabPane>
        </Tabs>
      </Card>
    </Workspace>
  );
};

export const name = "notifications:index";

export const pageComponent: FC = () => {
  return (
    <AuthConsumer>
      {({ user }) => {
        return (
          <RoleSwitch
            role={user.role}
            perform={name}
            yes={() => <NotificationsPage />}
            no={() => <Redirect name="home"></Redirect>}
          />
        );
      }}
    </AuthConsumer>
  );
};
