import React, { FC, useCallback, useEffect, useRef } from "react";
import { Button, Card, Checkbox, Form, Input, Popconfirm, Space } from "antd";
import {
  /*MinusCircleOutlined,*/ MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { CategoryAdminCategory, CategoryUpdateInput } from "@generated";
import { notify } from "@lib/utils/notification";
import { useTranslation } from "@providers";
import { CategoryFactory } from "@providers/axios";

const CategoryPage: FC<{ data: CategoryAdminCategory[] }> = ({ data }) => {
  const { t } = useTranslation("Category");

  // eslint-disable-next-line
  const messagesEndRef = useRef<any>(null);

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [data]);

  const onFinish = useCallback(
    async (values: CategoryUpdateInput) => {
      console.log(values);
      try {
        await CategoryFactory.apiCategoriesPost(values);

        notify(t("updated"), "success");
      } catch (e) {
        notify(t("updated_err"), "error");
      }
    },
    [t],
  );

  const removeCategory = useCallback(
    async (onRemove: () => void, item: CategoryAdminCategory) => {
      try {
        await CategoryFactory.apiCategoriesDelete({
          categories: [item.id],
        });

        notify(t("deleted", { id: item.id }), "success");
        onRemove();
      } catch (e) {
        notify(t("deleted_err", { id: item.id }), "error");
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
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <Space
                  key={field.key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...field}
                    name={[field.name, "is_hidden"]}
                    fieldKey={[field.fieldKey, "is_hidden"]}
                    valuePropName="checked"
                  >
                    <Checkbox />
                  </Form.Item>

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
                  <Form.Item
                    {...field}
                    name={[field.name, "ara"]}
                    fieldKey={[field.fieldKey, "ara"]}
                    //rules={[{ required: true, message: t("missing.ara") }]}
                  >
                    <Input placeholder={t("placeholder.ara")} />
                  </Form.Item>
                  <Popconfirm
                    okText={t("ok")}
                    cancelText={t("cancel")}
                    title={t("delete_popconfirm")}
                    onConfirm={() =>
                      removeCategory(() => {
                        remove(field.name);
                      }, data[field.name])
                    }
                  >
                    <MinusCircleOutlined />
                  </Popconfirm>
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
