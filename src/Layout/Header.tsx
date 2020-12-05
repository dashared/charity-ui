import React, { FC } from "react";
import { Layout } from "antd";
import { MenuOutlined } from "@ant-design/icons";

import styles from "./layout.module.less";

const { Header } = Layout;

type AppHeaderProps = {
  onMenuToggle?: () => void;
};

const AppHeader: FC<AppHeaderProps> = ({ onMenuToggle }) => {
  return (
    <Header className={styles.header}>
      <MenuOutlined className={styles.trigger} onClick={onMenuToggle} />
    </Header>
  );
};

export default AppHeader;
