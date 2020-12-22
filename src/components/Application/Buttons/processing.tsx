import React, { FC, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "antd";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const StartProcessingButton: FC<{ applicationId: string }> = () => {
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation("Application");

  const startProcessing = useCallback(async () => {
    try {
      setLoading(true); // send request to Kostik with applicationId
      await sleep(2000);
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
