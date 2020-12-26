import React, { FC, useRef } from "react";
import { Link } from "@curi/react-dom";
import {
  DefaultApiFactory,
  ModelsDonationRequestBody as Single,
  ModelsDonationRequestResponse as Result,
} from "@generated";
import PaginatedQuery, { StateRef } from "@lib/components/Pagination";
import RegistryTable from "@lib/components/RegistryTable";
import { useListSelection } from "@lib/hooks";
import { cred } from "@lib/utils/name";
import { useTranslation, Workspace } from "@providers";

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

  const { t } = useTranslation("Application");

  const paginationState = useRef<StateRef>(null);

  const columns = [
    {
      key: "id",
      name: t("id"),
      render(record: Single) {
        return (
          <Link params={{ id: record.id }} name="applications:show">
            id
          </Link>
        );
      },
    },
    {
      key: "title",
      name: t("title"),
      render(record: Single) {
        return record.title;
      },
    },
    {
      key: "status",
      name: t("status"),
      render(record: Single) {
        return (
          <StatusTag status={record.status as ApplicationStatus}></StatusTag>
        );
      },
    },
    {
      key: "author",
      name: t("author"),
      render(record: Single) {
        const { first_name, middle_name, last_name } = { ...record.donee };
        return cred(first_name, middle_name, last_name);
      },
    },
    {
      key: "createdAt",
      name: t("createdAt"),
      render(record: Single) {
        return record.created_at;
      },
    },
  ];

  return (
    <Workspace noRefresh title={t("listTitle")}>
      <PaginatedQuery<{ page: number; size: number }, Result, Single>
        className={styles.pagination}
        requestQuery={DefaultApiFactory(undefined).donationRequestGet}
        stateRef={paginationState}
        onResult={(result) => {
          setList(result.data ?? []);
        }}
        render={(entries) => (
          <RegistryTable
            entity="Application"
            columns={columns}
            // eslint-ignore-next-line
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

export default ApplicationsPage;
