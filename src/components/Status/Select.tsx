import React, { FC } from "react";
import { Select } from "antd";
import { DonationRequestBodyAvailableStatusesEnum as ApplicationStatus } from "@generated";

const { Option } = Select;

const StatusSelect: FC<{
  avaliable: ApplicationStatus[];
  onChange: (value: ApplicationStatus) => void;
}> = ({ avaliable, onChange }) => {
  return (
    <Select disabled={avaliable.length === 0} onChange={onChange}>
      {avaliable.map((d) => (
        <Option key={d} value={d}>
          {d}
        </Option>
      ))}
    </Select>
  );
};

export default StatusSelect;
