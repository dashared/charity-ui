import React from "react";
import { Empty, Skeleton } from "antd";
import RoleSwitch from "@lib/components/RoleSwitch";
import { fullName } from "@lib/utils/name";
import { Workspace } from "@providers";
import { AuthConsumer } from "@providers/authContext";
import useAxios, { UserRequestFactory } from "@providers/axios";
import { Role } from "@providers/rbac-rules";
import { IdComponent } from "@typings/component";

import UserView from "components/User/View";

import Unauthorized from "../../_unauthorized";

const UserPage: IdComponent = ({ id }) => {
  const { data, loading } = useAxios(UserRequestFactory.userIdGet, false, id);

  if (loading) {
    return <Skeleton active={loading} />;
  }

  if (!data) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }

  const user = data;

  const { first_name, middle_name, last_name } = user;

  return (
    <Workspace title={fullName(first_name, middle_name, last_name)}>
      <UserView user={user} role={Role.manager} />
    </Workspace>
  );
};

export const name = "users:show";

export const pageComponent: IdComponent = (props) => (
  <AuthConsumer>
    {({ user }) => {
      return (
        <RoleSwitch
          role={user.role}
          perform={name}
          yes={() => <UserPage {...props} />}
          no={() => <Unauthorized />}
        />
      );
    }}
  </AuthConsumer>
);
