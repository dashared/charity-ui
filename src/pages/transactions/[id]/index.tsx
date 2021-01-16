import React, { FC } from "react";
import RoleSwitch from "@lib/components/RoleSwitch";
import { PageProps, useTranslation, Workspace } from "@providers";
import { AuthConsumer } from "@providers/authContext";
import Redirect from "pages/_redirect";

import TransactionView from "components/Transaction/View";

const TransactionPage: FC<PageProps> = ({ response }) => {
  const id = response.params.id;

  const { t } = useTranslation("Transaction");

  return (
    <Workspace noRefresh withBack title={t("pageTitle", { id })}>
      <TransactionView id={id} />
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
