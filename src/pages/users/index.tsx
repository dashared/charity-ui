import React, { FC, useRef } from "react";
import { Button } from "antd";
import { Link } from "@curi/react-dom";
import { UserResponse as Result, UserUser as Single } from "@generated";
import PaginatedQuery, { StateRef } from "@lib/components/Pagination";
import RegistryTable from "@lib/components/RegistryTable";
import RoleSwitch from "@lib/components/RoleSwitch";
import { useListSelection } from "@lib/hooks";
import { format } from "@lib/utils/date";
import { fullName } from "@lib/utils/name";
import { router, useTranslation, Workspace } from "@providers";
import { AuthConsumer } from "@providers/authContext";
import { UserApiRole, UserRequestFactory } from "@providers/axios";
import Redirect from "pages/_redirect";

import RoleTag from "components/User/Role/tag";

import styles from "./styles.module.less";

const Actions: FC = () => {
  const { t } = useTranslation("Users");

  return (
    <Button
      onClick={() => {
        router.navigate({ url: router.url({ name: "users:create" }) });
      }}
    >
      {t("$views.buttons.registerUser")}
    </Button>
  );
};

const UsersPage: FC = () => {
  const {
    isTarget,
    isSelected,
    onElementClick,
    setList,
  } = useListSelection<Single>();

  const paginationState = useRef<StateRef>(null);

  const { t } = useTranslation("Users");

  const columns = [
    {
      key: "id",
      width: "12%",
      render(record: Single) {
        return (
          <Link params={{ id: record.id }} name="users:show">
            {record.id?.substr(0, 7)}...
          </Link>
        );
      },
    },

    {
      key: "name",
      render(record: Single) {
        return fullName(
          record.first_name,
          record.middle_name,
          record.last_name,
        );
      },
    },

    {
      key: "email",
      render(record: Single) {
        return record.email;
      },
    },

    {
      key: "createdAt",
      width: "20%",
      render(record: Single) {
        return format(record.created_at);
      },
    },

    {
      key: "role",
      width: "12%",
      render(record: Single) {
        return <RoleTag roles={[record.role ?? UserApiRole.User]} />;
      },
    },
  ];

  return (
    <Workspace noRefresh title={t("title")} actions={<Actions />}>
      <PaginatedQuery<{ page: number; size: number }, Result, Single>
        className={styles.pagination}
        requestQuery={UserRequestFactory.apiUserGet}
        stateRef={paginationState}
        onResult={(result) => {
          setList(result.data ?? []);
        }}
        render={(entries) => (
          <RegistryTable
            entity="Users"
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

export const pageComponent: FC = () => (
  <AuthConsumer>
    {({ user }) => {
      return (
        <RoleSwitch
          role={user.role}
          perform="users:index"
          yes={() => <UsersPage />}
          no={() => <Redirect name="home"></Redirect>}
        />
      );
    }}
  </AuthConsumer>
);
