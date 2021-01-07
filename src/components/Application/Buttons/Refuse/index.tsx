import React, { FC, useState } from "react";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useTranslation } from "@providers";
import { DonationRequestFactory } from "@providers/axios";

import ModalWithMessage from "../../Modal";
import { ApplicationStatus } from "../../Status/tag";

export const RefuseButton: FC<{
  applicationId: number;
  status: ApplicationStatus;
  onRefetch: () => Promise<void>;
}> = ({ applicationId, status, onRefetch }) => {
  const { t } = useTranslation("Application");

  const [visible, setVisible] = useState(false);

  // TODO: more complex assertion for manager's role and application's status
  if (status !== ApplicationStatus.RequiresConfirmation) {
    return null;
  }

  return (
    <>
      <Button type="primary" danger icon={<CloseOutlined />}>
        {t("$views.buttons.refuse")}
      </Button>
      <ModalWithMessage
        title={t("$views.modal.refuse")}
        query={DonationRequestFactory.donationRequestIdStatusPatch}
        newStatus={ApplicationStatus.Refused}
        onClose={() => setVisible(false)}
        isVisible={visible}
        onRefetch={onRefetch}
        applicationId={applicationId}
      />
    </>
  );
};
