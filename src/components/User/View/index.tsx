import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Card, Tabs, Tooltip } from "antd";
import {
  FolderOutlined,
  HistoryOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { AuthConsumer } from "@providers/authContext";
import { UserApiModel } from "@providers/axios";
import { check, Role } from "@providers/rbac-rules";

import { ApplicationsTab, InfoTab, SessionsTab } from "./Tabs";

type UserViewProps = {
  user: UserApiModel;
  role: Role;
};

const UserView: FC<UserViewProps> = ({ user }) => {
  const { t } = useTranslation("User");

  return (
    <AuthConsumer>
      {({ user: u }) => {
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
                <InfoTab user={user} role={u.role} />
              </Tabs.TabPane>

              <Tabs.TabPane
                key="2"
                disabled={!check(u.role, "user:view-applications")}
                tab={
                  <Tooltip title={t("$views.tab.applications")}>
                    <FolderOutlined />
                  </Tooltip>
                }
              >
                <ApplicationsTab userId={user.id ?? ""} />
              </Tabs.TabPane>

              <Tabs.TabPane
                disabled={!check(u.role, "user:view-sessions")}
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
      }}
    </AuthConsumer>
  );
};

export default UserView;
