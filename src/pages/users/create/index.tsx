import React, { FC, useCallback } from "react";
import { Button, Card, Form, Input, Select, Space } from "antd";
import { useForm } from "antd/lib/form/Form";
import RoleSwitch from "@lib/components/RoleSwitch";
import { router, useTranslation, Workspace } from "@providers";
import { AuthConsumer } from "@providers/authContext";
import Unauthorized from "pages/_unauthorized";

const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 8 },
};

const UserRegisterPage: FC = () => {
  const { t } = useTranslation("User");

  const [form] = useForm();

  const onReset = (): void => {
    form.resetFields();
  };

  const onAdd = useCallback(async () => {
    router.navigate({ url: router.url({ name: "users:index" }) });
  }, []);

  return (
    <Workspace noRefresh withBack title={t("$views.register.title")}>
      <Card>
        <Form {...formLayout} form={form} name="control-hooks">
          <Form.Item label={t("$views.register.name")}>
            <Input />
          </Form.Item>

          <Form.Item label={t("$views.register.middle_name")}>
            <Input />
          </Form.Item>

          <Form.Item label={t("$views.register.last_name")}>
            <Input />
          </Form.Item>

          <Form.Item label={t("$views.register.email")}>
            <Input />
          </Form.Item>

          <Form.Item label={t("$views.register.roles")}>
            <Select></Select>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Space>
              <Button type="primary" htmlType="submit" onClick={onAdd}>
                {t("$views.buttons.add")}
              </Button>

              <Button htmlType="button" onClick={onReset}>
                {t("$views.buttons.reset")}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </Workspace>
  );
};

export const name = "users:create";

export const pageComponent: FC = () => {
  return (
    <AuthConsumer>
      {({ user }) => {
        return (
          <RoleSwitch
            role={user.role}
            perform={name}
            yes={() => <UserRegisterPage />}
            no={() => <Unauthorized />}
          />
        );
      }}
    </AuthConsumer>
  );
};
