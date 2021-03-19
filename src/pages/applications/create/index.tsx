import React, { FC, useCallback } from "react";
import { DonationRequestSuperManagerInput } from "@generated/models/donation-request-super-manager-input";
import RoleSwitch from "@lib/components/RoleSwitch";
import { useTranslation, Workspace } from "@providers";
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
    async (values: DonationRequestSuperManagerInput) =>
      DonationRequestFactory.apiDonationRequestFromManagerPost(values),
    [],
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
