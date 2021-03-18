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
  Tag,
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

  const application = transaction.donation_request;

  const untilProgress = daysLeft(application?.started_at, application?.until);

  console.log(application?.started_at);

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
            {application && (
              <Row>
                <Col>
                  <Statistic
                    title={t("application_sum")}
                    value={formatMoney(application?.approved_amount)}
                    precision={2}
                  />
                </Col>
              </Row>
            )}
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
          <Col span={7}>
            <Row>
              <Col>
                <Statistic
                  title={t("donation_format")}
                  valueRender={() => {
                    if (application) {
                      return (
                        <Tag color="blue">
                          {t("to_application", { id: application.id })}
                        </Tag>
                      );
                    } else {
                      return <Tag color="default">{t("to_fund")}</Tag>;
                    }
                  }}
                ></Statistic>
              </Col>
            </Row>
            <br />
            <br />
            <Row>
              <Col>
                <Statistic
                  title={t("who")}
                  valueRender={() => {
                    if (!transaction.donation_author) {
                      return "-";
                    } else {
                      const {
                        first_name,
                        middle_name,
                        last_name,
                      } = transaction.donation_author;
                      return (
                        <span>{cred(first_name, middle_name, last_name)}</span>
                      );
                    }
                  }}
                ></Statistic>
              </Col>
            </Row>
          </Col>
          {application && (
            <Col span={1}>
              <Divider type="vertical" style={{ height: "200px" }} />
            </Col>
          )}
          {application && (
            <Col span={4}>
              <Progress
                type="circle"
                percent={moneyCollected(
                  application?.approved_amount,
                  application?.received_amount,
                )}
              />
            </Col>
          )}
          {untilProgress && (
            <Col span={4}>
              <Progress
                type="circle"
                percent={untilProgress.percentage}
                format={() => t("until", { days: untilProgress.days })}
              />
            </Col>
          )}
        </Row>
      </Card>

      {application && (
        <Card>
          <Descriptions
            title={t("info")}
            bordered
            column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
          >
            {application?.donee && (
              <Descriptions.Item label={t("whom")}>
                {cred(
                  application?.donee?.first_name,
                  application?.donee?.middle_name,
                  application?.donee?.last_name,
                )}
              </Descriptions.Item>
            )}
            <Descriptions.Item label={t("application_status")}>
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
          </Descriptions>
        </Card>
      )}
    </>
  );
};

export default TransactionView;
