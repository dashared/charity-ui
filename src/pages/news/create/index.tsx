import React, { FC, useCallback } from "react";
import { Button, Card, Form, Input, Space } from "antd";
import { useForm } from "antd/lib/form/Form";
import { NewsInput } from "@generated";
import RoleSwitch from "@lib/components/RoleSwitch";
import { notify } from "@lib/utils/notification";
import { router, useTranslation, Workspace } from "@providers";
import { AuthConsumer } from "@providers/authContext";
import { NewsFactory } from "@providers/axios";
import Unauthorized from "pages/_unauthorized";

//const { Option } = Select;

const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 8 },
};

const CreateNewsPage: FC = () => {
  const { t } = useTranslation("News");

  const [form] = useForm<NewsInput>();

  const onReset = (): void => {
    form.resetFields();
  };

  const onCreate = useCallback(() => {
    const data = form.getFieldsValue();
    NewsFactory.apiNewsPost(data)
      .then(() => {
        notify(t("$views.createSuccess"), "success");
        router.navigate({ url: router.url({ name: "news:index" }) });
      })
      .catch((e) => {
        console.error(e);
        notify(t("$views.createError"), "error");
      });
  }, [form, t]);

  return (
    <Workspace title={t("createTitle")} noRefresh withBack>
      <Card>
        <Form
          {...formLayout}
          form={form}
          name="control-hooks"
          onFinish={onCreate}
        >
          <Form.Item
            name={["title"]}
            label={t("$views.create.title")}
            rules={[{ required: true, message: t("$views.message.title") }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={["text"]}
            label={t("$views.create.text")}
            rules={[{ required: true, message: t("$views.message.text") }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name={["description"]}
            label={t("$views.create.description")}
            rules={[
              { required: true, message: t("$views.message.description") },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Space>
              <Button type="primary" htmlType="submit">
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

export const name = "news:create";

export const pageComponent: FC = () => {
  return (
    <AuthConsumer>
      {({ user }) => {
        return (
          <RoleSwitch
            role={user.role}
            perform={name}
            yes={() => <CreateNewsPage />}
            no={() => <Unauthorized />}
          />
        );
      }}
    </AuthConsumer>
  );
};
