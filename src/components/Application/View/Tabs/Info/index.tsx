import React, { FC } from "react";
import { Descriptions } from "antd";
import { ModelsDonationRequest } from "@generated";
import { cred } from "@lib/utils/name";
import { useTranslation } from "@providers";

import StatusTag, {
  ApplicationStatus,
} from "components/Application/Status/tag";

const GeneralInfo: FC<{ info: ModelsDonationRequest }> = ({ info }) => {
  const { t } = useTranslation("Application");

  return (
    <Descriptions layout="vertical" bordered>
      <Descriptions.Item label={t("$views.card.description")} span={3}>
        {info.description}
      </Descriptions.Item>

      <Descriptions.Item label={t("$views.card.createdBy")}>
        {cred(
          info.donee?.first_name,
          info.donee?.middle_name,
          info.donee?.last_name,
        )}
      </Descriptions.Item>

      <Descriptions.Item label={t("$views.card.requestedAmount")}>
        {info.requested_amount}
      </Descriptions.Item>

      <Descriptions.Item label={t("$views.card.approvedAmount")}>
        {info.approved_amount}
      </Descriptions.Item>

      <Descriptions.Item label={t("$views.card.createdAt")}>
        {info.created_at}
      </Descriptions.Item>

      <Descriptions.Item label={t("$views.card.endTime")}>
        2019-04-24 18:00:00
      </Descriptions.Item>

      <Descriptions.Item label={t("$views.card.status")} span={3}>
        <StatusTag status={info.status as ApplicationStatus} />
      </Descriptions.Item>
    </Descriptions>
  );
};

export default GeneralInfo;
