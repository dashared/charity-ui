import React, { FC } from "react";
import Markdown from "react-markdown";
import { Empty } from "antd";
import gfm from "remark-gfm";

const FAQView: FC<{ text?: string }> = ({ text }) => {
  if (!text) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }

  return <Markdown plugins={[gfm]}>{text}</Markdown>;
};

export default FAQView;
