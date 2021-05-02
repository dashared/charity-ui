import React, { FC } from "react";
import { Avatar, Col, Form, Row } from "antd";
import { UserOutlined } from "@ant-design/icons";
import RoleSwitch from "@lib/components/RoleSwitch";
import { formatCategories, formatDate, formatString } from "@lib/utils";
import { fullName } from "@lib/utils/name";
import { i18n, useTranslation } from "@providers";
import { UserApiModel as User, UserApiRole } from "@providers/axios";
import { Role } from "@providers/rbac-rules";

import BlockedTag from "components/User/Block/tag";
import RoleTag from "components/User/Role/tag";

type UserInfoProps = {
  user: User;
  role: Role;
};

const UserInfo: FC<UserInfoProps> = ({ user, role }) => {
  const { t } = useTranslation("User");

  const lang = i18n.language.substr(0, 2);

  const { first_name, middle_name, last_name, image_id } = user;

  const props = {
    size: { xs: 24, sm: 40, md: 60, lg: 80, xl: 100, xxl: 150 },
    src: image_id ? `/api/file/${image_id}/download` : undefined,
    icon: image_id ? undefined : <UserOutlined />,
  };

  return (
    <Row align="top" justify="space-around" gutter={16}>
      <Col span={3}>
        <Avatar {...props} />
      </Col>
      <Col span={8}>
        <Form>
          <Form.Item label={t("credentials")}>
            <span>{fullName(first_name, middle_name, last_name)}</span>
          </Form.Item>
          <Form.Item label={t("phone")}>
            <span>{formatString(user.phone)}</span>
          </Form.Item>
          <Form.Item label={t("country")}>
            <span>{formatString(user.country)}</span>
          </Form.Item>
          {(user.blocked ?? false) && (
            <Form.Item>
              <BlockedTag isBlocked={user.blocked ?? false} />
            </Form.Item>
          )}
        </Form>
      </Col>
      <Col span={12}>
        <Form>
          <RoleSwitch
            role={role}
            perform="user:show-admin"
            yes={() => {
              return (
                <>
                  <Form.Item label={t("uuid")}>
                    <span>{user.id}</span>
                  </Form.Item>
                  <Form.Item label={t("created_at")}>
                    <span>{formatDate(user.created_at)}</span>
                  </Form.Item>
                </>
              );
            }}
          />
          <Form.Item label={t("email")}>
            <span>{formatString(user.email)}</span>
          </Form.Item>
          <Form.Item label={t("city")}>
            <span>{formatString(user.city)}</span>
          </Form.Item>
          <Form.Item label={t("roles")}>
            <span>
              <RoleTag roles={[user.role ?? UserApiRole.User]} />
            </span>
          </Form.Item>
        </Form>
      </Col>

      {user.role === UserApiRole.SuperManager && (
        <>
          <Col span={3}></Col>
          <Col span={19}>
            <Form.Item label={t("categories")}>
              {formatCategories(lang, user.assigned_categories)}
            </Form.Item>
          </Col>
          <Col span={1}></Col>
        </>
      )}
    </Row>
  );
};

export default UserInfo;
