import React, { FC } from "react";
import { Card } from "antd";
import Icon from "@ant-design/icons";
import { useTranslation } from "@providers";

import { GraphQL, Wand } from "../icons";

const Index: FC = () => {
  const { t } = useTranslation();

  return (
    <Card bordered={false}>
      <h1>{t("welcome")}</h1>
      <Icon
        style={{ fontSize: "64px", color: "hotpink" }}
        component={GraphQL}
      />
      <Icon style={{ fontSize: "32px" }} component={Wand} />
    </Card>
  );
};

export default Index;
