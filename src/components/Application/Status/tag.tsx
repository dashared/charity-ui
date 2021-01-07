import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import Tag, { TagProps } from "antd/lib/tag";
import { NO_DATA_PLACEHOLDER } from "@lib/utils";

export enum ApplicationStatus {
  New = "New",
  Spam = "Spam",
  Processing = "InProcessing",
  Delete = "DeletedActive",
  RequiresConfirmation = "SuperManagerConfirmation",
  NeedsImprovement = "NeedsImprovement",
  Active = "Active",
  Refused = "Refused",
}

function getColor(level: ApplicationStatus): TagProps["color"] {
  switch (level) {
    case ApplicationStatus.New:
      return "blue";
    case ApplicationStatus.Processing:
      return "gold";
    case ApplicationStatus.Delete:
      return "pink";
    case ApplicationStatus.NeedsImprovement:
      return "warning";
    case ApplicationStatus.RequiresConfirmation:
      return "gray";
    case ApplicationStatus.Active:
      return "green";
    case ApplicationStatus.Spam:
      return "red";
    case ApplicationStatus.Refused:
      return "error";
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
