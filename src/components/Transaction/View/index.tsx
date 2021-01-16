import React from "react";
import { useTranslation } from "react-i18next";
import {
  Card,
  Col,
  Descriptions,
  Divider,
  Progress,
  Row,
  Statistic,
  Steps,
  Tag,
} from "antd";
import { Link } from "@curi/react-dom";
import { cred } from "@lib/utils/name";
import { IdComponent } from "@typings/component";

import StatusTag, {
  ApplicationStatus,
} from "components/Application/Status/tag";

const { Step } = Steps;

const TransactionView: IdComponent = () => {
  const { t } = useTranslation("Transaction");
  return (
    <>
      <Card>
        <Row gutter={16} align="middle">
          <Col span={5}>
            <Row>
              <Col>
                <Statistic title={t("sum")} value={112893} precision={2} />
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <Statistic title={t("comission")} value={500} />
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <Statistic title={t("total")} value={44444000} />
              </Col>
            </Row>
          </Col>
          <Col span={4}>
            <Progress
              type="circle"
              strokeColor={{
                "0%": "#108ee9",
                "100%": "#87d068",
              }}
              percent={100}
            />
          </Col>
          <Col span={1}>
            <Divider type="vertical" style={{ height: "200px" }} />
          </Col>
          <Col span={13}>
            <Steps direction="vertical" size="small" current={1}>
              <Step
                title={t("Status.Registered")}
                description={t("Description.Registered")}
              />
              <Step
                title={t("Status.InProgress")}
                description={t("Description.InProgress")}
              />
              <Step
                title={t("Status.Success")}
                description={t("Description.Success")}
              />
            </Steps>
          </Col>
        </Row>
      </Card>

      <Card>
        <Descriptions
          title={t("info")}
          bordered
          column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        >
          <Descriptions.Item label={t("who")}>
            <Link params={{ id: 1 }} name="users:show">
              {cred("Алексеев", "Алексеев", "Алексеев")}
            </Link>
          </Descriptions.Item>
          <Descriptions.Item label={t("whom")}>
            <Link params={{ id: 1 }} name="users:show">
              {cred("Иванов", "Иванов", "Иванов")}
            </Link>
          </Descriptions.Item>
          <Descriptions.Item label={t("application_status")}>
            <StatusTag status={ApplicationStatus.Active} />
          </Descriptions.Item>
          <Descriptions.Item label={t("sum")}>$80.00</Descriptions.Item>
          <Descriptions.Item label={t("comission")}>$20.00</Descriptions.Item>
          <Descriptions.Item label={t("total")}>$60.00</Descriptions.Item>
          <Descriptions.Item label={t("aim")}>
            <Link name="applications:show" params={{ id: 1 }}>
              Помогите Васе
            </Link>
          </Descriptions.Item>
          <Descriptions.Item label={t("anon")}>
            <Tag color="gray">Анонимная</Tag>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </>
  );
};

export default TransactionView;
