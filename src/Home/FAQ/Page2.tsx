import React, { FC } from "react";
import useAxios, { CharityFactory } from "@providers/axios";
import QueueAnim from "rc-queue-anim";
import OverPack from "rc-scroll-anim/lib/ScrollOverPack";

import FAQView from "components/FAQ/View";

const Page2: FC = () => {
  const { data } = useAxios(CharityFactory.apiCharityFaqGet, false);

  return (
    <OverPack component="section" className="page-wrapper page2">
      <QueueAnim
        type="bottom"
        className="page text-center"
        leaveReverse
        key="page"
      >
        <div className="title">FAQ</div>
        <span key="line" className="separator" />
        <QueueAnim type="bottom" className="info-content" key="content">
          <FAQView text={data?.faq ?? ""} />
        </QueueAnim>
      </QueueAnim>
    </OverPack>
  );
};

export default Page2;
