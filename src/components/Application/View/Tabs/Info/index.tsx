import React, { FC, useCallback, useEffect, useState } from "react";
import { Button, Descriptions } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { Link } from "@curi/react-dom";
import { ModelsDonationRequest } from "@generated";
import { cred } from "@lib/utils/name";
import { useTranslation } from "@providers";

import EditModal from "components/Application/Modal/Edit";
import StatusTag, {
  ApplicationStatus,
} from "components/Application/Status/tag";

import UserPreview from "../../../Drawers/User";

const Actions: FC<{
  id: string;
  onRefetch: () => Promise<void>;
}> = ({ id, onRefetch }) => {
  const [editable, setEditMode] = useState(false);

  useEffect(() => {
    setEditMode(false);
  }, []);

  const close = useCallback(() => {
    setEditMode(false);
  }, [setEditMode]);

  const { t } = useTranslation("Common");

  return (
    <>
      <Button icon={<EditOutlined />} onClick={() => setEditMode(true)}>
        {t("Button.edit")}
      </Button>

      {editable && (
        <EditModal
          id={id}
          onRefetch={onRefetch}
          isVisible={editable}
          onClose={close}
        />
      )}
    </>
  );
};

const GeneralInfo: FC<{
  info: ModelsDonationRequest;
  onRefetch: () => Promise<void>;
}> = ({ info, onRefetch }) => {
  const [visible, setVisible] = useState(false);

  const { t } = useTranslation("Application");

  return (
    <>
      <Descriptions
        layout="vertical"
        bordered
        title={t("$views.tabs.generalInfoTitle")}
        extra={<Actions id={info.id ?? ""} onRefetch={onRefetch} />}
      >
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

      {visible && (
        <UserPreview
          visible={visible}
          userId={info.applicant_id ?? ""}
          onClose={() => setVisible(false)}
        />
      )}
    </>
  );
};

export default GeneralInfo;
