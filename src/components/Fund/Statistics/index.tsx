import React, { FC } from "react";
import { Card, Col, Row, Statistic } from "antd";
import { UtilsMoneyJson } from "@generated";
import { formatMoney, formatNumber } from "@lib/utils";
import { useTranslation } from "@providers";

type StatisticsCardProps = {
  loading: boolean;
  usersCount?: number;
  staffCount?: number;
  activeApplications?: number;
  balance?: UtilsMoneyJson;
};

const StatisticsCard: FC<StatisticsCardProps> = ({
  loading,
  usersCount,
  staffCount,
  balance,
  activeApplications,
}) => {
  const { t } = useTranslation("Fund");

  const usersLabel = t("users_title", formatNumber(usersCount));

  return (
    <Card loading={loading} bordered={false}>
      <Card bordered={false}>
        <Row>
          <Col span={12}>
            <Statistic title={t("active_users")} value={usersLabel} />
          </Col>
          <Col span={12}>
            <Statistic
              title={t("active_applications")}
              value={activeApplications}
            />
          </Col>
        </Row>

        <Row style={{ marginTop: 32 }}>
          <Col span={12}>
            <Statistic title={t("staff")} value={staffCount} />
          </Col>
          <Col span={12}>
            <Statistic
              title={t("balance")}
              value={formatMoney(balance)}
              precision={2}
            />
          </Col>
        </Row>
      </Card>
    </Card>
  );
};

export default StatisticsCard;
