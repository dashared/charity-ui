import React from "react";
import QueueAnim from "rc-queue-anim";
import OverPack from "rc-scroll-anim/lib/ScrollOverPack";
import FAQView from "components/FAQ/View";

import { privacy_policy } from "./data";

export default function Page2() {
  return (
    <OverPack component="section" className="page-wrapper page2">
      <QueueAnim
        type="bottom"
        className="page text-left"
        leaveReverse
        key="page"
      >
        <div className="title">Charity Android App</div>
        <span key="line" className="separator" />
        <QueueAnim type="bottom" className="info-content" key="content">
          <FAQView text={privacy_policy} />
        </QueueAnim>
      </QueueAnim>
    </OverPack>
  );
}
