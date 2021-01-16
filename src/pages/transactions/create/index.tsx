import React, { FC } from "react";
import RoleSwitch from "@lib/components/RoleSwitch";
import { router, useTranslation, Workspace } from "@providers";
import { AuthConsumer } from "@providers/authContext";
import Redirect from "pages/_redirect";

import TransactionForm from "components/Transaction/Form";

const TransactionCreatePage: FC = () => {
  const { t } = useTranslation("Transaction");

  return (
    <Workspace noRefresh withBack title={t("createPageTitle")}>
      <TransactionForm
        onSubmit={(values) => {
          console.log(values);
          router.navigate({ url: router.url({ name: "transactions:index" }) });
        }}
      />
    </Workspace>
  );
};

export const name = "transactions:create";

export const pageComponent: FC = () => {
  return (
    <AuthConsumer>
      {({ user }) => {
        return (
          <RoleSwitch
            role={user.role}
            perform={name}
            yes={() => <TransactionCreatePage />}
            no={() => <Redirect name="home"></Redirect>}
          />
        );
      }}
    </AuthConsumer>
  );
};
