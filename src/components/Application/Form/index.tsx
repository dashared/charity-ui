import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Button, Card, Form, Input, Space } from "antd";
import { useForm } from "antd/lib/form/Form";

const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 8 },
};

const CreatePage: FC<{ onCreate: () => void }> = ({ onCreate }) => {
  const { t } = useTranslation("Application");

  const [form] = useForm();

  const onReset = (): void => {
    form.resetFields();
  };

  return (
    <Card>
      <Form
        {...formLayout}
        form={form}
        name="control-hooks"
        onFinish={onCreate}
      >
        <Form.Item
          name={["user", "first_name"]}
          label={t("$views.createPage.title")}
          rules={[{ required: true, message: t("$views.message.title") }]}
        >
          <Input />
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
  );
};

export default CreatePage;
