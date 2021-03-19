import React, { FC, useCallback } from "react";
import { DonationRequestInput } from "@generated";
import RoleSwitch from "@lib/components/RoleSwitch";
import { notify } from "@lib/utils/notification";
import { router, useTranslation, Workspace } from "@providers";
import { AuthConsumer } from "@providers/authContext";
import useAxios, {
  CategoryFactory,
  DonationRequestFactory,
} from "@providers/axios";
import Unauthorized from "pages/_unauthorized";

import CreateApplicationView from "components/Application/Form";

const CreatePage: FC = () => {
  const { t } = useTranslation("Application");

  const { data } = useAxios(CategoryFactory.apiCategoriesGet);

  const onCreateApplication = useCallback(
    (values: DonationRequestInput) => {
      DonationRequestFactory.apiDonationRequestPost(values)
        .then(() => {
          notify(t("$views.createSuccess"), "success");

          router.navigate({ url: router.url({ name: "applications:index" }) });
        })
        .catch((e) => {
          console.error(e);
          notify(t("$views.createError"), "error");
        });
    },
    [t],
  );

  return (
    <Workspace title={t("createPageTitle")} noRefresh withBack>
      <CreateApplicationView
        onCreate={onCreateApplication}
        categories={data ?? []}
      />
    </Workspace>
  );
};

export const name = "applications:create";

export const pageComponent: FC = () => {
  return (
    <AuthConsumer>
      {({ user }) => {
        return (
          <RoleSwitch
            role={user.role}
            perform={name}
            yes={() => <CreatePage />}
            no={() => <Unauthorized />}
          />
        );
      }}
    </AuthConsumer>
  );
};
