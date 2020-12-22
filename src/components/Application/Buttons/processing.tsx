import React, { FC, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "antd";

const StartProcessingButton: FC<{ applicationId: string }> = () => {
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

  return (
    <Button type="primary" loading={loading} onClick={startProcessing}>
      {t("$views.buttons.inProcessing")}
    </Button>
  );
};

export default StartProcessingButton;
