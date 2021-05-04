import React, { FC, useCallback, useRef } from "react";
import { Button, Empty, Skeleton } from "antd";
import { UserEditableInfo } from "@generated";
import RoleSwitch from "@lib/components/RoleSwitch";
import { notify } from "@lib/utils/notification";
import { PageProps, useTranslation, Workspace } from "@providers";
import { AuthConsumer } from "@providers/authContext";
import useAxios, {
  CategoryFactory,
  UserRequestFactory,
} from "@providers/axios";
import Unauthorized from "pages/_unauthorized";

import { PersonalSettings } from "components/Settings";
import { PersonalSettingsHandler } from "components/Settings/Personal";

const EditUserPage: FC<PageProps> = ({ response }) => {
  const { t } = useTranslation("Settings");

  const id = response.params.id as string;

  const handlers = useRef<PersonalSettingsHandler>(null);

  const onSubmit = useCallback(
    async (values: UserEditableInfo) => {
      try {
        await UserRequestFactory.apiUserIdPatch(id ?? "", {
          ...values,
        });

        notify(t("update_success"), "success");
      } catch {
        notify(t("update_error"), "error");
      }
    },
    [id, t],
  );

  const { data, loading } = useAxios(
    UserRequestFactory.apiUserIdGet,
    undefined,
    id,
  );

  const { data: categories, loading: loadingCategories } = useAxios(
    CategoryFactory.apiCategoriesGet,
  );

  if (loading || loadingCategories) {
    return <Skeleton active={loading} />;
  }

  if (!data) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }

  if (!categories) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }

  return (
    <Workspace
      title={t("edit_title")}
      noRefresh
      withBack
      actions={
        <Button onClick={() => handlers.current?.submit()}>
          {t("updateButton")}
        </Button>
      }
    >
      <PersonalSettings
        ref={handlers}
        onSubmit={onSubmit}
        initial={data}
        categories={categories}
      />
    </Workspace>
  );
};

export const name = "user:edit";

export const pageComponent: FC<PageProps> = (props) => (
  <AuthConsumer>
    {({ user }) => {
      return (
        <RoleSwitch
          role={user.role}
          perform={name}
          yes={() => <EditUserPage {...props} />}
          no={() => <Unauthorized />}
        />
      );
    }}
  </AuthConsumer>
);
