import React, { FC, useCallback, useState } from "react";
import { Button, Card, Form, Input, Space, Upload } from "antd";
import { useForm } from "antd/lib/form/Form";
import { UploadOutlined } from "@ant-design/icons";
import { NewsInput } from "@generated";
import RoleSwitch from "@lib/components/RoleSwitch";
import { notify } from "@lib/utils/notification";
import { router, useTranslation, Workspace } from "@providers";
import { AuthConsumer } from "@providers/authContext";
import { NewsFactory } from "@providers/axios";
import { customRequest } from "@providers/cusomUpload";
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

  const [id, setId] = useState<string>();

  const onReset = (): void => {
    form.resetFields();
  };

  const onCreate = useCallback(() => {
    const data = form.getFieldsValue();
    NewsFactory.apiNewsPost({
      ...data,
      image_id: id,
    })
      .then(() => {
        notify(t("$views.createSuccess"), "success");
        router.navigate({ url: router.url({ name: "news:index" }) });
      })
      .catch((e) => {
        console.error(e);
        notify(t("$views.createError"), "error");
      });
  }, [form, t, id]);

  return (
    <Workspace title={t("createTitle")} noRefresh withBack>
      <Card>
        <Form
          {...formLayout}
          form={form}
          name="control-hooks"
          onFinish={onCreate}
        >
          <Form.Item name={["image_id"]} label={t("$views.create.image")}>
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture"
              customRequest={(options) => {
                customRequest(options, setId);
              }}
              multiple={false}
            >
              <Button icon={<UploadOutlined />}>
                {t("$views.create.imageUpload")}
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name={["title"]}
            label={t("$views.create.title")}
            rules={[
              { required: true, message: t("$views.message.title"), max: 100 },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={["description"]}
            label={t("$views.create.description")}
            rules={[
              {
                required: true,
                message: t("$views.message.description"),
                max: 200,
              },
            ]}
          >
            <Input.TextArea
              showCount
              allowClear
              maxLength={200}
              autoSize={{ minRows: 2, maxRows: 3 }}
            />
          </Form.Item>

          <Form.Item
            name={["text"]}
            label={t("$views.create.text")}
            rules={[{ required: true, message: t("$views.message.text") }]}
          >
            <Input.TextArea allowClear autoSize={{ minRows: 6 }} />
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
