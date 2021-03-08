import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Card, Divider, Form, Input, Space, Upload } from "antd";
import { useForm } from "antd/lib/form/Form";
import { RcCustomRequestOptions } from "antd/lib/upload/interface";
import { InboxOutlined } from "@ant-design/icons";
import { DonationRequestInput, FileInfo } from "@generated";

import RelationshipSelect from "./relationship_select";

const { Dragger } = Upload;

const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 8 },
};

const CreatePage: FC<{ onCreate: (values: DonationRequestInput) => void }> = ({
  onCreate,
}) => {
  const { t } = useTranslation("Application");

  const [ids, setIds] = useState<string[]>([]);

  const [form] = useForm<DonationRequestInput>();

  const onReset = (): void => {
    form.resetFields();
  };

  const draggerProps = {
    name: "file",
    multiple: true,
    defaultFileList: [],
    customRequest(options: RcCustomRequestOptions) {
      const { file, onError, onSuccess } = options;

      const url = `${process.env.REACT_APP_API_URL}/api/file/upload`;

      const formData = new FormData();
      formData.append("file", file as Blob);
      const request = new XMLHttpRequest();

      request.open("POST", url);
      request.send(formData);

      request.onload = function () {
        if (request.status === 200) {
          const parsed: FileInfo[] = JSON.parse(request.responseText);
          setIds(ids.concat(parsed.map((value) => value.id ?? "")));

          return onSuccess(parsed, file);
        } else {
          return onError(Error(request.statusText));
        }
      };
    },
  };

  return (
    <Card>
      <Form
        {...formLayout}
        form={form}
        name="control-hooks"
        onFinish={(values) => {
          onCreate({
            ...values,
            file_ids: ids,
          });
        }}
      >
        <Form.Item
          name={["title"]}
          label={t("$views.createPage.title")}
          rules={[{ required: true, message: t("$views.message.title") }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={["description"]}
          label={t("$views.createPage.description")}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item name={["file_ids"]} label={t("$views.createPage.files")}>
          <Dragger {...draggerProps}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              {t("$views.createPage.dragger.title")}
            </p>
            <p className="ant-upload-hint">
              {t("$views.createPage.dragger.description")}
            </p>
          </Dragger>
        </Form.Item>

        <Form.Item
          name="relationship"
          label={t("$views.createPage.relationship")}
        >
          <RelationshipSelect />
        </Form.Item>

        <Divider />

        <Form.Item name={["message"]} label={t("$views.createPage.message")}>
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
  );
};

export default CreatePage;
