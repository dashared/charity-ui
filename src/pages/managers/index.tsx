import React, { FC, useRef, useState } from "react";
import { Avatar, Card, Select, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
// import { CheckOutlined, SyncOutlined } from "@ant-design/icons";
import {
  AuthManagerRegistrationInputRoleEnum as Roles,
  UserResponse as Result,
  UserUser as Single,
  UserUserRoleEnum,
} from "@generated";
// import Metrics from "@lib/components/Metrics";
import PaginatedQuery, { StateRef } from "@lib/components/Pagination";
import RegistryTable from "@lib/components/RegistryTable";
import RoleSwitch from "@lib/components/RoleSwitch";
import { useListSelection } from "@lib/hooks";
import { formatDate } from "@lib/utils";
import { fullName } from "@lib/utils/name";
import { router, useTranslation, Workspace } from "@providers";
import { AuthConsumer } from "@providers/authContext";
import { UserRequestFactory } from "@providers/axios";
import Unauthorized from "pages/_unauthorized";

import ClearButton from "components/Application/Filters/clear";
import RoleTag from "components/User/Role/tag";

import styles from "./styles.module.less";

const FilterRolesArr = [
  Roles.SuperManager,
  Roles.Operator,
  Roles.Manager,
  Roles.ContentManager,
  Roles.Admin,
];

const ManagersFilters: FC<{
  initial?: string[];
  setFilter: (roles?: string[]) => void;
}> = ({ initial, setFilter }) => {
  const { t } = useTranslation("Users");

  return (
    <Card>
      <Space>
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
          {FilterRolesArr.map((value, ind) => {
            return (
              <Select.Option value={value} key={ind}>
                {t(`Role.${value}`)}
              </Select.Option>
            );
          })}
        </Select>
        <ClearButton onClearAll={() => setFilter()} />
      </Space>
    </Card>
  );
};

type ManagerFilter = {
  roles?: string[];
};

const ManagersPage: FC = () => {
  const { isTarget, isSelected, setList } = useListSelection<Single>();

  const paginationState = useRef<StateRef>(null);

  const { t } = useTranslation("Manager");

  const [filter, setFilter] = useState<ManagerFilter>({});

  const onElementClick = (record: Single): void => {
    router.navigate({
      url: router.url({ name: "managers:show", params: { id: record.id } }),
    });
  };

  const columns = [
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
      width: "25%",
      render(record: Single) {
        return fullName(
          record.first_name,
          record.middle_name,
          record.last_name,
        );
      },
    },
    {
      key: "roles",
      width: "12%",
      render(record: Single) {
        return <RoleTag roles={[record.role ?? UserUserRoleEnum.User]} />;
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
        return formatDate(record.created_at);
      },
    },
  ];

  return (
    <Workspace noRefresh title={t("title")}>
      <ManagersFilters
        initial={filter.roles}
        setFilter={(roles) => setFilter({ roles })}
      />
      <PaginatedQuery<{ page: number; size: number }, Result, Single>
        className={styles.pagination}
        requestQuery={UserRequestFactory.apiUserGet}
        variables={{
          sort: "",
          role: filter.roles ?? FilterRolesArr,
        }}
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
                onElementClick(record);
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
