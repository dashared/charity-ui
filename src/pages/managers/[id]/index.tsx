import React, { FC } from "react";
import { Empty, Skeleton } from "antd";
import RoleSwitch from "@lib/components/RoleSwitch";
import { PageProps, useTranslation, Workspace } from "@providers";
import { AuthConsumer } from "@providers/authContext";
import useAxios, { UserRequestFactory } from "@providers/axios";
import Unauthorized from "pages/_unauthorized";

import ManagerView from "components/Manager/View";

const ManagerPage: FC<PageProps> = ({ response }) => {
  const { t } = useTranslation("Manager");

  const id = response.params.id as string;

  const { data, loading } = useAxios(
    UserRequestFactory.apiUserIdGet,
    false,
    id,
  );

  if (loading) {
    return <Skeleton active={loading} />;
  }

  if (!data) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }

  const user = data;

  return (
    <AuthConsumer>
      {({ user: u }) => {
        return (
          <Workspace noRefresh withBack title={t("page.title")}>
            <ManagerView user={user} role={u.role} />
          </Workspace>
        );
      }}
    </AuthConsumer>
  );
};

export const name = "managers:show";

export const pageComponent: FC<PageProps> = (props) => {
  return (
    <AuthConsumer>
      {({ user }) => {
        return (
          <RoleSwitch
            role={user.role}
            perform={name}
            yes={() => <ManagerPage {...props} />}
            no={() => <Unauthorized />}
          />
        );
      }}
    </AuthConsumer>
  );
};
