import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Badge, Divider, Dropdown, Layout, Menu } from "antd";
import {
  BellOutlined,
  DownOutlined,
  LogoutOutlined,
  MenuOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { router } from "@providers";
import { AuthConsumer } from "@providers/authContext";

import styles from "./layout.module.less";

const { Header } = Layout;

type AppHeaderProps = {
  onMenuToggle?: () => void;
};

const UserDropdown: FC<{ className?: string }> = ({ className }) => {
  const { t } = useTranslation("Login");

  return (
    <AuthConsumer>
      {({ logout, user }) => {
        const menu = (
          <Menu
            onClick={({ key }) => {
              if (key === "logout") {
                logout();
              }
            }}
          >
            <Menu.Item key="logout">
              <LogoutOutlined />
              {t("logout")}
            </Menu.Item>
          </Menu>
        );

        return (
          <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
            <span className={className}>
              <UserOutlined />
              <span>
                {user.name} {user.surname}
              </span>
              <DownOutlined />
            </span>
          </Dropdown>
        );
      }}
    </AuthConsumer>
  );
};

const NotificationItem: FC = () => {
  return (
    <Badge count={0}>
      <BellOutlined
        style={{ fontSize: "18px" }}
        onClick={() => {
          router.navigate({ url: router.url({ name: "notifications:index" }) });
        }}
      />
    </Badge>
  );
};

const AppHeader: FC<AppHeaderProps> = ({ onMenuToggle }) => {
  return (
    <Header className={styles.header}>
      <MenuOutlined className={styles.trigger} onClick={onMenuToggle} />
      <Divider
        type="vertical"
        orientation="center"
        style={{ margin: "0px 20px 0px 20px" }}
      />
      <NotificationItem />
      <UserDropdown className={styles.user} />
    </Header>
  );
};

export default AppHeader;
