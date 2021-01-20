import React, { FC } from "react";
import { Button, Card, Form, Input, Skeleton } from "antd";
import { useTranslation } from "@providers";
import useAxios, { UserRequestFactory } from "@providers/axios";
// import { IdComponent } from "@typings/component";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

export const PersonalSettings: FC<{ id: string }> = ({ id }) => {
  const { t } = useTranslation("Settings");

  const { data, loading } = useAxios(
    UserRequestFactory.apiUserIdGet,
    undefined,
    id,
  );

  if (loading) {
    return <Skeleton active={loading} />;
  }

  if (!data) {
    return <>oh no!</>;
  }

  return (
    <Card bordered={false} title={t("personal")} id="personal">
      {/* <h3>{t("personal")}</h3>
      <br /> */}
      <Form
        {...layout}
        initialValues={{
          ...data,
        }}
      >
        <Form.Item name="first_name" label={t("first_name")} required={true}>
          <Input />
        </Form.Item>

        <Form.Item name="middle_name" label={t("middle_name")}>
          <Input />
        </Form.Item>

        <Form.Item name="last_name" label={t("last_name")} required={true}>
          <Input />
        </Form.Item>

        <Form.Item name="email" label={t("email")} required={true}>
          <Input />
        </Form.Item>

        <Form.Item name="info" label={t("info")}>
          <Input.TextArea />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
          <Button type="primary">{t("updateButton")}</Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
