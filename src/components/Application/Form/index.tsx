import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Card,
  Divider,
  Form,
  Input,
  message,
  Space,
  Upload,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import { RcFile } from "antd/lib/upload/interface";
import { InboxOutlined } from "@ant-design/icons";
import { DonationRequestInput } from "@generated";
import { FileFactory } from "@providers/axios";

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
    beforeUpload(file: RcFile) {
      FileFactory.apiFileUploadPost(file)
        .then((r) => {
          setIds(ids.concat([r.data.id ?? ""]));
        })
        .catch((e) => {
          console.error(e);
          message.error(t("$views.createPage.dragger.fileUploadError"));
        });

      return false;
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
