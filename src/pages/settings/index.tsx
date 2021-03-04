import React, { FC, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Button, Card, Empty, Select, Skeleton } from "antd";
import { UserUser as UserData } from "@generated";
import RoleSwitch from "@lib/components/RoleSwitch";
import { Workspace } from "@providers";
import { AuthConsumer } from "@providers/authContext";
import useAxios, { UserRequestFactory } from "@providers/axios";
import i18n from "i18next";
import Redirect from "pages/_redirect";

import { PersonalSettings } from "components/Settings";
import { PersonalSettingsHandler } from "components/Settings/Personal";

const SettingsPage: FC = () => {
  const { t } = useTranslation("Settings");

  const id = localStorage.getItem("uuid");

  const handlers = useRef<PersonalSettingsHandler>(null);

  const { data, loading } = useAxios(
    UserRequestFactory.apiUserIdGet,
    undefined,
    id,
  );

  if (loading) {
    return <Skeleton active={loading} />;
  }

  if (!data) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }

  const onSubmit = (values: UserData): void => {
    console.log(values);
  };

  return (
    <Workspace
      title={t("title")}
      noRefresh
      actions={
        <Button onClick={() => handlers.current?.submit()}>
          {t("updateButton")}
        </Button>
      }
    >
      <PersonalSettings ref={handlers} onSubmit={onSubmit} initial={data} />

      <Card title={t("language")} style={{ marginTop: "4px" }} id="language">
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
