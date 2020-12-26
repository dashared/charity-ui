import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Descriptions, Drawer, Empty, Skeleton } from "antd";
import { DefaultApiFactory } from "@generated";
import useAxios from "@providers/axios";

const UserPreview: FC<{
  visible: boolean;
  userId: string;
  onClose: () => void;
}> = ({ userId: id, visible, onClose }) => {
  const { t } = useTranslation("User");

  const { data, loading } = useAxios(
    DefaultApiFactory(undefined).userIdGet,
    id,
  );

  if (!data) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }

  if (loading) {
    return <Skeleton loading={true} />;
  }

  const user = data;

  return (
    <Drawer
      visible={visible}
      width={640}
      placement="right"
      closable={false}
      onClose={onClose}
    >
      <Descriptions title={t("title")} layout="vertical" bordered>
        <Descriptions.Item label={t("first_name")}>
          {user.first_name ?? "-"}
        </Descriptions.Item>
        <Descriptions.Item label={t("middle_name")}>
          {user.middle_name ?? "-"}
        </Descriptions.Item>
        <Descriptions.Item label={t("last_name")}>
          {user.last_name ?? "-"}
        </Descriptions.Item>
        <Descriptions.Item label={t("email")}>TODO</Descriptions.Item>
        <Descriptions.Item label={t("phone")}>TODO</Descriptions.Item>
        <Descriptions.Item label={t("city")}>TODO</Descriptions.Item>
        <Descriptions.Item label={t("country")}>TODO</Descriptions.Item>
      </Descriptions>
    </Drawer>
  );
};

export default UserPreview;
