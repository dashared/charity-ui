import React, { FC } from "react";
import { Checkbox } from "antd";
import { useTranslation } from "@providers";

export const NeedMyVote: FC<{
  initial: boolean;
  onChange: () => void;
  disabled: boolean;
}> = ({ initial, onChange, disabled }) => {
  const { t } = useTranslation("Application");

  return (
    <Checkbox checked={initial} onChange={onChange} disabled={disabled}>
      {t("Filters.vote")}
    </Checkbox>
  );
};
