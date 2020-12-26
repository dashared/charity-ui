import React, { FC, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Popconfirm } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

import { ApplicationStatus } from "../Status/tag";

export const StartProcessingButton: FC<{
  applicationId: string;
  status: ApplicationStatus;
}> = ({
  // applicationId,
  status,
}) => {
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation("Application");

  const startProcessing = useCallback(async () => {
    try {
      setLoading(true); // send request to Kostik with applicationId
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

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
