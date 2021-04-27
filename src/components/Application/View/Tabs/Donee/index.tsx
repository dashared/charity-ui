import React, { FC } from "react";
import { Descriptions } from "antd";
import { UserSimpleUser as Donee } from "@generated";
import { fullName } from "@lib/utils/name";
import { useTranslation } from "@providers";

export const DoneeInfo: FC<{
  donee?: Donee;
  relationship?: string;
}> = ({ donee, relationship }) => {
  const { t } = useTranslation("Application");

  if (!donee) {
    return null;
  }

  const { first_name, middle_name, last_name } = donee;

  const doneeFullName = fullName(first_name, middle_name, last_name);

  if (doneeFullName.length === 0) {
    return null;
  }

  return (
    <Descriptions title={t("$views.card.donee")} layout="vertical" bordered>
      <Descriptions.Item label={t("$views.card.donee_fullname")}>
        {doneeFullName}
      </Descriptions.Item>
      {relationship && (
        <Descriptions.Item label={t("$views.card.relationship")} span={2}>
          <span>{relationship}</span>
        </Descriptions.Item>
      )}
    </Descriptions>
  );
};
