import React, { FC } from "react";
import { Layout } from "antd";
import { useLocalStorage } from "@lib/hooks/storage";

import AppLogo from "./AppLogo";
import Header from "./Header";
import LeftBar from "./LeftBar";
import MainView from "./MainView";

import styles from "./layout.module.less";

const { Sider, Content } = Layout;

const MainLayout: FC = () => {
  const [collapsed, setCollapsed] = useLocalStorage("Layout.collapsed", false);

  const toggleSidebar = (): void => setCollapsed(!collapsed);

  return (
    <Layout className={styles.mainLayout}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className={styles.leftBar}
        width={260}
      >
        <AppLogo className={styles.appLogo} small={collapsed} />
        <LeftBar />
      </Sider>
      <Layout>
        <Header onMenuToggle={toggleSidebar} />
        <Content>
          <MainView />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
