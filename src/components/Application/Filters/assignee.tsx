import React, { FC } from "react";
import { Checkbox } from "antd";
import { useTranslation } from "@providers";

const AssignedToMe: FC<{ initial: boolean; onChange: () => void }> = ({
  initial,
  onChange,
}) => {
  const { t } = useTranslation("Application");

  return (
    <Checkbox checked={initial} onChange={onChange}>
      {t("Filters.assignee")}
    </Checkbox>
  );
};

export default AssignedToMe;
