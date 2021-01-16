import React, { FC } from "react";
import ReactMarkdown from "react-markdown";

const FAQView: FC<{ text: string }> = ({ text }) => {
  return <ReactMarkdown>{text}</ReactMarkdown>;
};

export default FAQView;
