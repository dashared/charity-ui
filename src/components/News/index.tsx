import React, { forwardRef, ForwardRefRenderFunction, useState } from "react";
import { Button, Form, Input, Upload } from "antd";
import { FormInstance } from "antd/lib/form";
import { UploadFile } from "antd/lib/upload/interface";
import { UploadOutlined } from "@ant-design/icons";
import { NewsInput as NewsEditableInfo, NewsView } from "@generated";
import { useTranslation } from "@providers";
import { customRequest } from "@providers/cusomUpload";

export type NewsFormState = NewsEditableInfo;

export type NewsFormHandler = FormInstance<NewsFormState>;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};

type NewsFormProps = {
  initial?: NewsView;
  onSubmit: (value: NewsEditableInfo) => Promise<void> | void;
};

const NewsForm: ForwardRefRenderFunction<NewsFormHandler, NewsFormProps> = (
  { initial, onSubmit },
  ref,
) => {
  const { t } = useTranslation("News");

  const [id, setId] = useState<string | undefined>(initial?.image_id);

  // eslint-disable-next-line
  const handleOnChange = ({ fileList }: any): void => {
    setFileList(fileList);
  };

  // eslint-disable-next-line
  const [profileList, setFileList] = useState<Array<UploadFile<any>>>(
    id
      ? [
          {
            uid: id,
            status: "done",
            name: "photo",
            size: 0,
            type: "image/png",
            url: `/api/file/${initial?.image_id}/download`,
          },
        ]
      : [],
  );

  return (
    <Form
      {...layout}
      ref={ref}
      initialValues={{
        ...initial,
      }}
      onFinish={(values) => {
        const image_id = profileList[0]?.response
          ? profileList[0]?.response[0]?.id
          : undefined;
        onSubmit?.({
          ...values,
          image_id,
        });
      }}
    >
      <Form.Item name={["image_id"]} label={t("$views.create.image")}>
        <Upload
          listType="picture"
          customRequest={(options) => {
            customRequest(options, (ids) => setId(ids[0]));
          }}
          fileList={profileList}
          onChange={handleOnChange}
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
    </Form>
  );
};

export default forwardRef(NewsForm);
