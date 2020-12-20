import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Badge, Card, Descriptions, Form } from "antd";
import { ModelsDonationRequest } from "@generated";

const ApplicationView: FC<{ donation: ModelsDonationRequest }> = ({
  donation,
}) => {
  const { t } = useTranslation("Application");

  console.log(donation.donee);

  return (
    <Form>
      <Card>
        <Form.Item>
          <Descriptions title={t("generalInfo")} layout="vertical" bordered>
            <Descriptions.Item label={t("view.description")} span={3}>
              {donation.description}
            </Descriptions.Item>

            <Descriptions.Item label={t("need")}>
              {donation.requestedAmount}
            </Descriptions.Item>

            <Descriptions.Item label="Billing Mode">Prepaid</Descriptions.Item>
            <Descriptions.Item label="Automatic Renewal">YES</Descriptions.Item>
            <Descriptions.Item label="Order time">
              2018-04-24 18:00:00
            </Descriptions.Item>
            <Descriptions.Item label="Usage Time" span={2}>
              2019-04-24 18:00:00
            </Descriptions.Item>
            <Descriptions.Item label="Status" span={3}>
              <Badge status="processing" text="Running" />
            </Descriptions.Item>
            <Descriptions.Item label="Negotiated Amount">
              $80.00
            </Descriptions.Item>
            <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
            <Descriptions.Item label="Official Receipts">
              $60.00
            </Descriptions.Item>
          </Descriptions>
          ,
        </Form.Item>
      </Card>

      <Card>
        <Form.Item></Form.Item>
      </Card>

      <Card>
        <Form.Item></Form.Item>
      </Card>
    </Form>
  );
};

export default ApplicationView;
