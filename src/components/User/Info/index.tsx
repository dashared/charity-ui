import React, { FC } from "react";
import { Avatar, Col, Form, Row } from "antd";
import { ProfileFilled } from "@ant-design/icons";
import { UserUser as User } from "@generated";
import RoleSwitch from "@lib/components/RoleSwitch";
import { fullName } from "@lib/utils/name";
import { useTranslation } from "@providers";
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
            <span>89997890647474</span>
          </Form.Item>
          <Form.Item label={t("country")}>
            <span>Hangzhou, Zhejiang</span>
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
                    <span>24b74642-7926-4669-a6c4-755502efa06f</span>
                  </Form.Item>
                  <Form.Item label={t("created_at")}>
                    <span>03.01.2020 в 12:33</span>
                  </Form.Item>
                </>
              );
            }}
          />
          <Form.Item label={t("email")}>
            <span>ivanov@mail.ru</span>
          </Form.Item>
          <Form.Item label={t("address")}>
            <span>
              No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
            </span>
          </Form.Item>
          <Form.Item label={t("roles")}>
            <span>
              <RoleTag roles={[Role.admin, Role.operator]} />
            </span>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default UserInfo;
