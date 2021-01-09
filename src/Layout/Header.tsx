import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Dropdown, Layout, Menu } from "antd";
import {
  DownOutlined,
  LogoutOutlined,
  MenuOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { AuthConsumer } from "@providers/authContext";

import styles from "./layout.module.less";

const { Header } = Layout;

type AppHeaderProps = {
  onMenuToggle?: () => void;
};

const UserDropdown: FC<{ className?: string }> = ({ className }) => {
  const { t } = useTranslation("Auth");

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
              <span>{user.name}</span>
              <span>{user.role}</span>
              <DownOutlined />
            </span>
          </Dropdown>
        );
      }}
    </AuthConsumer>
  );
};

const AppHeader: FC<AppHeaderProps> = ({ onMenuToggle }) => {
  return (
    <Header className={styles.header}>
      <MenuOutlined className={styles.trigger} onClick={onMenuToggle} />
      <UserDropdown className={styles.user} />
    </Header>
  );
};

export default AppHeader;
