import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "antd";
import { UserUser as User } from "@generated";
import { Role } from "@providers/rbac-rules";

import UserInfo from "components/User/Info";

type ManagerViewProps = {
  user: User;
  role: Role;
};

const ManagerView: FC<ManagerViewProps> = ({ user, role }) => {
  const { t } = useTranslation("Manager");

  return (
    <>
      <Card>
        <h3>{t("page.infoTitle")}</h3>
        <br />
        <UserInfo user={user} role={role} />
      </Card>
      <Card>
        <h3>{t("page.statistics")}</h3>
        <br />
      </Card>
    </>
  );
};

export default ManagerView;
