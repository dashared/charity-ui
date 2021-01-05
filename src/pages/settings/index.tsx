import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Anchor, Card, Layout, PageHeader } from "antd";

import { PersonalSettings } from "components/Settings";

import styles from "./styles.module.less";

const { Header, Sider, Content } = Layout;
const { Link } = Anchor;

const SettingsPage: FC = () => {
  const { t } = useTranslation("Settings");

  return (
    <Layout>
      <Header className={styles.header}>
        <PageHeader
          title={t("title")}
          style={{ backgroundColor: "transparent" }}
        />
      </Header>

      <Layout className={styles.layout}>
        <Sider className={styles.sider}>
          <Anchor>
            <Link href="#personal" title={t("personal")} />
            <Link href="#language" title={t("language")} />
          </Anchor>
        </Sider>

        <Content id="content">
          <PersonalSettings id={"24b74642-7926-4669-a6c4-755502efa06f"} />

          <Card
            title={t("language")}
            style={{ marginTop: "4px" }}
            id="language"
          >
            TEST DATA
            <br />
            TEST DATA
            <br />
            TEST DATA
            <br />
            TEST DATA
            <br />
            TEST DATA
            <br />
            TEST DATA
            <br />
            TEST DATA
            <br />
            TEST DATA
            <br />
            TEST DATA
            <br />
            TEST DATA
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
};

export default SettingsPage;
