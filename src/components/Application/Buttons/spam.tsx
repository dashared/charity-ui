import React, { FC, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Popconfirm, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

export const SpamButton: FC<{
  applicationId: string;
  onRefetch: () => Promise<void>;
}> = () => {
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation("Application");

  const spam = useCallback(async () => {
    try {
      setLoading(true); // send request to Kostik with applicationId
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  return (
    <Popconfirm
      placement="topLeft"
      title={t("$views.confirm.spam")}
      onConfirm={spam}
      okText={t("yes")}
      cancelText={t("no")}
    >
      <Tooltip title={t("$views.buttons.spam")}>
        <Button
          type="primary"
          danger
          loading={loading}
          icon={<DeleteOutlined />}
        />
      </Tooltip>
    </Popconfirm>
  );
};
