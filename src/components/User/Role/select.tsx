import React, { FC } from "react";
import { Select } from "antd";
import { AuthManagerRegistrationInputRoleEnum as Roles } from "@generated";
import { i18n } from "@providers";

const { Option } = Select;

const RolesArr = [
  Roles.User,
  Roles.SuperManager,
  Roles.Operator,
  Roles.Manager,
  Roles.ContentManager,
  Roles.Admin,
];

const RoleSelect: FC = () => {
  return (
    <Select>
      {RolesArr.map((value) => (
        <Option key={"value"} value={"value"}>
          {i18n.t(`Users:Role.${value}`)}
        </Option>
      ))}
    </Select>
  );
};

export default RoleSelect;
