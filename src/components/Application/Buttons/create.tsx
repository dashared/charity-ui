import React, { FC } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { router, useTranslation } from "@providers";

export const Actions: FC = () => {
  const { t } = useTranslation("Application");

  return (
    <Button
      icon={<PlusOutlined />}
      onClick={() => {
        router.navigate({ url: router.url({ name: "applications:create" }) });
      }}
    >
      {t("$views.createApplication")}
    </Button>
  );
};
