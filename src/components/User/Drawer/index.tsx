import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Button, Card, Descriptions, Drawer, Empty, Skeleton } from "antd";
import { UserApiFactory } from "@generated";
import { fullName } from "@lib/utils/name";
import { router } from "@providers";
import useAxios from "@providers/axios";

const UserPreview: FC<{
  visible: boolean;
  userId: string;
  onClose: () => void;
}> = ({ userId: id, visible, onClose }) => {
  const { t } = useTranslation("User");

  const { data, loading } = useAxios(
    UserApiFactory(undefined).apiUserIdGet,
    undefined,
    id,
  );
  return (
    <Drawer
      visible={visible}
      width={640}
      placement="right"
      closable={false}
      onClose={onClose}
    >
      <Card
        bordered={false}
        title={t("title")}
        extra={
          <Button
            onClick={() =>
              router.navigate({
                url: router.url({ name: "users:show", params: { id } }),
              })
            }
          >
            {t("$views.buttons.visitPage")}
          </Button>
        }
      >
        {!data && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
        {loading && <Skeleton loading={true} />}

        {data && (
          <Descriptions bordered={true}>
            <Descriptions.Item label={t("credentials")} span={3}>
              {fullName(data.first_name, data.middle_name, data.last_name)}
            </Descriptions.Item>
            <Descriptions.Item label={t("birthday")} span={3}>
              {data.birth_date ?? "-"}
            </Descriptions.Item>
            <Descriptions.Item label={t("phone")} span={3}>
              {data.phone ?? "-"}
            </Descriptions.Item>
            <Descriptions.Item label={t("email")} span={3}>
              {data.email ?? "-"}
            </Descriptions.Item>
            <Descriptions.Item label={t("city")} span={3}>
              {data.city ?? "-"}
            </Descriptions.Item>
            <Descriptions.Item label={t("country")} span={3}>
              {data.country ?? "-"}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Card>
    </Drawer>
  );
};

export default UserPreview;
