import React from "react";
import { Col, Row } from "antd";
import { i18n } from "@providers";
import { Link } from "@curi/react-dom";

const border = {
  lineHeight: "16px",
  paddingRight: 12,
  marginRight: 11,
  borderRight: "1px solid rgba(255, 255, 255, 0.55)",
};

function Footer() {
  return (
    <footer id="footer" className="dark">
      <Row className="bottom-bar">
        <Col lg={6} sm={24} />
        <Col lg={18} sm={24}>
          <span style={border}>
            <Link name="app:privacy-policy">
              {i18n.t("Landing.footer.app")}
            </Link>
          </span>
          <span style={{ marginRight: 24 }}>
            <Link name="fund:faq-index">{i18n.t("Landing.footer.faq")}</Link>
          </span>
          <span style={{ marginRight: 12 }}>Copyright © Charity CRM </span>
        </Col>
      </Row>
    </footer>
  );
}

export default Footer;
