import React, { FC, useRef } from "react";
import { Link } from "@curi/react-dom";
import { UserResponse as Result, UserUser as Single } from "@generated";
import PaginatedQuery, { StateRef } from "@lib/components/Pagination";
import RegistryTable from "@lib/components/RegistryTable";
import RoleSwitch from "@lib/components/RoleSwitch";
import { useListSelection } from "@lib/hooks";
import { cred } from "@lib/utils/name";
import { useTranslation, Workspace } from "@providers";
import { AuthConsumer } from "@providers/authContext";
import { UserRequestFactory } from "@providers/axios";
import Unauthorized from "pages/_unauthorized";

import styles from "./styles.module.less";

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
      key: "id",
      render(record: Single) {
        return (
          <Link params={{ id: record.id }} name="users:show">
            {record.id}
          </Link>
        );
      },
    },
    {
      key: "name",
      render(record: Single) {
        return cred(record.first_name, record.middle_name, record.last_name);
      },
    },
  ];

  // TODO: replace api calls to TransactionsFactory
  return (
    <Workspace noRefresh title={t("title")}>
      <PaginatedQuery<{ page: number; size: number }, Result, Single>
        className={styles.pagination}
        requestQuery={UserRequestFactory.userGet}
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
