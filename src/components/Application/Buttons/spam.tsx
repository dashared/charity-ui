import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { DefaultApiFactory } from "@generated";

import ModalWithMessage from "../Modal";
import { ApplicationStatus } from "../Status/tag";

export const SpamButton: FC<{
  applicationId: string;
  status: ApplicationStatus;
  onRefetch: () => Promise<void>;
}> = ({ onRefetch, status, applicationId }) => {
  const [visible, setVisible] = useState(false);

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
          type="primary"
          danger
          onClick={showModal}
          icon={<DeleteOutlined />}
        />
      </Tooltip>

      <ModalWithMessage
        title={t("$views.modal.spamTitle")}
        isVisible={visible}
        onRefetch={onRefetch}
        newStatus={ApplicationStatus.Spam}
        query={DefaultApiFactory(undefined).donationRequestIdPatch}
        applicationId={applicationId}
      ></ModalWithMessage>
    </>
  );
};
