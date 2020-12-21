import React, { FC } from "react";
import { Badge, Descriptions } from "antd";
import { ModelsDonationRequest } from "@generated";
import { useTranslation } from "@providers";

const GeneralInfo: FC<{ info: ModelsDonationRequest }> = ({ info }) => {
  const { t } = useTranslation("Application");

  return (
    <Descriptions
      title={t("$views.card.generalInfoTitle")}
      layout="vertical"
      bordered
    >
      <Descriptions.Item label={t("$views.card.description")} span={3}>
        {info.description}
      </Descriptions.Item>

      <Descriptions.Item label={t("$views.card.need")}>
        10000 $
      </Descriptions.Item>

      <Descriptions.Item label={t("$views.card.approvedAmount")} span={2}>
        10 $
      </Descriptions.Item>
      <Descriptions.Item label={t("$views.card.createTime")}>
        2018-04-24 18:00:00
      </Descriptions.Item>
      <Descriptions.Item label={t("$views.card.endTime")}>
        2019-04-24 18:00:00
      </Descriptions.Item>
      <Descriptions.Item label={t("$views.card.status")} span={3}>
        <Badge status="processing" text="Running" />
      </Descriptions.Item>
    </Descriptions>
  );
};

export default GeneralInfo;
