import React, { FC } from "react";
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
import { BlockchainDonation, DonationRequestBodyStatusEnum } from "@generated";
import { formatMoney } from "@lib/utils";
import { cred } from "@lib/utils/name";

import StatusTag from "components/Application/Status/tag";

const { Step } = Steps;

const TransactionView: FC<{ transaction: BlockchainDonation }> = ({
  transaction,
}) => {
  const { t } = useTranslation("Transaction");

  const author = transaction.donation_author;
  const application = transaction.donation_request;

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
            <Link
              params={{ id: transaction.donation_request?.id }}
              name="users:show"
            >
              {cred(author?.first_name, author?.middle_name, author?.last_name)}
            </Link>
          </Descriptions.Item>
          <Descriptions.Item label={t("whom")}>
            <Link params={{ id: 1 }} name="users:show">
              {cred(
                application?.donee?.first_name,
                application?.donee?.middle_name,
                application?.donee?.last_name,
              )}
            </Link>
          </Descriptions.Item>
          <Descriptions.Item label={t("application_status")}>
            <StatusTag
              status={
                (application?.status as unknown) as DonationRequestBodyStatusEnum
              }
            />
          </Descriptions.Item>
          <Descriptions.Item label={t("sum")}>
            {formatMoney(transaction.amount)}
          </Descriptions.Item>
          <Descriptions.Item label={t("aim")}>
            <Link name="applications:show" params={{ id: application?.id }}>
              {application?.title}
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
