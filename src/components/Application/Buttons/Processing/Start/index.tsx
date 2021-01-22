import React, { FC, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Popconfirm } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { DonationRequestFactory } from "@providers/axios";

import { ApplicationStatus } from "../../../Status/tag";

export const StartProcessingButton: FC<{
  applicationId: number;
  onRefetch: () => Promise<void>;
}> = ({ onRefetch, applicationId: id }) => {
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation("Application");

  const startProcessing = useCallback(async () => {
    try {
      setLoading(true);
      const input = {
        status: ApplicationStatus.InProcessing,
        role: "Manager",
      };
      await DonationRequestFactory.apiDonationRequestIdStatusPatch(id, input);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      onRefetch();
    }
  }, [setLoading, id, onRefetch]);

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
