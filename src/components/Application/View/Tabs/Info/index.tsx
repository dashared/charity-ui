import React, { FC, useCallback, useState } from "react";
import { toInteger } from "lodash";
import { Button, DatePicker, Descriptions, InputNumber, Space } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { Link } from "@curi/react-dom";
import {
  DonationRequestBody as Single,
  DonationRequestBodyAvailableStatusesEnum as Status,
  UserUserRoleEnum,
} from "@generated";
import RoleSwitch from "@lib/components/RoleSwitch";
import { formatCategory, formatMoney } from "@lib/utils";
import { DateTimeFormat, format } from "@lib/utils/date";
import { cred, fullName } from "@lib/utils/name";
import { notify } from "@lib/utils/notification";
import { i18n, useTranslation } from "@providers";
import { DonationRequestFactory } from "@providers/axios";
import { Role } from "@providers/rbac-rules";
import moment from "moment";

import StatusTag, {
  ApplicationStatus,
} from "components/Application/Status/tag";
import AssigneeSelect from "components/Assignee/Select";
import RoleTag from "components/User/Role/tag";

import UserPreview from "../../../../User/Drawer";
import { DoneeInfo } from "../Donee";

const Actions: FC<{
  status?: ApplicationStatus;
  onSave: () => Promise<void>;
  onClose: () => void;
  onEdit: () => void;
  editable: boolean;
}> = ({ status, onSave, editable, onClose, onEdit }) => {
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation("Translation");

  const saveAndClose = useCallback(async () => {
    setLoading(true);

    try {
      await onSave();

      onClose();
    } catch (e) {
      notify(t("$views.updateError", "error"));
    } finally {
      setLoading(false);
    }
  }, [onClose, onSave, t]);

  return (
    <Space>
      {!editable &&
        (status === ApplicationStatus.InProcessing ||
          status === ApplicationStatus.SuperManagerConfirmation) && (
          <Button icon={<EditOutlined />} onClick={onEdit}>
            {t("translation:edit")}
          </Button>
        )}

      {editable && <Button onClick={onClose}>{t("translation:cancel")}</Button>}

      {editable && (
        <Button onClick={saveAndClose} loading={loading} type="primary">
          {t("translation:save")}
        </Button>
      )}
    </Space>
  );
};

type EditableInfo = {
  approvedAmount?: number;
  endTime?: string;
  assigneeId?: string;
};

export const GeneralInfo: FC<{
  info: Single;
  onRefetch: () => Promise<void>;
}> = ({ info, onRefetch }) => {
  const [visible, setVisible] = useState(false);

  const { t } = useTranslation("Application");

  const [editable, setEditable] = useState<boolean>(false);

  const lang = i18n.language.substr(0, 2);

  const [initialInfo, updateInfo] = useState<EditableInfo>({
    approvedAmount: info.approved_amount?.numerator,
    endTime: undefined,
    assigneeId: info.assignee?.id,
  });

  const onSave = useCallback(
    async (updInfo: EditableInfo) => {
      try {
        await DonationRequestFactory.apiDonationRequestIdPatch(info.id ?? 0, {
          approved_amount: {
            currency: "RUB",
            numerator: updInfo.approvedAmount,
            denominator: 1,
          },
          until: updInfo.endTime,
          assignee_id: updInfo.assigneeId,
        });

        notify(t("$views.update_success"), "success");
      } catch (e) {
        console.error(e);
        notify(t("$views.update_error"), "error");
      } finally {
        onRefetch();
      }
    },
    [onRefetch, t, info],
  );

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
                status={info.status}
                onSave={() => onSave(initialInfo)}
                onClose={() => setEditable(false)}
                onEdit={() => setEditable(true)}
                editable={editable}
              />
            )}
          />
        }
      >
        <Descriptions.Item label={t("$views.card.description")} span={3}>
          {<span>{info?.description ?? "-"}</span>}
        </Descriptions.Item>

        <Descriptions.Item label={t("$views.card.createdBy")}>
          <a onClick={() => setVisible(true)} href="/">
            {cred(
              info.author?.first_name,
              info.author?.middle_name,
              info.author?.last_name,
            )}
          </a>
        </Descriptions.Item>

        <Descriptions.Item label={t("$views.card.requestedAmount")}>
          {formatMoney(info.requested_amount)}
        </Descriptions.Item>

        <Descriptions.Item label={t("$views.card.approvedAmount")}>
          {!editable && <span>{formatMoney(info.approved_amount)}</span>}
          {editable && (
            <InputNumber
              defaultValue={
                (info.approved_amount?.numerator ?? 0) /
                (info.approved_amount?.denominator ?? 1)
              }
              onChange={(value) => {
                console.log(value);
                updateInfo({
                  ...initialInfo,
                  approvedAmount: toInteger(value),
                });
              }}
            />
          )}
        </Descriptions.Item>

        <Descriptions.Item label={t("$views.card.createdAt")}>
          {format(info.created_at)}
        </Descriptions.Item>

        <Descriptions.Item label={t("$views.card.endTime")}>
          {!editable && (
            <span>{format(info.until, DateTimeFormat.DATE_SHORT)}</span>
          )}
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

        <Descriptions.Item label={t("$views.card.category")}>
          {formatCategory(lang, info.category)}
        </Descriptions.Item>

        <Descriptions.Item label={t("$views.card.status")}>
          <StatusTag status={info.status} />
        </Descriptions.Item>

        {info.received_amount && (
          <Descriptions.Item label={t("$views.card.received_amount")}>
            <span>{formatMoney(info.received_amount)}</span>
          </Descriptions.Item>
        )}

        {info.assignee && (
          <Descriptions.Item label={t("$views.card.assignee")}>
            {!editable && (
              <>
                <Link name="managers:show" params={{ id: info.assignee.id }}>
                  {fullName(
                    info.assignee?.first_name,
                    info.assignee?.middle_name,
                    info.assignee?.last_name,
                  )}
                </Link>{" "}
                <RoleTag
                  roles={[info.assignee?.role ?? UserUserRoleEnum.Admin]}
                />
              </>
            )}
            {editable && (
              <AssigneeSelect
                value={info.assignee?.id ?? null}
                status={(info.status as unknown) as Status}
                // eslint-disable-next-line
                onChange={(value: any) => {
                  updateInfo({
                    ...initialInfo,
                    assigneeId: value.value ?? undefined,
                  });
                }}
              />
            )}
          </Descriptions.Item>
        )}
      </Descriptions>
      <br />
      <DoneeInfo donee={info.donee} relationship={info.relationship} />
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
