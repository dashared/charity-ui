import React, { FC } from "react";
import { Avatar, Button, Card, Col, Form, Row, Space } from "antd";
import { ProfileFilled } from "@ant-design/icons";
import { UserUser } from "@generated";
import RoleSwitch from "@lib/components/RoleSwitch";
import { fullName } from "@lib/utils/name";
import { useTranslation } from "@providers";
import { AuthConsumer } from "@providers/authContext";
import { Role } from "@providers/rbac-rules";

import BlockedTag from "components/User/Block/tag";
import RoleTag from "components/User/Role/tag";

const Actions: FC<{ userData: UserUser }> = () => {
  const { t } = useTranslation("User");

  return (
    <AuthConsumer>
      {({ user }) => {
        return (
          <RoleSwitch
            role={user.role}
            perform="user:actions" // user.isBlocked?
            yes={() => (
              <Space>
                <Button danger>{t("$views.buttons.edit")}</Button>
                <Button danger>{t("$views.buttons.block")}</Button>
              </Space>
            )}
          />
        );
      }}
    </AuthConsumer>
  );
};

export const InfoTab: FC<{ user: UserUser }> = ({ user }) => {
  const { t } = useTranslation("User");

  const { first_name, middle_name, last_name } = user;

  return (
    // TODO: fill up with real data
    <>
      <Card
        bordered={false}
        title={t("$views.tab.info")}
        extra={<Actions userData={user} />}
      >
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
            </Form>
          </Col>
          <Col span={12}>
            <Form>
              <Form.Item label={t("email")}>
                <span>ivanov@mail.ru</span>
              </Form.Item>
              <Form.Item label={t("address")}>
                <span>
                  {" "}
                  No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                </span>
              </Form.Item>
              <Form.Item label={t("roles")}>
                <span>
                  <RoleTag roles={[Role.admin, Role.operator]} />
                </span>
              </Form.Item>
              <Form.Item>
                <BlockedTag isBlocked={true} />
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Card>
    </>
  );
};
