import React, { FC } from "react";
import { Select } from "antd";
import { useTranslation } from "@providers";

import { ApplicationStatus } from "../Status/tag";

const StatusFilter: FC<{
  initial?: string[];
  onChange: (value?: string[]) => void;
}> = ({ initial, onChange }) => {
  const { t } = useTranslation("Application");

  return (
    <Select
      placeholder={t("Filters.status")}
      mode="multiple"
      onChange={(value) => {
        onChange(value);
      }}
      maxTagCount={1}
      maxTagPlaceholder={t("Filters.statusTagPlaceholder")}
      allowClear
      value={initial ?? []}
      onClear={() => onChange(undefined)}
      style={{ width: "auto", minWidth: 300 }}
    >
      <Select.Option value={ApplicationStatus.New}>
        {t(`Status.${ApplicationStatus.New}`)}
      </Select.Option>
      <Select.Option value={ApplicationStatus.InProcessing}>
        {t(`Status.${ApplicationStatus.InProcessing}`)}
      </Select.Option>
      <Select.Option value={ApplicationStatus.NeedsImprovement}>
        {t(`Status.${ApplicationStatus.NeedsImprovement}`)}
      </Select.Option>
      <Select.Option value={ApplicationStatus.UserConfirmation}>
        {t(`Status.${ApplicationStatus.UserConfirmation}`)}
      </Select.Option>
      <Select.Option value={ApplicationStatus.SuperManagerConfirmation}>
        {t(`Status.${ApplicationStatus.SuperManagerConfirmation}`)}
      </Select.Option>
      <Select.Option value={ApplicationStatus.Active}>
        {t(`Status.${ApplicationStatus.Active}`)}
      </Select.Option>
      <Select.Option value={ApplicationStatus.Refused}>
        {t(`Status.${ApplicationStatus.Refused}`)}
      </Select.Option>
      <Select.Option value={ApplicationStatus.Archived}>
        {t(`Status.${ApplicationStatus.Archived}`)}
      </Select.Option>
    </Select>
  );
};

export default StatusFilter;
