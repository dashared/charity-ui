import React, { FC, useState } from "react";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useTranslation } from "@providers";
import { DonationRequestFactory } from "@providers/axios";

import ModalWithMessage from "../../Modal";
import { ApplicationStatus } from "../../Status/tag";

export const RefuseButton: FC<{
  applicationId: number;
  onRefetch: () => Promise<void>;
}> = ({ applicationId, onRefetch }) => {
  const { t } = useTranslation("Application");

  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button type="primary" danger icon={<CloseOutlined />}>
        {t("$views.buttons.refuse")}
      </Button>
      <ModalWithMessage
        title={t("$views.modal.refuse")}
        query={DonationRequestFactory.apiDonationRequestIdStatusPatch}
        newStatus={ApplicationStatus.Refused}
        onClose={() => setVisible(false)}
        isVisible={visible}
        onRefetch={onRefetch}
        applicationId={applicationId}
      />
    </>
  );
};
