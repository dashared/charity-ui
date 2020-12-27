import React, { FC, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { DefaultApiFactory } from "@generated";

import { ApplicationStatus } from "../Status/tag";

export const RequireConfirmationButton: FC<{
  applicationId: string;
  status: ApplicationStatus;
  onRefetch: () => Promise<void>;
}> = ({ applicationId: id, onRefetch, status }) => {
  const { t } = useTranslation("Application");

  const [loading, setLoading] = useState(false);

  const moveFurther = useCallback(async () => {
    try {
      const newStatus =
        status === ApplicationStatus.RequiresConfirmation
          ? ApplicationStatus.Active
          : ApplicationStatus.RequiresConfirmation;

      setLoading(true);

      await DefaultApiFactory(undefined).donationRequestIdPatch(id, {
        status: newStatus,
      });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      onRefetch();
    }
  }, [status, onRefetch, setLoading, id]);

  if (
    status === ApplicationStatus.New ||
    status === ApplicationStatus.Spam ||
    status === ApplicationStatus.Active
  ) {
    return null;
  }

  return (
    <Button
      type="primary"
      icon={<CheckOutlined />}
      loading={loading}
      onClick={moveFurther}
    >
      {status === ApplicationStatus.RequiresConfirmation
        ? t("$views.buttons.activate")
        : t("$views.buttons.require_confirmation")}
    </Button>
  );
};
