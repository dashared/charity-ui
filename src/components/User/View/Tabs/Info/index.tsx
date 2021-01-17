import React, { FC } from "react";
import { Button, Card, Space } from "antd";
import { UserUser } from "@generated";
import RoleSwitch from "@lib/components/RoleSwitch";
import { useTranslation } from "@providers";
import { AuthConsumer } from "@providers/authContext";
import { Role } from "@providers/rbac-rules";

import UserInfo from "../../../Info";

const Actions: FC<{ userData: UserUser }> = () => {
  const { t } = useTranslation("User");

  return (
    <AuthConsumer>
      {({ user }) => {
        return (
          <RoleSwitch
            role={user.role}
            perform="user:actions" // user.isBlocked?
            yes={() => (
              <Space>
                <Button danger>{t("$views.buttons.edit")}</Button>
                <Button danger>{t("$views.buttons.block")}</Button>
              </Space>
            )}
          />
        );
      }}
    </AuthConsumer>
  );
};

export const InfoTab: FC<{ user: UserUser; role: Role }> = ({ user, role }) => {
  const { t } = useTranslation("User");

  return (
    // TODO: fill up with real data
    <Card
      bordered={false}
      title={t("$views.tab.info")}
      extra={<Actions userData={user} />}
    >
      <UserInfo user={user} role={role} />
    </Card>
  );
};
