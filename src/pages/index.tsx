import React, { FC } from "react";
import { Card, Col, Descriptions, Row, Space, Statistic } from "antd";
import { LikeOutlined, TransactionOutlined } from "@ant-design/icons";
import { Link } from "@curi/react-dom";
import { useTranslation } from "@providers";

const { Meta } = Card;

const Index: FC = () => {
  const { t } = useTranslation("Dashboard");

  return (
    <Card
      hoverable
      style={{ padding: "30px 0px 0px 0px" }}
      cover={
        <Row align="middle" justify="center">
          <Space size="large">
            <TransactionOutlined
              style={{ fontSize: "64px", color: "#1890ff" }}
            />
          </Space>
        </Row>
      }
    >
      <Meta title={<h1>{t("welcome")}</h1>} description={t("description")} />
      <br />
      <Link name="login:index">Авторизоваться</Link>
      <br />
      <br />
      <Row gutter={16} justify="center">
        <Col xs={{ span: 24 }} lg={{ span: 6 }}>
          <Statistic title="Feedback" value={1128} prefix={<LikeOutlined />} />
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 6 }}>
          <Statistic title="Unmerged" value={93} suffix="/ 100" />
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 6 }}>
          <Statistic title="Active Users" value={112893} />
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 6 }}>
          <Statistic title="Active Users" value={112893} />
        </Col>
      </Row>
      <br />
      <br />

      <Descriptions
        bordered
        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
      >
        <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="Billing">Prepaid</Descriptions.Item>
        <Descriptions.Item label="time">18:00:00</Descriptions.Item>
        <Descriptions.Item label="Amount">$80.00</Descriptions.Item>
        <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
        <Descriptions.Item label="Official">$60.00</Descriptions.Item>
        <Descriptions.Item label="Config Info">
          Data disk type: MongoDB
          <br />
          Database version: 3.4
          <br />
          Package: dds.mongo.mid
          <br />
          Storage space: 10 GB
          <br />
          Replication factor: 3
          <br />
          Region: East China 1
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export const name = "home";

export default Index;
