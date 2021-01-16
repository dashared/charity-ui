import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import Tag, { TagProps } from "antd/lib/tag";
import { NO_DATA_PLACEHOLDER } from "@lib/utils";

export enum TransactionStatus {
  Success = "Success",
  Declined = "Declined",
  LowBalance = "LowBalance",
}

function getColor(level: TransactionStatus): TagProps["color"] {
  switch (level) {
    case TransactionStatus.Success:
      return "green";
    case TransactionStatus.Declined:
      return "red";
    case TransactionStatus.LowBalance:
      return "orange";
  }
}

const StatusTag: FC<{ status?: TransactionStatus | null }> = ({ status }) => {
  const { t } = useTranslation("Transaction");

  if (!status) {
    return <span>{NO_DATA_PLACEHOLDER}</span>;
  }

  return <Tag color={getColor(status)}>{t(`Status.${status}`)}</Tag>;
};

export default StatusTag;
