import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Select } from "antd";
import { DonationRequestBodyAvailableStatusesEnum as ApplicationStatus } from "@generated";

const { Option } = Select;

const StatusSelect: FC<{
  avaliable: ApplicationStatus[];
  onChange: (value: ApplicationStatus) => void;
}> = ({ avaliable, onChange }) => {
  const { t } = useTranslation("Application");

  return (
    <Select disabled={avaliable.length === 0} onChange={onChange}>
      {avaliable.map((d) => (
        <Option key={d} value={d}>
          {t(`Status.${d}`)}
        </Option>
      ))}
    </Select>
  );
};

export default StatusSelect;
