import React, { FC, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Popconfirm, Tooltip } from "antd";
import { PauseCircleOutlined } from "@ant-design/icons";
import { DonationRequestFactory } from "@providers/axios";

export const StopProcessingButton: FC<{
  applicationId: number;
  onRefetch: () => Promise<void>;
}> = ({ applicationId: id, onRefetch }) => {
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation("Application");

  const stopProcessing = useCallback(async () => {
    try {
      setLoading(true);
      await DonationRequestFactory.apiDonationRequestIdStatusDelete(id);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      onRefetch();
    }
  }, [setLoading, onRefetch, id]);

  return (
    <Popconfirm
      placement="topLeft"
      title={t("$views.confirm.stopProcessing")}
      onConfirm={stopProcessing}
      okText={t("yes")}
      cancelText={t("no")}
    >
      <Tooltip title={t("$views.buttons.stopProcessing")}>
        <Button
          type="dashed"
          danger
          shape="circle"
          loading={loading}
          icon={<PauseCircleOutlined />}
        />
      </Tooltip>
    </Popconfirm>
  );
};
