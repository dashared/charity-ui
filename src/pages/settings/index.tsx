import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Button, Card, Select } from "antd";
import RoleSwitch from "@lib/components/RoleSwitch";
import { Workspace } from "@providers";
import { AuthConsumer } from "@providers/authContext";
import i18n from "i18next";
import Redirect from "pages/_redirect";

import { PersonalSettings } from "components/Settings";

const SettingsPage: FC = () => {
  const { t } = useTranslation("Settings");

  return (
    <AuthConsumer>
      {({ user }) => {
        return (
          <Workspace
            title={t("title")}
            noRefresh
            actions={<Button type="primary">{t("updateButton")}</Button>}
          >
            <PersonalSettings id={user.uuid ?? ""} />

            <Card
              title={t("language")}
              style={{ marginTop: "4px" }}
              id="language"
            >
              <Select
                onChange={(value) => {
                  i18n.changeLanguage(value);
                }}
                value={i18n.language}
                style={{ width: 180, margin: "0 8px" }}
              >
                <Select.Option value="ru">
                  {t("languageSetting.russian")}
                </Select.Option>
                <Select.Option value="en">
                  {t("languageSetting.english")}
                </Select.Option>
              </Select>
            </Card>
          </Workspace>
        );
      }}
    </AuthConsumer>
  );
};

export const pageComponent: FC = () => (
  <AuthConsumer>
    {({ user }) => {
      return (
        <RoleSwitch
          role={user.role}
          perform="settings:index"
          yes={() => <SettingsPage />}
          no={() => <Redirect name="home"></Redirect>}
        />
      );
    }}
  </AuthConsumer>
);
