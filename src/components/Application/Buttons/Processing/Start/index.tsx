import React, { FC, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Popconfirm } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { DonationRequestFactory } from "@providers/axios";

import { ApplicationStatus } from "../../../Status/tag";

export const StartProcessingButton: FC<{
  applicationId: string;
  status: ApplicationStatus;
  onRefetch: () => Promise<void>;
}> = ({ onRefetch, applicationId: id, status }) => {
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation("Application");

  const startProcessing = useCallback(async () => {
    try {
      setLoading(true);
      const input = {
        status: ApplicationStatus.Processing,
      };
      await DonationRequestFactory.donationRequestIdStatusPatch(id, input);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      onRefetch();
    }
  }, [setLoading, id, onRefetch]);

  if (status !== ApplicationStatus.New) {
    return null;
  }

  return (
    <Popconfirm
      placement="topLeft"
      title={t("$views.confirm.processing")}
      onConfirm={startProcessing}
      okText={t("yes")}
      cancelText={t("no")}
    >
      <Button type="primary" loading={loading} icon={<ArrowRightOutlined />}>
        {t("$views.buttons.inProcessing")}
      </Button>
    </Popconfirm>
  );
};
