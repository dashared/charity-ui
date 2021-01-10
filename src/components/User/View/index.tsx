import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Card, Tabs, Tooltip } from "antd";
import {
  FolderOutlined,
  HistoryOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { UserUser } from "@generated";
import { Role } from "@providers/rbac-rules";

import { ApplicationsTab, InfoTab, SessionsTab } from "./Tabs";

type UserViewProps = {
  user: UserUser;
  role: Role;
};

const UserView: FC<UserViewProps> = ({ user }) => {
  const { t } = useTranslation("User");

  return (
    <Card>
      <Tabs defaultActiveKey="1" tabPosition="left">
        <Tabs.TabPane
          key="1"
          tab={
            <Tooltip title={t("$views.tab.info")}>
              <InfoCircleOutlined />
            </Tooltip>
          }
        >
          <InfoTab user={user} />
        </Tabs.TabPane>

        <Tabs.TabPane
          key="2"
          tab={
            <Tooltip title={t("$views.tab.applications")}>
              <FolderOutlined />
            </Tooltip>
          }
        >
          <ApplicationsTab />
        </Tabs.TabPane>

        <Tabs.TabPane
          key="3"
          tab={
            <Tooltip title={t("$views.tab.sessions")}>
              <HistoryOutlined />
            </Tooltip>
          }
        >
          <SessionsTab />
        </Tabs.TabPane>
      </Tabs>
    </Card>
  );
};

export default UserView;
