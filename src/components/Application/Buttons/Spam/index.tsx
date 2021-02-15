import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Menu } from "antd";

export const SpamButton: FC<{
  onClick: () => void;
}> = ({ onClick }) => {
  const { t } = useTranslation("Application");

  return (
    <Menu.Item key="spam" onClick={onClick}>
      {t("$views.buttons.spam")}
    </Menu.Item>
  );
};
