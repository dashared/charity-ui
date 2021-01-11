import React, { FC } from "react";
import { Card } from "antd";
import { useTranslation } from "@providers";

export const SessionsTab: FC = () => {
  const { t } = useTranslation("User");
  return <Card title={t("$views.tab.sessions")} bordered={false}></Card>;
};
