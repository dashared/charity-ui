import React, { FC, useRef } from "react";
import { Link } from "@curi/react-dom";
import {
  DonationRequestBody as Single,
  DonationRequestResponse as Result,
} from "@generated";
import PaginatedQuery, { StateRef } from "@lib/components/Pagination";
import RegistryTable from "@lib/components/RegistryTable";
import RoleSwitch from "@lib/components/RoleSwitch";
import { useListSelection } from "@lib/hooks";
import { format } from "@lib/utils/date";
import { cred } from "@lib/utils/name";
import { useTranslation, Workspace } from "@providers";
import { AuthConsumer } from "@providers/authContext";
import { DonationRequestFactory } from "@providers/axios";
import Redirect from "pages/_redirect";

import { Actions } from "components/Application/Buttons/create";
import StatusTag, {
  ApplicationStatus,
} from "components/Application/Status/tag";

import styles from "./styles.module.less";

const ApplicationsPage: FC = () => {
  const {
    isTarget,
    isSelected,
    onElementClick,
    setList,
  } = useListSelection<Single>();

  const paginationState = useRef<StateRef>(null);

  const { t } = useTranslation("Application");

  const columns = [
    {
      key: "id",
      render(record: Single) {
        return (
          <Link params={{ id: record.id }} name="applications:show">
            {record.id}
          </Link>
        );
      },
    },
    {
      key: "title",
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
        return <span>{record.request_type}</span>;
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

  return (
    <Workspace noRefresh title={t("listTitle_all")} actions={<Actions />}>
      <PaginatedQuery<{ page: number; size: number }, Result, Single>
        className={styles.pagination}
        requestQuery={DonationRequestFactory.apiDonationRequestGet}
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
          perform="applications:index"
          yes={() => <ApplicationsPage />}
          no={() => <Redirect name="home"></Redirect>}
        />
      );
    }}
  </AuthConsumer>
);
