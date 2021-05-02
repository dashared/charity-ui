import React, { FC, useRef } from "react";
import { Link } from "@curi/react-dom";
import {
  DonationRequestBody as Single,
  DonationRequestResponse as Result,
} from "@generated";
import PaginatedQuery, { StateRef } from "@lib/components/Pagination";
import RegistryTable from "@lib/components/RegistryTable";
import { useListSelection } from "@lib/hooks";
import { format as formatCategory } from "@lib/utils/category";
import { format } from "@lib/utils/date";
import { cred } from "@lib/utils/name";
import { i18n, useTranslation } from "@providers";
import { DonationRequestFactory, UserApiModel as User } from "@providers/axios";

import StatusTag, {
  ApplicationStatus,
} from "components/Application/Status/tag";

import styles from "./styles.module.less";

const ManagersApplications: FC<{ user: User }> = ({ user }) => {
  const {
    isTarget,
    isSelected,
    onElementClick,
    setList,
  } = useListSelection<Single>();

  const paginationState = useRef<StateRef>(null);

  const language = i18n.language.substring(0, 2);

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

  return (
    <PaginatedQuery<{ page: number; size: number }, Result, Single>
      className={styles.pagination}
      requestQuery={DonationRequestFactory.apiDonationRequestGet}
      variables={{ sort: "", author: null, assignee: [user.id] }}
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
  );
};

export default ManagersApplications;
