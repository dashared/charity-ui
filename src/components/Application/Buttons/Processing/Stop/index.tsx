import React, { FC, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Popconfirm, Tooltip } from "antd";
import { PauseCircleOutlined } from "@ant-design/icons";

import { ApplicationStatus } from "components/Application/Status/tag";

export const StopProcessingButton: FC<{
  applicationId: string;
  status: ApplicationStatus;
  onRefetch: () => Promise<void>;
}> = ({
  // applicationId,
  status,
  onRefetch,
}) => {
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation("Application");

  const stopProcessing = useCallback(async () => {
    try {
      setLoading(true); // send request to Kostik with applicationId
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      onRefetch();
    }
  }, [setLoading, onRefetch]);

  if (status !== ApplicationStatus.Processing) {
    return null;
  }

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
