import React, { FC } from "react";
import { Descriptions, Tag } from "antd";
import { Link } from "@curi/react-dom";
import { ModelsDonee as Donee } from "@generated";
// import useAxios from "@providers/axios";
import { fullName } from "@lib/utils/name";
import { useTranslation } from "@providers";

const DoneeInfoTab: FC<{
  applicantId?: string;
  donee?: Donee;
  relationship?: string;
}> = ({ applicantId, donee }) => {
  const { t } = useTranslation("Application");

  // const { data, loading, error } = useAxios

  return (
    <Descriptions
      title={doneeTitle(applicantId, donee, "relationship")}
      layout="vertical"
      bordered
    >
      <Descriptions.Item label={t("$views.card.birthPlace")}>
        Zhou Maomao
      </Descriptions.Item>
      <Descriptions.Item label={t("$views.card.birthday")}>
        19.03.2020
      </Descriptions.Item>
      <Descriptions.Item label={t("$views.card.phone")}>
        +7 999 788 88 90
      </Descriptions.Item>
      <Descriptions.Item label={t("$views.card.address")}>
        No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
      </Descriptions.Item>
      {"f" && (
        <Descriptions.Item label={t("$views.card.relationship")} span={2}>
          <Tag color="green">{"relationship"}</Tag>
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

export default DoneeInfoTab;
