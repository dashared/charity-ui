import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "antd";
import { UserApiModel as User, UserApiRole as ApiRole } from "@providers/axios";
import { Role } from "@providers/rbac-rules";

import UserInfo from "components/User/Info";

import ManagersApplications from "./applications";

type ManagerViewProps = {
  user: User;
  role: Role; // TODO: remove, already in User
};

const ManagerView: FC<ManagerViewProps> = ({ user, role }) => {
  const { t } = useTranslation("Manager");

  const [tab, setTab] = useState("tab1");

  const tabList = [
    {
      key: "tab1",
      tab: t("page.applications"),
    },
  ];

  const contentList: Record<string, React.ReactNode> = {
    tab1: <ManagersApplications user={user} />,
  };

  return (
    <>
      <Card title={t("page.infoTitle")} style={{ marginBottom: "10px" }}>
        <br />
        <UserInfo user={user} role={role} />
      </Card>
      {(user.role === ApiRole.SuperManager ||
        user.role === ApiRole.Manager) && (
        <Card
          tabList={tabList}
          onTabChange={(key) => setTab(key)}
          activeTabKey={tab}
        >
          {contentList[tab]}
        </Card>
      )}
    </>
  );
};

export default ManagerView;
