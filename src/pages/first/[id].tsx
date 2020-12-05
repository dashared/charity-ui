import React, { FC } from "react";
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from "antd";
import { useLocationQueryState } from "@lib/hooks";
import { PageProps, useTranslation } from "@providers";

type FormState = {
  size?: "small" | "middle" | "large";
  input?: string | number;
  select?: "demo";
};

const SecondPage: FC<PageProps> = ({ response }) => {
  const { t } = useTranslation("form");
  const id = response.params.id as string;
  const initialState: FormState = {
    size: "middle",
  };
  const [state, setState] = useLocationQueryState(initialState);

  function onFormValues(changedValues: FormState, values: FormState): void {
    setState(values);
  }

  return (
    <div>
      <h2>{id}</h2>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        size="middle"
        initialValues={state}
        onValuesChange={onFormValues}
      >
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="middle">Middle</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Input" name="input">
          <Input />
        </Form.Item>
        <Form.Item label="Select" name="select">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="TreeSelect">
          <TreeSelect
            treeData={[
              {
                title: "Light",
                value: "light",
                children: [{ title: "Bamboo", value: "bamboo" }],
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="Cascader">
          <Cascader
            options={[
              {
                value: "zhejiang",
                label: "Zhejiang",
                children: [
                  {
                    value: "hangzhou",
                    label: "Hangzhou",
                  },
                ],
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="DatePicker">
          <DatePicker />
        </Form.Item>
        <Form.Item label="InputNumber">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Switch">
          <Switch />
        </Form.Item>
        <Form.Item label="Button">
          <Button>{t("button")}</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SecondPage;
