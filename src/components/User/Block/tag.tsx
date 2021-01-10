import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import Tag from "antd/lib/tag";

const BlockedTag: FC<{ isBlocked: boolean }> = ({ isBlocked }) => {
  const { t } = useTranslation("Users");

  if (!isBlocked) {
    return null;
  }

  return <Tag color="red">{t(`blocked`)}</Tag>;
};

export default BlockedTag;
