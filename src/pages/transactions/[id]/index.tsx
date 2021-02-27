import React, { FC } from "react";
import { Empty, Skeleton } from "antd";
import RoleSwitch from "@lib/components/RoleSwitch";
import { PageProps, useTranslation, Workspace } from "@providers";
import { AuthConsumer } from "@providers/authContext";
import useAxios, { DonationsFactory } from "@providers/axios";
import Redirect from "pages/_redirect";

import TransactionView from "components/Transaction/View";

const TransactionPage: FC<PageProps> = ({ response }) => {
  const id = response.params.id;

  const { t } = useTranslation("Transaction");

  const { data, loading } = useAxios(
    DonationsFactory.apiDonationsIdGet,
    undefined,
    id,
  );

  if (!data) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }
  if (loading) {
    return <Skeleton active={loading} />;
  }

  return (
    <Workspace noRefresh withBack title={t("pageTitle", { id })}>
      <TransactionView transaction={data} />
    </Workspace>
  );
};

export const name = "transactions:show";

export const pageComponent: FC<PageProps> = (props) => {
  return (
    <AuthConsumer>
      {({ user }) => {
        return (
          <RoleSwitch
            role={user.role}
            perform={name}
            yes={() => <TransactionPage {...props} />}
            no={() => <Redirect name="home"></Redirect>}
          />
        );
      }}
    </AuthConsumer>
  );
};
