import React from "react";
import { Col, Row } from "antd";
import { i18n } from "@providers";
import QueueAnim from "rc-queue-anim";

import { assets } from "./data";

export default function Page1() {
  const page1 = [
    {
      img: `${assets}/image/icon/g2-c94ef.svg`,
      title: i18n.t("Landing.data.fund"),
      description: i18n.t("Landing.data.fDescription"),
    },
    {
      img: `${assets}/image/icon/g6-b4554.svg`,
      title: i18n.t("Landing.data.transactions"),
      description: i18n.t("Landing.data.tDescription"),
    },
    {
      img: `${assets}/image/icon/f2-d360c.svg`,
      title: i18n.t("Landing.data.donee"),
      description: i18n.t("Landing.data.dDescription"),
    },
  ];

  const children = page1.map((card, i) => (
    <Col className="card-wrapper" key={i.toString()} md={8} xs={24}>
      <a className="card" href={card.href}>
        <h3>{card.title}</h3>
        <img src={card.img} alt="" className="card-img-top" />
        <div className="card-body">
          <span className="description text-secondary">{card.description}</span>
        </div>
      </a>
    </Col>
  ));

  return (
    <section className="page-wrapper page1">
      <QueueAnim
        component={Row}
        type="bottom"
        className="page row text-center"
        delay={500}
      >
        {children}
      </QueueAnim>
    </section>
  );
}
