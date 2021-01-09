import React, { FC } from "react";
import { UserUser } from "@generated";
import { Role } from "@providers/rbac-rules";

type UserViewProps = {
  user: UserUser;
  role: Role;
};

const UserView: FC<UserViewProps> = ({ user }) => {
  return <>{user.id}</>;
};

export default UserView;
