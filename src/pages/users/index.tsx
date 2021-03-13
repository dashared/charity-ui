import React, { FC, useRef, useState } from "react";
import { Button, Select, Space } from "antd";
import { ClearOutlined, DownOutlined } from "@ant-design/icons";
import { UserResponse as Result, UserUser as Single } from "@generated";
import PaginatedQuery, { StateRef } from "@lib/components/Pagination";
import RegistryTable, {
  RegistryColumnConf,
} from "@lib/components/RegistryTable";
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

const RoleFilter: FC<{
  initial: string[];
  setFilter: (roles?: string[]) => void;
}> = ({ initial, setFilter }) => {
  const { t } = useTranslation("Users");

  return (
    <Select
      placeholder={t("filter.roles")}
      mode="multiple"
      onChange={(value) => {
        setFilter(value);
      }}
      allowClear
      defaultValue={initial}
      onClear={() => setFilter(undefined)}
      style={{ width: "auto", margin: "0px 0px 20px 0px", minWidth: 300 }}
    >
      <Select.Option value={UserApiRole.Admin}>
        {t(`Role.${UserApiRole.Admin}`)}
      </Select.Option>
      <Select.Option value={UserApiRole.User}>
        {t(`Role.${UserApiRole.User}`)}
      </Select.Option>
      <Select.Option value={UserApiRole.ContentManager}>
        {t(`Role.${UserApiRole.ContentManager}`)}
      </Select.Option>
      <Select.Option value={UserApiRole.Manager}>
        {t(`Role.${UserApiRole.Manager}`)}
      </Select.Option>
      <Select.Option value={UserApiRole.SuperManager}>
        {t(`Role.${UserApiRole.SuperManager}`)}
      </Select.Option>
    </Select>
  );
};

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

type FilterState = {
  filteredInfo?: Array<string>;
  sortedInfo?: string;
};

const UsersPage: FC = () => {
  const [filter, setFilter] = useState<FilterState>({});

  const { isTarget, isSelected, setList } = useListSelection<Single>();

  const onElementClick = (record: Single): void => {
    router.navigate({
      url: router.url({ name: "users:show", params: { id: record.id } }),
    });
  };

  const paginationState = useRef<StateRef>(null);

  const { t } = useTranslation("Users");

  const columns: Array<RegistryColumnConf<Single>> = [
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
      render(record: Single) {
        return format(record.created_at);
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
        variables={{
          sort: filter.sortedInfo,
          roles: filter.filteredInfo,
        }}
        requestQuery={UserRequestFactory.apiUserGet}
        stateRef={paginationState}
        onResult={(result) => {
          setList(result.data ?? []);
        }}
        render={(entries) => (
          <>
            <Space>
              <RoleFilter
                initial={filter.filteredInfo ?? []}
                setFilter={(roles) => {
                  setFilter({
                    ...filter,
                    filteredInfo: roles,
                  });
                }}
              />
              <Button
                icon={filter.sortedInfo ? <ClearOutlined /> : <DownOutlined />}
                onClick={() => {
                  setFilter({
                    ...filter,
                    sortedInfo: filter.sortedInfo ? undefined : "role",
                  });
                }}
                style={{ width: "auto", margin: "0px 0px 20px 0px" }}
              >
                {t("sort.roles")}
              </Button>
            </Space>
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
                  onElementClick(record);
                }
              }}
            />
          </>
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
