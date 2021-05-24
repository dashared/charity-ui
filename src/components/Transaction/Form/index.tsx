import React, { FC, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Card, Form, Input, Radio, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { MoneyCollectOutlined } from "@ant-design/icons";
import { DonationRequestBody } from "@generated";
import { AmountInput, Currency } from "@lib/components/AmountInput";
import { DonationRequestFactory } from "@providers/axios";

import { ApplicationStatus } from "components/Application/Status/tag";

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 10 },
};

const { Option } = Select;

type TransactionFormProps = {
  onSubmit: (values: TransactionFormState) => void | Promise<void>;
};

export type TransactionFormState = {
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  applicationId?: number;
  type: "fund" | "application";
  donation: {
    amount: number;
    currency: Currency;
  };
  anonymous: boolean;
};

const DEFAULTS: TransactionFormState = {
  type: "fund",
  anonymous: false,
  donation: {
    amount: 0,
    currency: "rmb",
  },
};

export const ApplicationSelect: FC<{ status?: ApplicationStatus[] }> = ({
  status,
  ...rest
}) => {
  const { t } = useTranslation("Transaction");

  const [data, setData] = useState<DonationRequestBody[] | undefined>();

  const onSearch = useCallback(
    async (value?: string) => {
      try {
        const { data: d } = await DonationRequestFactory.apiDonationRequestGet(
          0,
          10,
          "",
          undefined,
          undefined,
          status,
          undefined,
          value,
        );

        setData(d.data);
      } catch (e) {
        console.log(e);
      }
    },
    [status],
  );

  useEffect(() => {
    if (!data) {
      onSearch(undefined);
    }
  }, [data, onSearch]);

  return (
    <Select
      {...rest}
      showSearch
      placeholder={t("form.applicationPlaceholder")}
      onSearch={onSearch}
    >
      {data?.map((value) => {
        return (
          <Option value={value.id ?? 0} key={value.id}>
            {value.title}
          </Option>
        );
      })}
    </Select>
  );
};

const TransactionForm: FC<TransactionFormProps> = ({ onSubmit }) => {
  const { t } = useTranslation("Transaction");

  const [form] = useForm();

  // eslint-disable-next-line
  const checkPrice = (_: any, value: { amount: number }): Promise<void> => {
    if (value.amount > 0) {
      return Promise.resolve();
    }
    return Promise.reject(t("form.priceValidation"));
  };

  const [type, setType] = useState("fund");

  return (
    <Card>
      <Form<TransactionFormState>
        {...formItemLayout}
        form={form}
        onFinish={async (values) => {
          await onSubmit?.(values);
          form.resetFields();
        }}
        initialValues={DEFAULTS}
      >
        <Form.Item name="type" label={t("form.type.title")}>
          <Radio.Group
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            <Radio.Button value="fund">{t("form.type.fund")}</Radio.Button>
            <Radio.Button value="application">
              {t("form.type.application")}
            </Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="first_name" label={t("form.first_name")}>
          <Input />
        </Form.Item>

        <Form.Item name="middle_name" label={t("form.middle_name")}>
          <Input />
        </Form.Item>

        <Form.Item name="last_name" label={t("form.last_name")}>
          <Input />
        </Form.Item>

        {type !== "fund" && (
          <Form.Item
            name="applicationId"
            label={t("form.application")}
            hasFeedback
            rules={[
              {
                required: type !== "fund",
                message: t("form.applicationMessage"),
              },
            ]}
          >
            <ApplicationSelect status={[ApplicationStatus.Active]} />
          </Form.Item>
        )}

        <Form.Item
          name="donation"
          label={t("form.amount")}
          rules={[{ validator: checkPrice }]}
        >
          <AmountInput />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button
            type="primary"
            htmlType="submit"
            icon={<MoneyCollectOutlined />}
          >
            {t("form.submit")}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default TransactionForm;
