import React from "react";
import { Col, Row } from "antd";
import { i18n } from "@providers";
import { Link } from "@curi/react-dom";

function Footer() {
  return (
    <footer id="footer" className="dark">
      <Row className="bottom-bar">
        <Col lg={6} sm={24} />
        <Col lg={18} sm={24}>
          <span
            style={{
              lineHeight: "16px",
              paddingRight: 12,
              marginRight: 11,
              borderRight: "1px solid rgba(255, 255, 255, 0.55)",
            }}
          >
            <a rel="noopener noreferrer" target="_blank">
              {i18n.t("Landing.footer.contacts")}
            </a>
          </span>
          <span style={{ marginRight: 24 }}>
            <Link name="faq:index">{i18n.t("Landing.footer.faq")}</Link>
          </span>
          <span style={{ marginRight: 12 }}>Copyright © Charity CRM </span>
        </Col>
      </Row>
    </footer>
  );
}

export default Footer;
