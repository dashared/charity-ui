import React, { FC, useCallback } from "react";
import RoleSwitch from "@lib/components/RoleSwitch";
import { notify } from "@lib/utils/notification";
import { router, useTranslation, Workspace } from "@providers";
import { AuthConsumer } from "@providers/authContext";
import { MoneyFactory } from "@providers/axios";
import Redirect from "pages/_redirect";

import TransactionForm, {
  TransactionFormState,
} from "components/Transaction/Form";

const TransactionCreatePage: FC = () => {
  const { t } = useTranslation("Transaction");

  const createTransactionToFundAPI = useCallback(
    async (values: TransactionFormState) => {
      try {
        await MoneyFactory.apiMoneyDonateCharityFromManagerPost({
          donor: {
            first_name: values.first_name,
            middle_name: values.middle_name,
            last_name: values.last_name,
          },
          amount: {
            denominator: 1,
            numerator: values.donation.amount,
            currency: "RUB",
          },
        });

        notify(t("create_donation_fund_success"), "success");

        router.navigate({ url: router.url({ name: "transactions:index" }) });
      } catch (e) {
        notify(t("create_donation_fund_error"), "error");
      }
    },
    [t],
  );

  const createTransactionToApplicationAPI = useCallback(
    async (values: TransactionFormState) => {
      try {
        const {
          data,
        } = await MoneyFactory.apiMoneyDonateCharityFromManagerPost({
          donor: {
            first_name: values.first_name,
            middle_name: values.middle_name,
            last_name: values.last_name,
          },
          amount: {
            denominator: 1,
            numerator: values.donation.amount,
            currency: "RUB",
          },
        });

        await MoneyFactory.apiMoneyDonateApplicationFromCharityPost({
          amount: {
            denominator: 1,
            numerator: values.donation.amount,
            currency: "RUB",
          },
          anonymous: values.anonymous,
          application_id: values.applicationId ?? 0,
          donor_id: data.id,
        });

        notify(t("create_donation_application"), "success");

        router.navigate({ url: router.url({ name: "transactions:create" }) });
      } catch (e) {
        notify(t("create_donation_application_err"), "error");
      }
    },
    [t],
  );

  return (
    <Workspace noRefresh withBack title={t("createPageTitle")}>
      <TransactionForm
        onSubmit={(values) => {
          if (values.type === "fund") {
            createTransactionToFundAPI(values);
          } else {
            createTransactionToApplicationAPI(values);
          }
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
