import React, { FC, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Popconfirm, Tooltip } from "antd";
import { RollbackOutlined } from "@ant-design/icons";
import { DefaultApiFactory } from "@generated";

import { ApplicationStatus } from "../Status/tag";

export const ReturnFromSpamButton: FC<{
  applicationId: string;
  status: ApplicationStatus;
  onRefetch: () => Promise<void>;
}> = ({ onRefetch, status, applicationId: id }) => {
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation("Application");

  const returnFromSpam = useCallback(async () => {
    try {
      setLoading(true);
      const input = {
        status: ApplicationStatus.New, // TODO different request
      };
      await DefaultApiFactory(undefined).donationRequestIdPatch(id, input);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      onRefetch();
    }
  }, [setLoading, onRefetch, id]);

  if (status !== ApplicationStatus.Spam) {
    return null;
  }

  return (
    <>
      <Popconfirm
        placement="topLeft"
        title={t("$views.confirm.returnFromSpam")}
        onConfirm={returnFromSpam}
        okText={t("yes")}
        cancelText={t("no")}
      >
        <Tooltip title={t("$views.buttons.returnFromSpam")}>
          <Button
            type="primary"
            shape="circle"
            loading={loading}
            icon={<RollbackOutlined />}
          />
        </Tooltip>
      </Popconfirm>
    </>
  );
};
