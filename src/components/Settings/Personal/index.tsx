/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  FC,
  forwardRef,
  ForwardRefRenderFunction,
  useState,
} from "react";
import { Card, DatePicker, Form, Input, Select, Switch, Upload } from "antd";
import { FormInstance } from "antd/lib/form";
import { RcCustomRequestOptions, UploadFile } from "antd/lib/upload/interface";
import { PlusOutlined } from "@ant-design/icons";
import {
  AuthManagerRegistrationInputRoleEnum as Roles,
  FileInfo,
  UserEditableInfo,
  UserUser,
  UserUserRoleEnum,
} from "@generated";
import RoleSwitch from "@lib/components/RoleSwitch";
import { useTranslation } from "@providers";
import { AuthConsumer } from "@providers/authContext";
import moment from "moment";

import BlockedTag from "components/User/Block/tag";
import RoleTag from "components/User/Role/tag";

const RolesArr = [
  Roles.User,
  Roles.SuperManager,
  Roles.Operator,
  Roles.Manager,
  Roles.ContentManager,
  Roles.Admin,
];

const { Option } = Select;

export type PersonalSettingsFormState = UserEditableInfo;

export type PersonalSettingsHandler = FormInstance<PersonalSettingsFormState>;

type PersonalSettingsFormProps = {
  initial?: UserUser;
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

  const [id, setId] = useState<string | undefined>();

  const [profileList, setFileList] = useState<Array<UploadFile<any>>>(
    initial?.image_id
      ? [
          {
            uid: "-1",
            status: "done",
            name: "avatar",
            size: 0,
            type: "image/png",
            url: `/api/file/${initial?.image_id}/download`,
          },
        ]
      : [],
  );

  const customRequest = (options: RcCustomRequestOptions): void => {
    const { file, onError, onSuccess } = options;

    const url = `/api/file/upload`;

    const formData = new FormData();
    formData.append("file", file as Blob);
    const request = new XMLHttpRequest();

    request.open("POST", url);
    request.send(formData);

    request.onload = function () {
      if (request.status === 200) {
        const parsed: FileInfo[] = JSON.parse(request.responseText);
        setId(parsed.map((value) => value.id ?? "")[0]);

        return onSuccess(parsed, file);
      } else {
        return onError(Error(request.statusText));
      }
    };
  };

  const handleOnChange = ({ fileList }: any): void => {
    setFileList(fileList);
  };

  return (
    <AuthConsumer>
      {({ user }) => {
        return (
          <Card bordered={false} title={t("personal")} id="personal">
            <Form
              {...layout}
              ref={ref}
              initialValues={{
                ...initial,
                birth_date: initial?.birth_date
                  ? moment(initial?.birth_date)
                  : undefined,
              }}
              onFinish={(values) => {
                onSubmit?.({
                  ...values,
                  image_id: id ?? "",
                });
              }}
            >
              <Form.Item label={t("profile_picture")} name="image">
                <Upload
                  accept="image/*"
                  customRequest={customRequest}
                  listType="picture-card"
                  fileList={profileList}
                  onChange={handleOnChange}
                >
                  {profileList.length >= 1 ? null : <UploadButton />}
                </Upload>
              </Form.Item>

              <Form.Item
                name="first_name"
                label={t("first_name")}
                required={true}
              >
                <Input />
              </Form.Item>

              <Form.Item name="middle_name" label={t("middle_name")}>
                <Input />
              </Form.Item>

              <Form.Item
                name="last_name"
                label={t("last_name")}
                required={true}
              >
                <Input />
              </Form.Item>

              <RoleSwitch
                role={user.role}
                perform="user:edit"
                no={() => {
                  return (
                    <Form.Item name="role" label={t("role")}>
                      <RoleTag
                        roles={[(initial?.role as unknown) as UserUserRoleEnum]}
                      />
                    </Form.Item>
                  );
                }}
                yes={() => {
                  return (
                    <Form.Item name="role" label={t("role")}>
                      <Select>
                        {RolesArr.map((value) => {
                          return (
                            <Option key={value} value={value}>
                              {t(`Role.${value}`)}
                            </Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                  );
                }}
              />

              <Form.Item name="email" label={t("email")} required={true}>
                {initial?.email}
              </Form.Item>

              <Form.Item name="country" label={t("country")}>
                <Input />
              </Form.Item>

              <Form.Item name="city" label={t("city")}>
                <Input />
              </Form.Item>

              <Form.Item name="birth_date" label={t("birth_date")}>
                <DatePicker style={{ width: 200 }} />
              </Form.Item>

              <Form.Item name="phone" label={t("phone")}>
                <Input />
              </Form.Item>

              <RoleSwitch
                role={user.role}
                perform="user:edit"
                no={() => {
                  return (
                    <Form.Item name="blocked" label={t("blocked")}>
                      <BlockedTag isBlocked={initial?.blocked ?? false} />
                    </Form.Item>
                  );
                }}
                yes={() => {
                  return (
                    <Form.Item name="blocked" label={t("blocked")}>
                      <Switch />
                    </Form.Item>
                  );
                }}
              />
            </Form>
          </Card>
        );
      }}
    </AuthConsumer>
  );
};

export default forwardRef(PersonalSettingsForm);
