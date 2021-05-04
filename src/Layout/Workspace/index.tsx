import React, { FC, ReactNode } from "react";
import { Button, Layout, PageHeader, Space } from "antd";
import { DoubleRightOutlined, SyncOutlined } from "@ant-design/icons";
import { useDocumentTitle } from "@lib/hooks";
import {
  shallowEqual,
  useActions,
  useSelector,
  useTranslation,
} from "@providers";
import { RootState } from "@providers/redux";
import classnames from "classnames";
import produce from "immer";
import { atom, Provider } from "jotai";

import { name, version } from "../../appInfo";
import { toggleRightPanel } from "../../reducer/workspace";

import Footer from "./Footer";

import styles from "./styles.module.less";

const { Sider, Content } = Layout;

export type WorkspaceState = {
  rightPanelCollapsed: boolean;
};

const workspaceAtom = atom<WorkspaceState>({
  rightPanelCollapsed: true,
});

export const toggleRightPanelAtom = atom(
  null,
  (get, set, newState: "open" | "closed" | undefined) => {
    let newValue = !get(workspaceAtom).rightPanelCollapsed;

    if (newState === "open") {
      newValue = false;
    }
    if (newState === "closed") {
      newValue = true;
    }

    set(
      workspaceAtom,
      produce((draft: WorkspaceState) => {
        draft.rightPanelCollapsed = newValue;
      }),
    );
  },
);

interface WorkspaceProps {
  withBack?: boolean;
  title: string;
  subTitle?: string;
  rightPanel?: ReactNode;
  actions?: ReactNode;
  rightPanelWidth?: number;
  noRefresh?: boolean;
}

const Workspace: FC<WorkspaceProps> = ({
  withBack = false,
  title,
  subTitle,
  rightPanel,
  rightPanelWidth = 360,
  children,
  actions,
  noRefresh = false,
}) => {
  const { t } = useTranslation();

  const workspace = useSelector(
    (state: RootState): WorkspaceState => state.workspace,
    shallowEqual,
  );

  useDocumentTitle(title);

  const toggleSidebar = useActions(toggleRightPanel);

  const onBack = withBack ? () => window.history.back() : undefined;

  return (
    <Provider>
      <Layout className={styles.workspaceLayout}>
        <PageHeader
          className={styles.pageHeader}
          onBack={onBack}
          ghost={false}
          title={title}
          subTitle={subTitle}
          extra={
            <Space align="center">
              {actions}
              {!noRefresh && (
                <Button
                  disabled={false}
                  key="refresh"
                  icon={<SyncOutlined />}
                  title={t("PageHeader.refresh")}
                />
              )}
              {rightPanel && (
                <Button
                  key="sidebar"
                  icon={
                    <DoubleRightOutlined
                      className={classnames(
                        workspace.rightPanelCollapsed && styles.rotated,
                      )}
                    />
                  }
                  title={t(
                    `PageHeader.rightPanel.${
                      workspace.rightPanelCollapsed ? "open" : "close"
                    }`,
                  )}
                  onClick={() => toggleSidebar()}
                />
              )}
            </Space>
          }
        />
        <Layout>
          <Content className={styles.workspaceMain}>
            <main>{children}</main>
            <Footer logo={name} version={version} />
          </Content>
          <Sider
            className={styles.rightSidebar}
            trigger={null}
            theme="light"
            collapsed={!rightPanel || workspace.rightPanelCollapsed}
            collapsible
            collapsedWidth="0"
            width={rightPanelWidth}
            reverseArrow
          >
            {rightPanel}
          </Sider>
        </Layout>
      </Layout>
    </Provider>
  );
};

export default Workspace;
