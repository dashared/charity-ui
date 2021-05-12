import React, { FC } from "react";
import { Select, Spin } from "antd";
import {
  DonationRequestBodyAvailableStatusesEnum as Status,
  UserUser as Single,
  UserUserRoleEnum as Role,
  UserUserRoleEnum,
} from "@generated";
import { useTranslation } from "@providers";
import useAxios, { UserRequestFactory } from "@providers/axios";

import RoleTag from "components/User/Role/tag";

type BaseSelectProps = {
  disabled?: boolean;
  noSearch?: boolean;
  onCreate?: (name: string) => void;
};

type SingleSelectProps = {
  value: string | null;
  status?: Status;
  onChange: (key: string | null, entity: Single | null) => void;
};

const Variables: Record<Status, Array<Role>> = {
  New: [Role.Manager, Role.SuperManager],
  InProcessing: [Role.Manager, Role.SuperManager],
  NeedsImprovement: [Role.Manager, Role.SuperManager],
  Refused: [Role.Manager, Role.SuperManager],
  Spam: [Role.Manager, Role.SuperManager],
  Active: [Role.Manager],
  Deleted: [Role.Manager],
  SuperManagerConfirmation: [Role.SuperManager],
  UserConfirmation: [Role.SuperManager, Role.Manager],
  Archived: [Role.Manager, Role.SuperManager],
  OnRealization: [Role.SuperManager],
};

const { Option } = Select;

const AssigneeSelect: FC<BaseSelectProps & SingleSelectProps> = ({
  value,
  status,
  onChange,
}) => {
  const { t } = useTranslation("Application");

  const { data, loading } = useAxios(
    UserRequestFactory.apiUserGet,
    false,
    0,
    10,
    "",
    Variables[status ?? Status.Spam],
  );

  const handleChange = (v: string): void => {
    onChange(v, null);
  };

  return (
    <Select
      labelInValue
      defaultValue={value ?? undefined}
      placeholder={t("$views.select_assignee")}
      notFoundContent={loading ? <Spin size="small" /> : null}
      filterOption={false}
      onChange={handleChange}
      style={{ width: "100%" }}
    >
      {(data?.data ?? []).map((d) => (
        <Option key={d.id} value={d.id ?? ""}>
          {d.first_name}
          {"   "}
          <RoleTag roles={[d.role ?? UserUserRoleEnum.SuperManager]} />
        </Option>
      ))}
    </Select>
  );
};

export default AssigneeSelect;
