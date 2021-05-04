/* eslint-disable  @typescript-eslint/no-explicit-any */
import React, { forwardRef, ForwardRefRenderFunction, useState } from "react";
import Editor from "react-markdown-editor-lite";
import { Button, Card, Form, Input, Upload } from "antd";
import { FormInstance } from "antd/lib/form";
import { UploadFile } from "antd/lib/upload/interface";
import { UploadOutlined } from "@ant-design/icons";
import {
  CharityFundInfoResponse as CharityFundInfo,
  CharityFundInput,
} from "@generated";
import { useTranslation } from "@providers";
import { customRequest } from "@providers/cusomUpload";

import FAQEditor from "components/FAQ/Editor";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};

type EditPageProps = {
  initialInfo?: CharityFundInfo;
  onSubmit: (info: CharityFundInput) => Promise<void> | void;
};

export type CharityInfoHandler = FormInstance<CharityFundInput>;

const EditFundDescription: ForwardRefRenderFunction<
  CharityInfoHandler,
  EditPageProps
> = ({ initialInfo, onSubmit }, ref) => {
  const { t } = useTranslation("Fund");

  const [ids, setIds] = useState(
    initialInfo?.files?.map((item) => item.id ?? ""),
  );

  const editorRef = React.useRef<Editor>(null);

  const initialFileList = (initialInfo?.files ?? []).map<UploadFile<any>>(
    (item) => {
      return {
        uid: item.id ?? "",
        status: "done",
        name: item.title ?? "file",
        size: 0,
        type: item.mime_type ?? "image/png",
        url: `/api/file/${item.id}/download`,
      };
    },
  );

  const handleOnChange = ({ fileList }: any): void => {
    setFileList(fileList);
  };

  const [fileList, setFileList] = useState<Array<UploadFile<any>>>(
    initialFileList,
  );

  return (
    <Card title={t("generalInfo")}>
      <Form
        {...layout}
        initialValues={initialInfo}
        ref={ref}
        onFinish={(values) => {
          onSubmit?.({
            ...values,
            description:
              (editorRef as React.RefObject<Editor>).current?.getMdValue() ??
              "",
            file_ids: ids,
          });
        }}
      >
        <Form.Item
          name={["title"]}
          label={t("$views.editPage.title")}
          rules={[{ required: true, message: t("$views.message.title") }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["address"]}
          label={t("$views.editPage.address")}
          //rules={[{ required: true, message: t("$views.message.address") }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          name={["phone"]}
          label={t("$views.editPage.phone")}
          //rules={[{ required: true, message: t("$views.message.phone") }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={["email"]}
          label={t("$views.editPage.email")}
          //rules={[{ required: true, message: t("$views.message.email") }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name={["files"]} label={t("$views.editPage.files")}>
          <Upload
            onChange={handleOnChange}
            fileList={fileList}
            customRequest={(options) => customRequest(options, setIds)}
          >
            <Button icon={<UploadOutlined />}>
              {t("$views.editPage.upload")}
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item
          name={["description"]}
          label={t("$views.editPage.description")}
        >
          <FAQEditor
            editorRef={editorRef}
            initialValue={initialInfo?.description ?? ""}
          />
        </Form.Item>
      </Form>
    </Card>
  );
};

export default forwardRef(EditFundDescription);
