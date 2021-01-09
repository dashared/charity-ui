import { FC } from "react";
import { check, Role } from "@providers/rbac-rules";

type RoleSwitchProps = {
  role: Role;
  perform: string;
  yes?: () => JSX.Element;
  no?: () => JSX.Element;
};

const RoleSwitch: FC<RoleSwitchProps> = ({
  role,
  perform,
  yes = () => null,
  no = () => null,
}) => (check(role, perform) ? yes() : no());

export default RoleSwitch;
