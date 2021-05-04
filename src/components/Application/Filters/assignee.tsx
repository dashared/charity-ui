import React, { FC } from "react";
import { Checkbox } from "antd";
import { useTranslation } from "@providers";

export const AssignedToMe: FC<{ initial: boolean; onChange: () => void }> = ({
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
