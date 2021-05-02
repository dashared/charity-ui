import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Button, Card, Form } from "antd";
import { useForm } from "antd/lib/form/Form";
import { MoneyCollectOutlined } from "@ant-design/icons";
import { AmountInput, Currency } from "@lib/components/AmountInput";

import { ApplicationSelect } from "./index";

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 10 },
};

type DistributeMoneyFormProps = {
  onSubmit: (values: DistributeMoneyFormState) => void | Promise<void>;
};

export type DistributeMoneyFormState = {
  applicationId?: number;
  donation: {
    amount: number;
    currency: Currency;
  };
};

const DEFAULTS: DistributeMoneyFormState = {
  donation: {
    amount: 0,
    currency: "rmb",
  },
};

const DistributeMoneyForm: FC<DistributeMoneyFormProps> = ({ onSubmit }) => {
  const { t } = useTranslation("Transaction");

  const [form] = useForm();

  // eslint-disable-next-line
  const checkPrice = (_: any, value: { amount: number }): Promise<void> => {
    if (value.amount > 0) {
      return Promise.resolve();
    }
    return Promise.reject(t("form.priceValidation"));
  };

  return (
    <Card>
      <Form<DistributeMoneyFormState>
        {...formItemLayout}
        form={form}
        onFinish={async (values) => {
          await onSubmit?.(values);
          form.resetFields();
        }}
        initialValues={DEFAULTS}
      >
        <Form.Item
          name="applicationId"
          label={t("form.application")}
          hasFeedback
          rules={[
            {
              message: t("form.applicationMessage"),
            },
          ]}
        >
          <ApplicationSelect />
        </Form.Item>

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
            {t("form.submit_money")}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default DistributeMoneyForm;
