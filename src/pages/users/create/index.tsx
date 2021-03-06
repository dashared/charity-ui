import React, { FC, useCallback, useState } from "react";
import { Button, Card, Form, Input, Select, Space } from "antd";
import { useForm } from "antd/lib/form/Form";
import {
  AuthManagerRegistrationInput,
  AuthManagerRegistrationInputRoleEnum as Roles,
} from "@generated";
import RoleSwitch from "@lib/components/RoleSwitch";
import { notify } from "@lib/utils/notification";
import { i18n, router, useTranslation, Workspace } from "@providers";
import { AuthConsumer } from "@providers/authContext";
import useAxios, {
  CategoryFactory,
  RegistrationFactory,
} from "@providers/axios";
import Unauthorized from "pages/_unauthorized";

import SelectCategory from "components/Category/select";

const RolesArr = [
  Roles.User,
  Roles.SuperManager,
  Roles.Operator,
  Roles.Manager,
  Roles.ContentManager,
  Roles.Admin,
];

const { Option } = Select;

const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 8 },
};

const UserRegisterPage: FC = () => {
  const { t } = useTranslation("Users");

  const [form] = useForm<AuthManagerRegistrationInput>();

  const [role, setRole] = useState<Roles | undefined>();
  const [loading, setLoading] = useState(false);

  const onReset = (): void => {
    form.resetFields();
    setRole(undefined);
  };

  const lang = i18n.language.substr(0, 2);

  const { data: categories } = useAxios(CategoryFactory.apiCategoriesGet);

  const onAdd = useCallback(async () => {
    const data = form.getFieldsValue();
    setLoading(true);
    RegistrationFactory.apiRegisterManagerPost(data)
      .then(() => {
        notify(t("$views.registrationSuccess"), "success");
        router.navigate({ url: router.url({ name: "users:index" }) });
      })
      .catch((e) => {
        console.error(e);
        notify(t("$views.registrationError"), "error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [form, t]);

  return (
    <Workspace noRefresh withBack title={t("$views.register.title")}>
      <Card>
        <Form {...formLayout} form={form} name="control-hooks" onFinish={onAdd}>
          <Form.Item
            name={["user", "last_name"]}
            label={t("$views.register.last_name")}
            rules={[{ required: true, message: t("$views.message.last_name") }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={["user", "first_name"]}
            label={t("$views.register.name")}
            rules={[
              { required: true, message: t("$views.message.first_name") },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={["user", "middle_name"]}
            label={t("$views.register.middle_name")}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={["user", "email"]}
            label={t("$views.register.email")}
            rules={[{ required: true, message: t("$views.message.email") }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={["role"]}
            label={t("$views.register.roles")}
            rules={[{ required: true, message: t("$views.message.roles") }]}
          >
            <Select //mode="multiple" TODO
              onChange={(value) => setRole(value as Roles)}
            >
              {RolesArr.map((value) => {
                return (
                  <Option key={value} value={value}>
                    {t(`Role.${value}`)}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          {role === Roles.SuperManager && (
            <Form.Item
              name={["assigned_categories"]}
              label={t("$views.register.categories")}
            >
              <SelectCategory categories={categories ?? []} lang={lang} />
            </Form.Item>
          )}

          <Form.Item {...tailLayout}>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
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
