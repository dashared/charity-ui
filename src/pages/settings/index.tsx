import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Button, Card, Select } from "antd";
import RoleSwitch from "@lib/components/RoleSwitch";
import { Workspace } from "@providers";
import { AuthConsumer } from "@providers/authContext";
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
              <Select value={"rus"} style={{ width: 180, margin: "0 8px" }}>
                <Select.Option value="rus">
                  {t("languageSetting.russian")}
                </Select.Option>
                <Select.Option value="eng">
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
