import React, { FC, useState } from "react";
import { Descriptions } from "antd";
import { Link } from "@curi/react-dom";
import { ModelsDonationRequest } from "@generated";
import { cred } from "@lib/utils/name";
import { useTranslation } from "@providers";

import StatusTag, {
  ApplicationStatus,
} from "components/Application/Status/tag";

import UserPreview from "../../../Drawers/User";

const GeneralInfo: FC<{ info: ModelsDonationRequest }> = ({ info }) => {
  const [visible, setVisible] = useState(false);

  const { t } = useTranslation("Application");

  return (
    <>
      <Descriptions layout="vertical" bordered>
        <Descriptions.Item label={t("$views.card.description")} span={3}>
          {info.description}
        </Descriptions.Item>

        <Descriptions.Item label={t("$views.card.createdBy")}>
          <a onClick={() => setVisible(true)}>
            {cred(
              info.donee?.first_name,
              info.donee?.middle_name,
              info.donee?.last_name,
            )}
          </a>
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

        <Descriptions.Item label={t("$views.card.endTime")} span={2}>
          2019-04-24 18:00:00
        </Descriptions.Item>

        <Descriptions.Item label={t("$views.card.status")}>
          <StatusTag status={info.status as ApplicationStatus} />
        </Descriptions.Item>

        {info.assignee_id && (
          <Descriptions.Item label={t("$views.card.assignee")}>
            <Link>{info.assignee_id}</Link>
          </Descriptions.Item>
        )}
      </Descriptions>

      <UserPreview
        visible={visible}
        userId={info.applicant_id ?? ""}
        onClose={() => setVisible(false)}
      />
    </>
  );
};

export default GeneralInfo;
