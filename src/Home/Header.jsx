import React from "react";
import { Button, Space } from "antd";
import { i18n, router } from "@providers";
import { Link } from "@curi/react-dom";

export default function Header(props) {
  return (
    <header {...props}>
      <div className="logo-wrapper">
        <Link name="home">
          <i className="logo" />
          <span>Charity CRM</span>
        </Link>
      </div>
      <div className="buttons">
        <Space>
          <div className="auth">
            <Button
              target="_blank"
              href="https://blockchaincharity.infostrategic.com"
            >
              {i18n.t("Landing.blockchain")}
            </Button>
          </div>

          <div className="auth">
            <Button
              onClick={() => {
                router.navigate({ url: router.url({ name: "login:index" }) });
              }}
            >
              {i18n.t("Landing.login")}
            </Button>
          </div>
        </Space>
      </div>
    </header>
  );
}
