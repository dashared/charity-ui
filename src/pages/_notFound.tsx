import React, { FC } from "react";
import { Button, Card, Result } from "antd";
import { useTranslation } from "@providers";

const NotFound: FC = () => {
  const { t } = useTranslation("_error");

  return (
    <Card bordered={false}>
      <Result
        status="warning"
        title={<h1>{t("notFound.header")}</h1>}
        extra={
          <Button type="default" onClick={() => window.history.back()}>
            {t("notFound.back")}
          </Button>
        }
      />
    </Card>
  );
};

export default NotFound;
