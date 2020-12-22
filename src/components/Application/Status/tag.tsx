import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import Tag, { TagProps } from "antd/lib/tag";
import { NO_DATA_PLACEHOLDER } from "@lib/utils";

export enum ApplicationStatus {
  New = "DonationNew",
  Processing = "DonationInProcessing",
}

function getColor(level: ApplicationStatus): TagProps["color"] {
  switch (level) {
    case ApplicationStatus.New:
      return "blue";
  }
}

const StatusTag: FC<{ status?: ApplicationStatus | null }> = ({ status }) => {
  const { t } = useTranslation("Application");

  if (!status) {
    return <span>{NO_DATA_PLACEHOLDER}</span>;
  }

  return <Tag color={getColor(status)}>{t(`Status.${status}`)}</Tag>;
};

export default StatusTag;
