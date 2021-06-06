import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Button, Card, Checkbox, Form, Input, Row, Typography } from "antd";
import { useForm } from "antd/lib/form/Form";
import { LockOutlined, UserOutlined, WarningOutlined } from "@ant-design/icons";
import { notify } from "@lib/utils/notification";
import { Credentials } from "@providers/authContext";

import styles from "./styles.module.less";

const { Paragraph } = Typography;

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

              <Button
                size="small"
                type="link"
                className={styles.forgot}
                onClick={() => {
                  notify(t("forgotPassword_message"), "warning");
                }}
              >
                {t("forgotPassword")}
              </Button>
            </Form.Item>

            <div className={styles.desc}>
              <Paragraph>
                <WarningOutlined className={styles.icon} /> {t("message.title")}
                <a
                  target="_blank"
                  href="https://play.google.com/store/apps/details?id=infostrategic.hse.charity"
                  rel="noopener noreferrer"
                >
                  {" "}
                  {t("message.link")} &gt;
                </a>
              </Paragraph>
            </div>

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
