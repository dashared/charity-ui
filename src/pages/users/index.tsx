import React, { FC, useRef } from "react";
import { Button } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { Link } from "@curi/react-dom";
import { UserResponse as Result, UserUser as Single } from "@generated";
import PaginatedQuery, { StateRef } from "@lib/components/Pagination";
import RegistryTable from "@lib/components/RegistryTable";
import RoleSwitch from "@lib/components/RoleSwitch";
import { useListSelection } from "@lib/hooks";
import { cred } from "@lib/utils/name";
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
      type="primary"
      icon={<UserAddOutlined />}
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

    {
      key: "role",
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
