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
} from "antd";
import { Link } from "@curi/react-dom";
import { BlockchainDonation, DonationRequestBodyStatusEnum } from "@generated";
import { formatDate, formatMoney } from "@lib/utils";
import { moneyCollected } from "@lib/utils/currency";
import { DateTimeFormat, daysLeft } from "@lib/utils/date";
import { cred } from "@lib/utils/name";

import StatusTag from "components/Application/Status/tag";

const TransactionView: FC<{ transaction: BlockchainDonation }> = ({
  transaction,
}) => {
  const { t } = useTranslation("Transaction");

  const author = transaction.donation_author;
  const application = transaction.donation_request;

  const untilProgress = daysLeft(application?.started_at, application?.until);

  console.log(untilProgress);

  return (
    <>
      <Card>
        <Row gutter={16} align="middle">
          <Col span={5}>
            <Row>
              <Col>
                <Statistic
                  title={t("sum")}
                  value={formatMoney(transaction.amount)}
                  precision={2}
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <Statistic
                  title={t("application_sum")}
                  value={formatMoney(application?.approved_amount)}
                  precision={2}
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <Statistic
                  title={t("date")}
                  value={formatDate(
                    transaction.created_at,
                    DateTimeFormat.DATE_SHORT,
                  )}
                  precision={2}
                />
              </Col>
            </Row>
          </Col>
          <Col span={4}>
            <Progress
              type="circle"
              percent={moneyCollected(
                application?.approved_amount,
                application?.received_amount,
              )}
            />
          </Col>
          <Col span={1}>
            {untilProgress && (
              <Divider type="vertical" style={{ height: "200px" }} />
            )}
          </Col>
          <Col span={13}>
            {untilProgress && (
              <Progress
                type="circle"
                percent={untilProgress.percentage}
                format={() => t("until", { days: untilProgress.days })}
              />
            )}
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
          {application?.donee && (
            <Descriptions.Item label={t("whom")}>
              <Link params={{ id: 1 }} name="users:show">
                {cred(
                  application?.donee?.first_name,
                  application?.donee?.middle_name,
                  application?.donee?.last_name,
                )}
              </Link>
            </Descriptions.Item>
          )}
          <Descriptions.Item label={t("application_status")} span={2}>
            <StatusTag
              status={
                (application?.status as unknown) as DonationRequestBodyStatusEnum
              }
            />
          </Descriptions.Item>

          <Descriptions.Item label={t("aim")}>
            <Link name="applications:show" params={{ id: application?.id }}>
              {application?.title}
            </Link>
          </Descriptions.Item>
          <Descriptions.Item label={t("id")}>
            <span>{transaction.id}</span>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </>
  );
};

export default TransactionView;
