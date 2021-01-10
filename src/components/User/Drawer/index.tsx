import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Card, Descriptions, Drawer, Empty, Skeleton } from "antd";
import { Link } from "@curi/react-dom";
import { UserApiFactory } from "@generated";
import { fullName } from "@lib/utils/name";
import useAxios from "@providers/axios";

const UserPreview: FC<{
  visible: boolean;
  userId: string;
  onClose: () => void;
}> = ({ userId: id, visible, onClose }) => {
  const { t } = useTranslation("User");

  const { data, loading } = useAxios(
    UserApiFactory(undefined).userIdGet,
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
        title={
          <Link name="users:show" params={{ id }}>
            {t("title")}
          </Link>
        }
      >
        {!data && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
        {loading && <Skeleton loading={true} />}

        {data && (
          <Descriptions bordered={true}>
            <Descriptions.Item label={t("credentials")} span={3}>
              {fullName(data.first_name, data.last_name, data.middle_name)}
            </Descriptions.Item>
            <Descriptions.Item label={t("phone")} span={3}>
              1810000000
            </Descriptions.Item>
            <Descriptions.Item label={t("country")} span={3}>
              Hangzhou, Zhejiang
            </Descriptions.Item>
            <Descriptions.Item label={t("email")} span={3}>
              ivanov@mail.ru
            </Descriptions.Item>
            <Descriptions.Item label={t("address")} span={3}>
              No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
            </Descriptions.Item>
          </Descriptions>
        )}
      </Card>
    </Drawer>
  );
};

export default UserPreview;
