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
  const staffLabel = t("staff_title", formatNumber(staffCount));
  const applicationsLabel = t("applications", formatNumber(activeApplications));

  return (
    <Card loading={loading}>
      <Card>
        <Row>
          <Col span={12}>
            <Statistic title={t("active_users")} value={usersLabel} />
          </Col>
          <Col span={12}>
            <Statistic
              title={t("active_applications")}
              value={applicationsLabel}
            />
          </Col>
        </Row>

        <Row style={{ marginTop: 32 }}>
          <Col span={12}>
            <Statistic title={t("staff")} value={staffLabel} />
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