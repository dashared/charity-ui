import React, { FC } from "react";
import { Avatar, Col, Form, Row } from "antd";
import { ProfileFilled } from "@ant-design/icons";
import { UserUser as User } from "@generated";
import RoleSwitch from "@lib/components/RoleSwitch";
import { formatDate, formatString } from "@lib/utils";
import { fullName } from "@lib/utils/name";
import { useTranslation } from "@providers";
import { UserApiRole } from "@providers/axios";
import { Role } from "@providers/rbac-rules";

import BlockedTag from "components/User/Block/tag";
import RoleTag from "components/User/Role/tag";

type UserInfoProps = {
  user: User;
  role: Role;
};

const UserInfo: FC<UserInfoProps> = ({ user, role }) => {
  const { t } = useTranslation("User");

  const { first_name, middle_name, last_name } = user;

  return (
    <Row justify="space-between" align="top">
      <Col span={4}>
        <Avatar
          size={{ xs: 70, sm: 80, md: 100, lg: 120, xl: 130, xxl: 140 }}
          icon={<ProfileFilled />}
        ></Avatar>
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

          <Form.Item>
            <BlockedTag isBlocked={true} />
          </Form.Item>
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
    </Row>
  );
};

export default UserInfo;
