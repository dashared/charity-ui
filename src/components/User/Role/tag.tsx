import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import Tag, { TagProps } from "antd/lib/tag";
import { NO_DATA_PLACEHOLDER } from "@lib/utils";
import { Role } from "@providers/rbac-rules";

function getColor(role: Role): TagProps["color"] {
  switch (role) {
    case Role.manager:
      return "blue";
    case Role.supermanager:
      return "gold";
    case Role.operator:
      return "pink";
    case Role.admin:
      return "purple";
    default:
      return "green";
  }
}

const RoleTag: FC<{ role?: Role | null }> = ({ role }) => {
  const { t } = useTranslation("Users");

  if (!role) {
    return <span>{NO_DATA_PLACEHOLDER}</span>;
  }

  return <Tag color={getColor(role)}>{t(`Role.${role}`)}</Tag>;
};

export default RoleTag;
