import React from "react";
import { Button } from "antd";
import { i18n, router } from "@providers";

export default function Header(props) {
  return (
    <header {...props}>
      <div className="logo-wrapper">
        <i className="logo" />
        <span>Charity CRM</span>
      </div>
      <div className="button">
        <Button
          onClick={() => {
            router.navigate({ url: router.url({ name: "login:index" }) });
          }}
        >
          {i18n.t("Landing.login")}
        </Button>
      </div>
    </header>
  );
}
