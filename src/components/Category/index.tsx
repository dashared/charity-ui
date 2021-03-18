import React, { FC, useCallback, useEffect, useRef } from "react";
import { Button, Card, Form, Input, Space } from "antd";
import { /*MinusCircleOutlined,*/ PlusOutlined } from "@ant-design/icons";
import { CategoryCategory, CategoryUpdateInput } from "@generated";
import { notify } from "@lib/utils/notification";
import { useTranslation } from "@providers";
import { CategoryFactory } from "@providers/axios";

const CategoryPage: FC<{ data: CategoryCategory[] }> = ({ data }) => {
  const { t } = useTranslation("Category");

  // eslint-disable-next-line
  const messagesEndRef = useRef<any>(null);

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [data]);

  const onFinish = useCallback(
    async (values: CategoryUpdateInput) => {
      try {
        await CategoryFactory.apiCategoriesPost(values);

        notify(t("updated"), "success");
      } catch (e) {
        notify(t("updated_err"), "error");
      }
    },
    [t],
  );

  return (
    <Card>
      <Form
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        autoComplete="off"
        initialValues={{ categories: data }}
      >
        <Form.List name="categories">
          {(fields, { add }) => (
            <>
              {fields.map((field) => (
                <Space
                  key={field.key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...field}
                    name={[field.name, "id"]}
                    fieldKey={[field.fieldKey, "id"]}
                    rules={[{ required: true, message: t("missing.id") }]}
                  >
                    <Input placeholder={t("placeholder.id")} />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    name={[field.name, "rus"]}
                    fieldKey={[field.fieldKey, "rus"]}
                    rules={[{ required: true, message: t("missing.rus") }]}
                  >
                    <Input placeholder={t("placeholder.rus")} />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    name={[field.name, "eng"]}
                    fieldKey={[field.fieldKey, "eng"]}
                    rules={[{ required: true, message: t("missing.eng") }]}
                  >
                    <Input placeholder={t("placeholder.eng")} />
                  </Form.Item>
                  {/* <MinusCircleOutlined onClick={() => remove(field.name)} /> */}
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  {t("add")}
                </Button>
              </Form.Item>
              <div id="end" ref={messagesEndRef} />
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {t("submit")}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CategoryPage;
