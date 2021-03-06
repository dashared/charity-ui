import React, { FC, useRef, useState } from "react";
import { Avatar, Button, Card, Select, Space, Tooltip } from "antd";
import {
  DownOutlined,
  FrownOutlined,
  UpOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  UserResponse as Result,
  UserUser as Single,
  UserUserRoleEnum,
} from "@generated";
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

import { ClearButton } from "components/Application/Filters";
import RoleTag from "components/User/Role/tag";

import styles from "./styles.module.less";

function sortIcon(sortedInfo?: string): React.ReactNode {
  if (sortedInfo === "role,asc") {
    return <DownOutlined />;
  } else if (sortedInfo === "role,desc") {
    return <UpOutlined />;
  } else {
    return null;
  }
}

const Filter: FC<{
  initial: FilterState;
  onChange: (values: FilterState) => void;
}> = ({ initial, onChange }) => {
  const { t } = useTranslation("Users");

  return (
    <Card style={{ marginBottom: "5px" }}>
      <Space>
        <RoleFilter
          initial={initial.filteredInfo ?? []}
          setFilter={(roles) => {
            onChange({
              ...initial,
              filteredInfo: roles,
            });
          }}
        />
        <Button
          icon={sortIcon(initial.sortedInfo)}
          onClick={() => {
            onChange({
              ...initial,
              sortedInfo:
                initial.sortedInfo === "role,asc" ? "role,desc" : "role,asc",
            });
          }}
        >
          {t("sort.roles")}
        </Button>
        <ClearButton onClearAll={() => onChange({})} />
      </Space>
    </Card>
  );
};

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
      value={initial}
      onClear={() => setFilter(undefined)}
      style={{ width: "auto", minWidth: 300 }}
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

const BlockedIcon: FC<{ blocked?: boolean }> = ({ blocked }) => {
  const { t } = useTranslation("Users");
  return blocked ? (
    <Tooltip title={t("blocked_tooltip")}>
      <FrownOutlined style={{ color: "red" }} />
    </Tooltip>
  ) : null;
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
      url: router.url({ name: "user:edit", params: { id: record.id } }),
    });
  };

  const paginationState = useRef<StateRef>(null);

  const { t } = useTranslation("Users");

  const columns: Array<RegistryColumnConf<Single>> = [
    {
      key: "photo",
      title: "",
      width: "6%",
      render(record: Single) {
        const props = {
          src: record.image_id
            ? `/api/file/${record.image_id}/download`
            : undefined,
          icon: record.image_id ? undefined : <UserOutlined />,
        };
        return <Avatar {...props} />;
      },
    },
    {
      key: "name",
      render(record: Single) {
        return (
          <span>
            {<BlockedIcon blocked={record.blocked} />}{" "}
            {fullName(record.first_name, record.middle_name, record.last_name)}
          </span>
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
        return <RoleTag roles={[record.role ?? UserUserRoleEnum.User]} />;
      },
    },
  ];

  return (
    <Workspace noRefresh title={t("title")} actions={<Actions />}>
      <Filter initial={filter} onChange={setFilter} />
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
