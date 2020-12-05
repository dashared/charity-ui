import React, { FC, ReactElement } from "react";
import { Layout } from "antd";

import styles from "./styles.module.less";

type AppFooterProps = {
  logo?: ReactElement;
  version: string;
};

const AppFooter: FC<AppFooterProps> = ({ logo, version }) => {
  return (
    <Layout.Footer className={styles.footer}>
      {logo}&nbsp;{version}
    </Layout.Footer>
  );
};

export default AppFooter;
