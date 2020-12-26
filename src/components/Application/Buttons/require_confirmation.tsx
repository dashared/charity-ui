import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { CheckOutlined } from "@ant-design/icons";

import { ApplicationStatus } from "../Status/tag";

export const RequireConfirmationButton: FC<{
  applicationId: string;
  status: ApplicationStatus;
}> = ({
  //applicationId,
  status,
}) => {
  const { t } = useTranslation("Application");

  if (status === ApplicationStatus.New) {
    return null;
  }

  return (
    <Button type="primary" icon={<CheckOutlined />}>
      {t("$views.buttons.require_confirmation")}
    </Button>
  );
};
