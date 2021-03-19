import React, { FC } from "react";
import Markdown from "react-markdown";
import gfm from "remark-gfm";

const FAQView: FC<{ text: string }> = ({ text }) => {
  return <Markdown plugins={[gfm]}>{text}</Markdown>;
};

export default FAQView;
