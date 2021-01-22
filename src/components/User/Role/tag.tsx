import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import Tag, { TagProps } from "antd/lib/tag";
import { NO_DATA_PLACEHOLDER } from "@lib/utils";
import { UserApiRole } from "@providers/axios";

function getColor(role: UserApiRole): TagProps["color"] {
  switch (role) {
    case UserApiRole.Manager:
      return "blue";
    case UserApiRole.SuperManager:
      return "gold";
    case UserApiRole.Operator:
      return "pink";
    case UserApiRole.User:
      return "purple";
    default:
      return "green";
  }
}

const RoleTag: FC<{ roles?: UserApiRole[] | null }> = ({ roles }) => {
  const { t } = useTranslation("Users");

  if (!roles) {
    return <span>{NO_DATA_PLACEHOLDER}</span>;
  }

  return (
    <>
      {roles.map((role) => (
        <Tag key={role} color={getColor(role)}>
          {t(`Role.${role}`)}
        </Tag>
      ))}
    </>
  );
};

export default RoleTag;
