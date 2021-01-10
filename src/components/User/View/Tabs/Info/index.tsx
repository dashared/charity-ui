import React, { FC } from "react";
import { Button, Descriptions, Space } from "antd";
import { UserUser } from "@generated";
import RoleSwitch from "@lib/components/RoleSwitch";
import { useTranslation } from "@providers";
import { AuthConsumer } from "@providers/authContext";

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

export const InfoTab: FC<{ user: UserUser }> = ({ user }) => {
  const { t } = useTranslation("User");

  return (
    <Descriptions
      title={t("$views.tab.info")}
      extra={<Actions userData={user} />}
    ></Descriptions>
  );
};
