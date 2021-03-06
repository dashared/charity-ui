import React, { FC, useState } from "react";
import { Button, Select, Space } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { Link } from "@curi/react-dom";
import { i18n, router } from "@providers";

const Header: FC<{ isMobile: boolean }> = (props) => {
  const { isMobile } = props;

  const [lang, setLang] = useState(
    i18n.language.substr(0, 2) === "ru" ? "ru" : "en",
  );

  return (
    <header {...props}>
      <div className="logo-wrapper">
        <Link name="home">
          <i className="logo" /> {!isMobile && <span>Charity CRM</span>}
        </Link>
      </div>
      <div className="buttons">
        <Space>
          <div className="auth">
            <Select
              onChange={(value) => {
                i18n.changeLanguage(value);
                setLang(value);
              }}
              value={lang}
              style={{ width: isMobile ? 80 : 120, margin: "0 8px" }}
            >
              <Select.Option value="ru">
                {isMobile ? "π·πΊ" : i18n.t("Landing.languageSetting.ru")}
              </Select.Option>
              <Select.Option value="en">
                {isMobile ? "πΊπΈ" : i18n.t("Landing.languageSetting.eng")}
              </Select.Option>
            </Select>
          </div>

          <div className="auth">
            <Button
              onClick={() => {
                router.navigate({ url: router.url({ name: "login:index" }) });
              }}
              icon={isMobile ? <LoginOutlined /> : undefined}
            >
              {!isMobile && i18n.t("Landing.login")}
            </Button>
          </div>
        </Space>
      </div>
    </header>
  );
};

export default Header;
