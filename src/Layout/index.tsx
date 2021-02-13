import React, { FC } from "react";
import { Layout } from "antd";
import RoleSwitch from "@lib/components/RoleSwitch";
import { useLocalStorage } from "@lib/hooks/storage";
import { AuthConsumer } from "@providers/authContext";

import AppLogo from "./AppLogo";
import AppHeader from "./Header";
import LeftBar from "./LeftBar";
import MainView from "./MainView";

import styles from "./layout.module.less";

const { Sider, Content } = Layout;

const MainLayout: FC = () => {
  const [collapsed, setCollapsed] = useLocalStorage("Layout.collapsed", false);

  const toggleSidebar = (): void => setCollapsed(!collapsed);

  return (
    <AuthConsumer>
      {({ user }) => {
        return (
          <RoleSwitch
            role={user.role}
            perform="auth:login"
            // authenticated user
            no={() => (
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
                  <AppHeader onMenuToggle={toggleSidebar} />
                  <Content>
                    <MainView />
                  </Content>
                </Layout>
              </Layout>
            )}
            // visitor
            yes={() => (
              <Layout className={styles.mainLayout}>
                <Content>
                  <MainView />
                </Content>
              </Layout>
            )}
          />
        );
      }}
    </AuthConsumer>
  );
};

export default MainLayout;
