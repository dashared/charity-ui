/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  FC,
  forwardRef,
  ForwardRefRenderFunction,
  useState,
} from "react";
import { Card, DatePicker, Form, Input, Upload } from "antd";
import { FormInstance } from "antd/lib/form";
import { PlusOutlined } from "@ant-design/icons";
import { UserUser } from "@generated";
import { useTranslation } from "@providers";
import { FileFactory } from "@providers/axios";

import RoleTag from "components/User/Role/tag";

export type PersonalSettingsFormState = UserUser;

export type PersonalSettingsHandler = FormInstance<PersonalSettingsFormState>;

type PersonalSettingsFormProps = {
  initial?: PersonalSettingsFormState;
  onSubmit?: (values: PersonalSettingsFormState) => void | Promise<void>;
};

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

const UploadButton: FC = () => {
  const { t } = useTranslation("Settings");
  return (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>{t("upload")}</div>
    </div>
  );
};

const PersonalSettingsForm: ForwardRefRenderFunction<
  PersonalSettingsHandler,
  PersonalSettingsFormProps
> = ({ initial, onSubmit }, ref) => {
  const { t } = useTranslation("Settings");

  const [profileList, setFileList] = useState([]);

  const uploadImage = async (options: any): Promise<void> => {
    const { onSuccess, onError, file } = options;
    try {
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      await FileFactory.apiFileUploadPost({
        file,
        config,
      });

      onSuccess("Ok");
    } catch (err) {
      console.error(err);
      onError({ err });
    }
  };

  const handleOnChange = ({ fileList }: any): void => {
    setFileList(fileList);
  };

  return (
    <Card bordered={false} title={t("personal")} id="personal">
      <Form
        {...layout}
        ref={ref}
        initialValues={{
          ...initial,
        }}
        onFinish={(values) => {
          console.log(values);
          onSubmit?.(values);
        }}
      >
        <Form.Item label={t("profile_picture")} name="image">
          <Upload
            accept="image/*"
            customRequest={uploadImage}
            listType="picture-card"
            fileList={profileList}
            onChange={handleOnChange}
          >
            {profileList.length >= 1 ? null : <UploadButton />}
          </Upload>
        </Form.Item>

        <Form.Item name="first_name" label={t("first_name")} required={true}>
          <Input />
        </Form.Item>

        <Form.Item name="middle_name" label={t("middle_name")}>
          <Input />
        </Form.Item>

        <Form.Item name="last_name" label={t("last_name")} required={true}>
          <Input />
        </Form.Item>

        {initial?.role && (
          <Form.Item name="role" label={t("role")}>
            <RoleTag roles={[initial?.role]} />
          </Form.Item>
        )}

        <Form.Item name="email" label={t("email")} required={true}>
          <Input />
        </Form.Item>

        <Form.Item name="country" label={t("country")}>
          <Input />
        </Form.Item>

        <Form.Item name="city" label={t("city")}>
          <Input />
        </Form.Item>

        <Form.Item name="birth_date" label={t("birth_date")}>
          <DatePicker />
        </Form.Item>

        <Form.Item name="info" label={t("info")}>
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Card>
  );
};

export default forwardRef(PersonalSettingsForm);
