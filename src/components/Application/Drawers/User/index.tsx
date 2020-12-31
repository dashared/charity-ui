import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Card, Descriptions, Drawer, Empty, Skeleton } from "antd";
import { UserApiFactory } from "@generated";
import useAxios from "@providers/axios";

const UserPreview: FC<{
  visible: boolean;
  userId: string;
  onClose: () => void;
}> = ({ userId: id, visible, onClose }) => {
  const { t } = useTranslation("User");

  const { data, loading } = useAxios(UserApiFactory(undefined).userIdGet, id);

  return (
    <Drawer
      visible={visible}
      width={640}
      placement="right"
      closable={false}
      onClose={onClose}
    >
      <Card title={t("title")}>
        {!data && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
        {loading && <Skeleton loading={true} />}
        {data && (
          <>
            <Descriptions.Item label={t("first_name")}>
              {data.first_name ?? "-"}
            </Descriptions.Item>
            <Descriptions.Item label={t("middle_name")}>
              {data.middle_name ?? "-"}
            </Descriptions.Item>
            <Descriptions.Item label={t("last_name")}>
              {data.last_name ?? "-"}
            </Descriptions.Item>
            <Descriptions.Item label={t("email")}>TODO</Descriptions.Item>
            <Descriptions.Item label={t("phone")}>TODO</Descriptions.Item>
            <Descriptions.Item label={t("city")}>TODO</Descriptions.Item>
            <Descriptions.Item label={t("country")}>TODO</Descriptions.Item>
          </>
        )}
      </Card>
    </Drawer>
  );
};

export default UserPreview;
