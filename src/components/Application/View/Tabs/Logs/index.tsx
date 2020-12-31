import React, { FC } from "react";
import { Skeleton } from "antd";

const LogsTab: FC<{ id: string }> = () => {
  return <Skeleton active={true} />;
};

export default LogsTab;
