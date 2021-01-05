import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Card, Tabs, Tooltip } from "antd";
import { FontColorsOutlined, UserOutlined } from "@ant-design/icons";

import { PersonalSettingsTab } from "components/Settings";

const { TabPane } = Tabs;

const SettingsPage: FC = () => {
  const { t } = useTranslation("Settings");

  return (
    <Card title={t("title")}>
      <Tabs tabPosition="left">
        {/** Личные данные */}
        <TabPane
          tab={
            <Tooltip title={t("personal")}>
              <UserOutlined />
            </Tooltip>
          }
          key="personal"
        >
          <PersonalSettingsTab id={"24b74642-7926-4669-a6c4-755502efa06f"} />
        </TabPane>

        {/** Языковые настройки */}
        <TabPane
          tab={
            <Tooltip title={t("language")}>
              <FontColorsOutlined />
            </Tooltip>
          }
          key="language"
        >
          Hello
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default SettingsPage;
