import React, { FC, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Popconfirm } from "antd";

const SpamButton: FC<{ applicationId: string }> = () => {
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
      okText="Да"
      cancelText="Нет"
    >
      <Button type="default" danger loading={loading}>
        {t("$views.buttons.spam")}
      </Button>
    </Popconfirm>
  );
};

export default SpamButton;
