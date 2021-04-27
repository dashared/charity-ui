import React, { FC, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Card,
  DatePicker,
  Divider,
  Form,
  Input,
  Select,
  Space,
  Upload,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import { RcCustomRequestOptions } from "antd/lib/upload/interface";
import { InboxOutlined } from "@ant-design/icons";
import { CategoryCategory, FileInfo } from "@generated";
import { DonationRequestSuperManagerInput } from "@generated/models/donation-request-super-manager-input";
import { formatCategory } from "@lib/utils";
import { notify } from "@lib/utils/notification";
import { i18n, router } from "@providers";
import { AxiosResponse } from "axios";

const { Dragger } = Upload;

const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 8 },
};

const CreatePage: FC<{
  onCreate: (
    values: DonationRequestSuperManagerInput,
  ) => Promise<AxiosResponse<void>>;
  categories: CategoryCategory[];
}> = ({ categories, onCreate }) => {
  const { t } = useTranslation("Application");

  const [ids, setIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const [form] = useForm<DonationRequestSuperManagerInput>();

  const onReset = (): void => {
    form.resetFields();
  };

  const draggerProps = {
    name: "file",
    multiple: true,
    defaultFileList: [],
    customRequest(options: RcCustomRequestOptions) {
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
          setIds(ids.concat(parsed.map((value) => value.id ?? "")));

          return onSuccess(parsed, file);
        } else {
          return onError(Error(request.statusText));
        }
      };
    },
  };

  const onFinish = useCallback(
    async (values: DonationRequestSuperManagerInput) => {
      try {
        setLoading(true);

        const numberator = values.approved_amount?.numerator?.toString();

        await onCreate({
          ...values,
          approved_amount: {
            numerator: parseInt(numberator ?? "0"),
            denominator: 1,
            currency: "RUB",
          },
        });

        notify(t("$views.createSuccess"), "success");

        router.navigate({ url: router.url({ name: "applications:index" }) });
      } catch (e) {
        console.error(e);
        notify(t("$views.createError"), "error");
      } finally {
        setLoading(false);
      }
    },
    [setLoading, t, onCreate],
  );

  const lang = i18n.language.substr(0, 2);

  return (
    <Card>
      <Form
        {...formLayout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
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
          name="category_id"
          rules={[
            {
              required: true,
              message: t("$views.message.category"),
            },
          ]}
          label={t("$views.createPage.category")}
        >
          <Select
            showSearch
            optionFilterProp="children"
            placeholder={t("$views.createPage.select_category")}
            filterOption={(input, option) => {
              return (
                (option?.children?.toString() ?? "")
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              );
            }}
          >
            {categories.map((category) => {
              return (
                <Select.Option value={category.id} key={category.id}>
                  {formatCategory(lang, category)}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item
          name={["approved_amount", "numerator"]}
          label={t("$views.createPage.approved_amount")}
        >
          <Input prefix="₽" suffix="RUB" />
        </Form.Item>

        <Form.Item name={["until"]} label={t("$views.createPage.until")}>
          <DatePicker style={{ width: 200 }} />
        </Form.Item>

        <Divider />

        <Form.Item
          name={["donee", "first_name"]}
          rules={[{ required: true, message: t("$views.message.donee_first") }]}
          label={t("$views.createPage.donee.first_name")}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={["donee", "middle_name"]}
          label={t("$views.createPage.donee.middle_name")}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={["donee", "last_name"]}
          rules={[{ required: true, message: t("$views.message.donee_last") }]}
          label={t("$views.createPage.donee.last_name")}
        >
          <Input />
        </Form.Item>

        <Divider />

        <Form.Item name={["comment"]} label={t("$views.createPage.message")}>
          <Input.TextArea />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Space>
            <Button loading={loading} type="primary" htmlType="submit">
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
