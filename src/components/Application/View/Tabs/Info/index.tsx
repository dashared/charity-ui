import React, { FC, useCallback, useEffect, useState } from "react";
import { Button, DatePicker, Descriptions, Input, Select, Space } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { Link } from "@curi/react-dom";
import { DonationRequestBody as Single } from "@generated";
import RoleSwitch from "@lib/components/RoleSwitch";
import { format } from "@lib/utils/date";
import { cred } from "@lib/utils/name";
import { useTranslation } from "@providers";
import { Role } from "@providers/rbac-rules";
import moment from "moment";

import StatusTag, {
  ApplicationStatus,
} from "components/Application/Status/tag";

import UserPreview from "../../../Drawers/User";

const Actions: FC<{
  id: number;
  onSave: () => Promise<void>;
  onClose: () => void;
  onEdit: () => void;
  editable: boolean;
}> = ({ onSave, editable, onClose, onEdit }) => {
  const saveAndClose = useCallback(() => {
    onClose();
    onSave();
  }, [onClose, onSave]);

  const { t } = useTranslation("Common");

  return (
    <Space>
      {!editable && (
        <Button icon={<EditOutlined />} onClick={onEdit}>
          {t("Button.edit")}
        </Button>
      )}

      {editable && <Button onClick={onClose}>{t("Button.cancel")}</Button>}

      {editable && (
        <Button onClick={saveAndClose} type="primary">
          {t("Button.save")}
        </Button>
      )}
    </Space>
  );
};

type EditableInfo = {
  title?: string;
  description?: string;
  approvedAmount?: number;
  endTime?: string;
  assignee?: string;
};

export const GeneralInfo: FC<{
  info: Single;
  onRefetch: () => Promise<void>;
}> = ({ info, onRefetch }) => {
  const [visible, setVisible] = useState(false);

  const [editable, setEditable] = useState<boolean>(false);

  const [initialInfo, updateInfo] = useState<EditableInfo>({
    title: info.title,
    description: info.description,
    approvedAmount: info.approved_amount,
    endTime: undefined,
    assignee: info.assignee?.id,
  });

  useEffect(() => {
    updateInfo({
      title: info.title,
      description: info.description,
      approvedAmount: info.approved_amount,
      endTime: undefined,
      assignee: info.assignee?.id,
    });
  }, [updateInfo, info]);

  const onSave = useCallback(async () => {
    console.log(initialInfo);
    // TODO: api call
    onRefetch();
  }, [onRefetch, initialInfo]);

  const { t } = useTranslation("Application");

  return (
    <>
      <Descriptions
        layout="vertical"
        bordered
        title={t("$views.tabs.generalInfoTitle")}
        extra={
          <RoleSwitch
            // it's an example of the RoleSwitch component
            role={Role.manager} // replace for user.role from <AuthProvider />
            perform="application:edit"
            yes={() => (
              <Actions
                id={info.id ?? 0}
                onSave={onSave}
                onClose={() => setEditable(false)}
                onEdit={() => setEditable(true)}
                editable={editable}
              />
            )}
          />
        }
      >
        <Descriptions.Item label={t("$views.card.description")} span={3}>
          {!editable && <span>{initialInfo.description}</span>}
          {editable && (
            <Input.TextArea
              defaultValue={initialInfo.description}
              autoSize={true}
              onChange={(e) => {
                updateInfo({
                  ...initialInfo,
                  description: e.target.value,
                });
              }}
            />
          )}
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
          {!editable && <span>{initialInfo.approvedAmount}</span>}
          {editable && (
            <Input
              defaultValue={initialInfo.approvedAmount}
              onChange={(e) => {
                updateInfo({
                  ...initialInfo,
                  approvedAmount: Number(e.target.value),
                });
              }}
            />
          )}
        </Descriptions.Item>

        <Descriptions.Item label={t("$views.card.createdAt")}>
          {format(info.created_at)}
        </Descriptions.Item>

        <Descriptions.Item label={t("$views.card.endTime")} span={2}>
          {!editable && <span>{format(initialInfo.endTime)}</span>}
          {editable && (
            <DatePicker
              defaultValue={
                initialInfo.endTime
                  ? moment(initialInfo.endTime, "DD-MM-YYYY")
                  : undefined
              }
              style={{ width: "100%" }}
              onChange={(date, dateString) => {
                updateInfo({
                  ...initialInfo,
                  endTime: dateString,
                });
              }}
            />
          )}
        </Descriptions.Item>

        <Descriptions.Item label={t("$views.card.status")}>
          <StatusTag status={info.status as ApplicationStatus} />
        </Descriptions.Item>

        <Descriptions.Item label={t("$views.card.assignee")}>
          {!editable && <Link>{initialInfo.assignee}</Link>}
          {editable && (
            <Select
              style={{ width: "100%" }}
              showSearch
              defaultValue={initialInfo.assignee}
              placeholder={t("$views.assignee")}
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={false}
              // onSearch={this.handleSearch}
              onSelect={(value) => {
                updateInfo({
                  ...initialInfo,
                  assignee: value,
                });
              }}
              //notFoundContent={null}
            ></Select>
          )}
        </Descriptions.Item>
      </Descriptions>

      {visible && (
        <UserPreview
          visible={visible}
          userId={info.author?.id ?? ""}
          onClose={() => setVisible(false)}
        />
      )}
    </>
  );
};
