import React, { FC } from "react";
import { Button } from "antd";
import { ClearOutlined } from "@ant-design/icons";

const ClearButton: FC<{ onClearAll: () => void }> = ({ onClearAll }) => {
  return <Button icon={<ClearOutlined />} onClick={onClearAll} />;
};

export default ClearButton;
