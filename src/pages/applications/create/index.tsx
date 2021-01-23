import React, { FC, useCallback } from "react";
import RoleSwitch from "@lib/components/RoleSwitch";
import { useTranslation, Workspace } from "@providers";
import { AuthConsumer } from "@providers/authContext";
import Unauthorized from "pages/_unauthorized";

import CreateApplicationView from "components/Application/Form";

const CreatePage: FC = () => {
  const { t } = useTranslation("Application");

  const onCreateApplication = useCallback(() => {
    console.log("create application");
  }, []);

  return (
    <Workspace title={t("createPageTitle")} noRefresh withBack>
      <CreateApplicationView onCreate={onCreateApplication} />;
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
