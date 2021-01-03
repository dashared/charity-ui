import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { DonationRequestFactory } from "@providers/axios";

import ModalWithMessage from "../../Modal";
import { ApplicationStatus } from "../../Status/tag";

export const SpamButton: FC<{
  applicationId: string;
  status: ApplicationStatus;
  onRefetch: () => Promise<void>;
}> = ({ onRefetch, status, applicationId }) => {
  const [visible, setVisible] = useState(false);

  console.log(visible);

  const { t } = useTranslation("Application");

  const showModal = (): void => {
    setVisible(true);
  };

  if (status === ApplicationStatus.Spam) {
    return null;
  }

  return (
    <>
      <Tooltip title={t("$views.buttons.spam")}>
        <Button
          type="default"
          danger
          shape="circle"
          onClick={showModal}
          icon={<DeleteOutlined />}
        />
      </Tooltip>

      <ModalWithMessage
        title={t("$views.modal.spamTitle")}
        isVisible={visible}
        onRefetch={onRefetch}
        newStatus={ApplicationStatus.Spam}
        query={DonationRequestFactory.donationRequestIdStatusPatch}
        applicationId={applicationId}
        onClose={() => setVisible(false)}
      ></ModalWithMessage>
    </>
  );
};
