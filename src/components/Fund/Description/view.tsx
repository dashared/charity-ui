import React, { FC } from "react";
import { Card, Col, Row, Statistic, Upload } from "antd";
import { CharityFundInfoResponse } from "@generated";
import { useTranslation } from "@providers";

import FAQView from "components/FAQ/View";

export const FundDescriptionView: FC<{ data: CharityFundInfoResponse }> = ({
  data,
}) => {
  const { t } = useTranslation("Fund");
  return (
    <>
      <Card title={data.title}>
        <FAQView text={data.description} />
      </Card>

      {data.files && (
        <Card style={{ marginTop: "5px" }}>
          <Upload
            listType="picture"
            fileList={data.files?.map((item) => {
              return {
                uid: item.id ?? "",
                type: item.mime_type ?? "",
                status: "done",
                size: 0,
                name: item.title ?? "file",
                thumbUrl: `/api/file/${item.id}/download`,
              };
            })}
          />
        </Card>
      )}

      <Card style={{ marginTop: "5px" }}>
        <Row gutter={16}>
          <Col span={12}>
            <Statistic title={t("$views.viewPage.email")} value={data.email} />
          </Col>
          <Col span={12}>
            <Statistic title={t("$views.viewPage.phone")} value={data.phone} />
          </Col>
          <Col span={24} style={{ marginTop: 32 }}>
            <Statistic
              title={t("$views.viewPage.address")}
              value={data.address}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};
