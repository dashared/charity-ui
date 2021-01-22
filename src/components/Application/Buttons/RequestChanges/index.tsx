import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Tooltip } from "antd";
import { IssuesCloseOutlined } from "@ant-design/icons";
import { DonationRequestFactory } from "@providers/axios";

import ModalWithMessage from "../../Modal";
import { ApplicationStatus } from "../../Status/tag";

/** Leaves a comment and transferes application into "NeedsImprovement" status. */
export const RequestChangesButton: FC<{
  applicationId: number;
  onRefetch: () => Promise<void>;
}> = ({ applicationId, onRefetch }) => {
  const { t } = useTranslation("Application");

  const [visible, setVisible] = useState(false);

  const showModal = (): void => {
    setVisible(true);
  };

  return (
    <>
      <Tooltip title={t("$views.buttons.request_changes")}>
        <Button
          type="default"
          shape="circle"
          icon={<IssuesCloseOutlined />}
          onClick={showModal}
        />
      </Tooltip>

      <ModalWithMessage
        title={t("$views.modal.requestChangesTitle")}
        isVisible={visible}
        onRefetch={onRefetch}
        newStatus={ApplicationStatus.NeedsImprovement}
        query={DonationRequestFactory.apiDonationRequestIdStatusPatch}
        applicationId={applicationId}
        onClose={() => setVisible(false)}
      ></ModalWithMessage>
    </>
  );
};
