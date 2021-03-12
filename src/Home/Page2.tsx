import React, { FC } from "react";
import { i18n } from "@providers";
import QueueAnim from "rc-queue-anim";
import OverPack from "rc-scroll-anim/lib/ScrollOverPack";

const Page2: FC = () => {
  return (
    <OverPack
      component="section"
      className="page-wrapper page2"
      style={{ backgroundColor: "#fff" }}
    >
      <QueueAnim
        type="bottom"
        className="page text-center"
        leaveReverse
        key="page"
      >
        <h2 key="title">{i18n.t("Landing.blockchain.title")}</h2>
        <span key="line" className="separator" />
        <QueueAnim type="bottom" className="info-content" key="content">
          <p className="main-info" key="1">
            {i18n.t("Landing.blockchain.description_1")}
          </p>
          <p className="main-info" key="2">
            {i18n.t("Landing.blockchain.description_2")}
          </p>
        </QueueAnim>
      </QueueAnim>
    </OverPack>
  );
};

export default Page2;
