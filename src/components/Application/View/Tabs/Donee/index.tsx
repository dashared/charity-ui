import React, { FC } from "react";
import { Descriptions } from "antd";
import { Link } from "@curi/react-dom";
import { UserSimpleUser as Donee } from "@generated";
import { fullName } from "@lib/utils/name";
import { useTranslation } from "@providers";

export const DoneeInfoTab: FC<{
  applicantId?: string;
  donee?: Donee;
  relationship?: string;
}> = ({ applicantId, donee, relationship }) => {
  const { t } = useTranslation("Application");

  return (
    <Descriptions
      title={doneeTitle(applicantId, donee, relationship)}
      layout="vertical"
      bordered
    >
      <Descriptions.Item label={t("$views.card.country")}>
        Россия
      </Descriptions.Item>
      <Descriptions.Item label={t("$views.card.city")}>
        г. Москва
      </Descriptions.Item>
      <Descriptions.Item label={t("$views.card.birthday")}>
        19.03.2020
      </Descriptions.Item>
      <Descriptions.Item label={t("$views.card.phone")}>
        +7 999 788 88 90
      </Descriptions.Item>
      {relationship && (
        <Descriptions.Item label={t("$views.card.relationship")} span={2}>
          <span>{relationship}</span>
        </Descriptions.Item>
      )}
    </Descriptions>
  );
};

function doneeTitle(
  applicantId?: string,
  donee?: Donee,
  relationship?: string,
): JSX.Element {
  if (relationship) {
    return (
      <span>
        {fullName(donee?.first_name, donee?.middle_name, donee?.last_name)}
      </span>
    );
  } else {
    return (
      <Link name="user:show" params={{ id: applicantId }}>
        {fullName(donee?.first_name, donee?.middle_name, donee?.last_name)}
      </Link>
    );
  }
}
