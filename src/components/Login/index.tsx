import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Button, Card, Checkbox, Form, Input, Row } from "antd";
import { useForm } from "antd/lib/form/Form";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Credentials } from "@providers/authContext";

import styles from "./styles.module.less";

type LoginProps = {
  onLogin: (credentials: Credentials) => void;
};

const LoginForm: FC<LoginProps> = ({ onLogin }) => {
  const [form] = useForm<Credentials>();

  const { t } = useTranslation("Login");

  function onFinish(values: Credentials): void {
    onLogin({
      email: values.email,
      password: values.password,
    });
  }

  // TODO: сделать нормальный layout

  return (
    <>
      <Row style={{ height: 100 }}></Row>
      <Row justify="center" gutter={16}>
        <Card title={t("title")}>
          <Form
            name="normal_login"
            form={form}
            className={styles.form}
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: t("messages.enterEmail") }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder={t("email")}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: t("messages.enterPassword") }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder={t("password")}
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>{t("rememberMe")}</Checkbox>
              </Form.Item>

              <a className={styles.forgot} href="">
                {t("forgotPassword")}
              </a>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className={styles.login}>
                {t("login")}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Row>
    </>
  );
};

export default LoginForm;
