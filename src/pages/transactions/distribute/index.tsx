import React, { FC, useCallback } from "react";
import RoleSwitch from "@lib/components/RoleSwitch";
import { notify } from "@lib/utils/notification";
import { router, useTranslation, Workspace } from "@providers";
import { AuthConsumer } from "@providers/authContext";
import { MoneyFactory } from "@providers/axios";
import Redirect from "pages/_redirect";

import DistributeMoneyForm, {
  DistributeMoneyFormState,
} from "components/Transaction/Form/distribute";

const DistributeMoneyPage: FC = () => {
  const { t } = useTranslation("Transaction");

  const createTransactionToFundAPI = useCallback(
    async (values: DistributeMoneyFormState) => {
      try {
        await MoneyFactory.apiMoneyDonateApplicationFromCharityPost({
          amount: {
            denominator: 1,
            numerator: values.donation.amount,
            currency: "RUB",
          },
          application_id: values.applicationId ?? 0,
        });

        notify(t("create_donation_fund_success"), "success");

        router.navigate({ url: router.url({ name: "transactions:index" }) });
      } catch (e) {
        notify(t("create_donation_fund_error"), "error");
      }
    },
    [t],
  );

  return (
    <Workspace noRefresh withBack title={t("createPageTitle")}>
      <DistributeMoneyForm onSubmit={createTransactionToFundAPI} />
    </Workspace>
  );
};

export const name = "transactions:distribute";

export const pageComponent: FC = () => {
  return (
    <AuthConsumer>
      {({ user }) => {
        return (
          <RoleSwitch
            role={user.role}
            perform={name}
            yes={() => <DistributeMoneyPage />}
            no={() => <Redirect name="home"></Redirect>}
          />
        );
      }}
    </AuthConsumer>
  );
};
