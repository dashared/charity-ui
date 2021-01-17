import React, { FC } from "react";
import { Col, Row, Tooltip } from "antd";

type Metric = {
  title: string;
  icon: JSX.Element;
  value: number;
};

export type MetricsProps = {
  metrics: Metric[];
};

const Metrics: FC<MetricsProps> = ({ metrics }) => {
  return (
    <Row gutter={30}>
      {metrics.map((metric) => {
        return (
          <Col key={metric.title}>
            <Tooltip title={metric.title}>
              <Row gutter={6}>
                <Col>{metric.icon}</Col>
                <Col>{metric.value}</Col>
              </Row>
            </Tooltip>
          </Col>
        );
      })}
    </Row>
  );
};

export default Metrics;
