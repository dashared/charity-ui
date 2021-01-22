import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { DonationRequestFactory } from "@providers/axios";

import ModalWithMessage from "../../Modal";
import { ApplicationStatus } from "../../Status/tag";

export const SpamButton: FC<{
  applicationId: number;
  onRefetch: () => Promise<void>;
}> = ({ onRefetch, applicationId }) => {
  const [visible, setVisible] = useState(false);

  const { t } = useTranslation("Application");

  const showModal = (): void => {
    setVisible(true);
  };

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
        query={DonationRequestFactory.apiDonationRequestIdStatusPatch}
        applicationId={applicationId}
        onClose={() => setVisible(false)}
      ></ModalWithMessage>
    </>
  );
};
