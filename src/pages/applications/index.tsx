import React, { FC, useRef, useState } from "react";
import { Card, Space } from "antd";
import {
  DonationRequestBody as Single,
  DonationRequestResponse as Result,
} from "@generated";
import PaginatedQuery, { StateRef } from "@lib/components/Pagination";
import RegistryTable from "@lib/components/RegistryTable";
import RoleSwitch from "@lib/components/RoleSwitch";
import { useListSelection } from "@lib/hooks";
import { formatCategory } from "@lib/utils";
import { format } from "@lib/utils/date";
import { cred } from "@lib/utils/name";
import { i18n, router, useTranslation, Workspace } from "@providers";
import { AuthConsumer } from "@providers/authContext";
import useAxios, {
  DonationRequestFactory,
  UserRequestFactory,
} from "@providers/axios";
import Redirect from "pages/_redirect";

import { Actions } from "components/Application/Buttons/create";
import {
  AssignedToMe,
  ClearButton,
  NeedMyVote,
  StatusFilter,
} from "components/Application/Filters";
import StatusTag, {
  ApplicationStatus,
} from "components/Application/Status/tag";

import styles from "./styles.module.less";

export const onElementClick = (record: Single): void => {
  router.navigate({
    url: router.url({ name: "applications:show", params: { id: record.id } }),
  });
};

type FilterInfo = {
  assignedToMe?: boolean;
  status?: string[];
  needMyVote?: boolean;
  category?: string[];
};

type FilterSetting = {
  filterInfo?: FilterInfo;
};

const Filter: FC<{
  categoryIDs?: string[];
  initial: FilterSetting;
  onChange: (values: FilterSetting) => void;
}> = ({ initial, onChange, categoryIDs }) => {
  return (
    <AuthConsumer>
      {({ user }) => {
        return (
          <Card style={{ marginBottom: "5px" }}>
            <Space>
              <AssignedToMe
                initial={initial.filterInfo?.assignedToMe ?? false}
                onChange={() => {
                  onChange({
                    ...initial,
                    filterInfo: {
                      ...initial.filterInfo,
                      assignedToMe: !(
                        initial.filterInfo?.assignedToMe ?? false
                      ),
                    },
                  });
                }}
              />
              <RoleSwitch
                role={user.role}
                perform="application:can-vote"
                yes={() => {
                  return (
                    <NeedMyVote
                      disabled={categoryIDs?.length === 0}
                      initial={initial.filterInfo?.needMyVote ?? false}
                      onChange={() => {
                        const needMyVote = !(
                          initial.filterInfo?.needMyVote ?? false
                        );

                        onChange({
                          ...initial,
                          filterInfo: {
                            ...initial.filterInfo,
                            status: needMyVote
                              ? [ApplicationStatus.SuperManagerConfirmation]
                              : [],
                            needMyVote,
                            category: needMyVote ? categoryIDs : undefined,
                          },
                        });
                      }}
                    />
                  );
                }}
              />
              <StatusFilter
                initial={initial.filterInfo?.status}
                onChange={(value) => {
                  onChange({
                    ...initial,
                    filterInfo: {
                      ...initial.filterInfo,
                      status: value,
                    },
                  });
                }}
              />
              <ClearButton onClearAll={() => onChange({})} />
            </Space>
          </Card>
        );
      }}
    </AuthConsumer>
  );
};

const ApplicationsPage: FC<{ userId?: string }> = ({ userId }) => {
  const { isTarget, isSelected, setList } = useListSelection<Single>();

  const [filter, setFilter] = useState<FilterSetting>({});

  const { data } = useAxios(UserRequestFactory.apiUserIdGet, false, userId);

  const paginationState = useRef<StateRef>(null);

  const language = i18n.language.substr(0, 2);

  const { t } = useTranslation("Application");

  const columns = [
    {
      key: "id",
      render(record: Single) {
        return record.id;
      },
    },
    {
      key: "title",
      width: "35%",
      render(record: Single) {
        return record.title;
      },
    },
    {
      key: "status",
      render(record: Single) {
        return (
          <StatusTag status={record.status as ApplicationStatus}></StatusTag>
        );
      },
    },
    {
      key: "type",
      render(record: Single) {
        return <span>{formatCategory(language, record.category)}</span>;
      },
    },
    {
      key: "author",
      name: t("author"),
      render(record: Single) {
        const { first_name, middle_name, last_name } = { ...record.author };
        return cred(first_name, middle_name, last_name);
      },
    },
    {
      key: "createdAt",
      name: t("createdAt"),
      render(record: Single) {
        return format(record.created_at);
      },
    },
  ];

  const categoryIDs = data?.assigned_categories?.map((c) => {
    return c.id;
  });

  return (
    <Workspace noRefresh title={t("listTitle_all")} actions={<Actions />}>
      {data && (
        <Filter
          initial={filter}
          onChange={setFilter}
          categoryIDs={categoryIDs}
        />
      )}
      <PaginatedQuery<{ page: number; size: number }, Result, Single>
        className={styles.pagination}
        requestQuery={DonationRequestFactory.apiDonationRequestGet}
        variables={{
          sort: "",
          author: undefined,
          assignee: filter.filterInfo?.assignedToMe ? [userId] : undefined,
          status: filter.filterInfo?.status,
          category: filter.filterInfo?.category,
        }}
        stateRef={paginationState}
        onResult={(result) => {
          setList(result.data ?? []);
        }}
        render={(entries) => (
          <RegistryTable
            entity="Application"
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

export const pageComponent: FC = () => (
  <AuthConsumer>
    {({ user }) => {
      return (
        <RoleSwitch
          role={user.role}
          perform="applications:index"
          yes={() => <ApplicationsPage userId={user.uuid} />}
          no={() => <Redirect name="home"></Redirect>}
        />
      );
    }}
  </AuthConsumer>
);
