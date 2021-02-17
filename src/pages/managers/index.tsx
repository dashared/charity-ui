import React, { FC, useRef } from "react";
import { Avatar } from "antd";
import { CheckOutlined, SyncOutlined } from "@ant-design/icons";
import { Link } from "@curi/react-dom";
import { UserResponse as Result, UserUser as Single } from "@generated";
import Metrics from "@lib/components/Metrics";
import PaginatedQuery, { StateRef } from "@lib/components/Pagination";
import RegistryTable from "@lib/components/RegistryTable";
import RoleSwitch from "@lib/components/RoleSwitch";
import { useListSelection } from "@lib/hooks";
import { fullName } from "@lib/utils/name";
import { useTranslation, Workspace } from "@providers";
import { AuthConsumer } from "@providers/authContext";
import { UserApiRole, UserRequestFactory } from "@providers/axios";
import Unauthorized from "pages/_unauthorized";

import RoleTag from "components/User/Role/tag";

import styles from "./styles.module.less";

function ManagersMetrics(): JSX.Element {
  const { t } = useTranslation("Manager");
  return (
    <Metrics
      metrics={[
        {
          title: t("metrics.inProgress"),
          icon: <SyncOutlined />,
          value: 4,
        },
        {
          title: t("metrics.done"),
          icon: <CheckOutlined />,
          value: 15,
        },
      ]}
    />
  );
}

const ManagersPage: FC = () => {
  const {
    isTarget,
    isSelected,
    onElementClick,
    setList,
  } = useListSelection<Single>();

  const paginationState = useRef<StateRef>(null);

  const { t } = useTranslation("Manager");

  const columns = [
    {
      key: "photo",
      title: "",
      width: "6%",
      render(record: Single) {
        return (
          <Avatar style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
            {record?.role?.substr(0, 1)}
          </Avatar>
        );
      },
    },
    {
      key: "name",
      width: "25%",
      render(record: Single) {
        return (
          <Link params={{ id: record.id }} name="managers:show">
            {fullName(record.first_name, record.middle_name, record.last_name)}
          </Link>
        );
      },
    },
    {
      key: "roles",
      width: "12%",
      render(record: Single) {
        return <RoleTag roles={[record.role ?? UserApiRole.User]} />;
      },
    },
    {
      key: "email",
      render(record: Single) {
        return record.email;
      },
    },
    {
      key: "metric",
      width: "20%",
      render() {
        return ManagersMetrics();
      },
    },
  ];

  // TODO: replace api calls to TransactionsFactory
  return (
    <Workspace noRefresh title={t("title")}>
      <PaginatedQuery<{ page: number; size: number }, Result, Single>
        className={styles.pagination}
        requestQuery={UserRequestFactory.apiUserGet}
        stateRef={paginationState}
        onResult={(result) => {
          setList(result.data ?? []);
        }}
        render={(entries) => (
          <RegistryTable
            entity="Manager"
            columns={columns}
            // eslint-disable-next-line
            rows={entries as Record<string, any>[]} // TODO
            rowState={(record, index) => ({
              selected: isSelected(index),
              target: isTarget(index),
            })}
            onRecordClick={(event, record, index) => {
              if (index !== undefined) {
                onElementClick(event, index);
              }
            }}
          />
        )}
      />
    </Workspace>
  );
};

export const name = "managers:index";

export const pageComponent: FC = () => {
  return (
    <AuthConsumer>
      {({ user }) => {
        return (
          <RoleSwitch
            role={user.role}
            perform={name}
            yes={() => <ManagersPage />}
            no={() => <Unauthorized />}
          />
        );
      }}
    </AuthConsumer>
  );
};
