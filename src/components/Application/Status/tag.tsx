import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import Tag, { TagProps } from "antd/lib/tag";
import { DonationRequestBodyStatusEnum } from "@generated";
import { NO_DATA_PLACEHOLDER } from "@lib/utils";

export { DonationRequestBodyStatusEnum as ApplicationStatus };

function getColor(level: DonationRequestBodyStatusEnum): TagProps["color"] {
  switch (level) {
    case DonationRequestBodyStatusEnum.New:
      return "blue";
    case DonationRequestBodyStatusEnum.InProcessing:
      return "gold";
    case DonationRequestBodyStatusEnum.Deleted:
      return "pink";
    case DonationRequestBodyStatusEnum.NeedsImprovement:
      return "warning";
    case DonationRequestBodyStatusEnum.SuperManagerConfirmation:
      return "gray";
    case DonationRequestBodyStatusEnum.Active:
      return "green";
    case DonationRequestBodyStatusEnum.Spam:
      return "red";
    case DonationRequestBodyStatusEnum.Refused:
      return "error";
  }
}

const StatusTag: FC<{ status?: DonationRequestBodyStatusEnum | null }> = ({
  status,
}) => {
  const { t } = useTranslation("Application");

  if (!status) {
    return <span>{NO_DATA_PLACEHOLDER}</span>;
  }

  return <Tag color={getColor(status)}>{t(`Status.${status}`)}</Tag>;
};

export default StatusTag;
