import React, { FC, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { DonationRequestBodyAvailableStatusesEnum as ApplicationStatus } from "@generated";
import { DonationRequestFactory } from "@providers/axios";

export const RequireConfirmationButton: FC<{
  applicationId: number;
  status: ApplicationStatus;
  onRefetch: () => Promise<void>;
}> = ({ applicationId: id, onRefetch, status }) => {
  const { t } = useTranslation("Application");

  const [loading, setLoading] = useState(false);

  const moveFurther = useCallback(async () => {
    try {
      // const newStatus =
      //   status === ApplicationStatus.SuperManagerConfirmation
      //     ? ApplicationStatus.Active
      //     : ApplicationStatus.SuperManagerConfirmation;

      setLoading(true);

      await DonationRequestFactory.apiDonationRequestIdStatusPatch(id, {
        status,
      });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      onRefetch();
    }
  }, [status, onRefetch, setLoading, id]);

  return (
    <Button
      type="primary"
      icon={<CheckOutlined />}
      loading={loading}
      onClick={moveFurther}
    >
      {status === ApplicationStatus.SuperManagerConfirmation
        ? t("$views.buttons.activate")
        : t("$views.buttons.require_confirmation")}
    </Button>
  );
};
