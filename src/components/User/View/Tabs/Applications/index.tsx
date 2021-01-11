import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "antd";

export const ApplicationsTab: FC = () => {
  const { t } = useTranslation("User");
  return <Card title={t("$views.tab.applications")} bordered={false}></Card>;
};
