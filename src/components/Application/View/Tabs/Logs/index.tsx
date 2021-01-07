import React, { FC, useRef } from "react";
import {
  DonationRequestHistoryResponse as Result,
  DonationRequestStatusHistory as Single,
} from "@generated";
import PaginatedQuery, { StateRef } from "@lib/components/Pagination";
import RegistryTable from "@lib/components/RegistryTable";
import { useListSelection } from "@lib/hooks";
import { useTranslation } from "@providers";
import { DonationRequestFactory } from "@providers/axios";

import StatusTag, {
  ApplicationStatus,
} from "components/Application/Status/tag";

import styles from "./styles.module.less";

export const LogsTab: FC<{
  id: number;
}> = ({ id }) => {
  const { t } = useTranslation("Application");

  const paginationState = useRef<StateRef>(null);

  // useEffect(() => {
  //   onRefetch(paginationState.current?.page ?? 0, paginationState.current?.size ?? 0);
  // }, [])

  const {
    isTarget,
    isSelected,
    onElementClick,
    setList,
  } = useListSelection<Single>();

  const columns = [
    {
      key: "prevStatus",
      name: t("prevStatus"),
      render(record: Single) {
        return (
          <StatusTag status={record.previous_status as ApplicationStatus} />
        );
      },
    },

    {
      key: "newStatus",
      name: t("newStatus"),
      render(record: Single) {
        return (
          <StatusTag status={record.current_status as ApplicationStatus} />
        );
      },
    },
    {
      key: "statusUpdData",
      name: t("statusUpdData"),
      render(record: Single) {
        return <>{record.created_at}</>;
      },
    },
  ];

  return (
    <PaginatedQuery<{ id: number; page: number; size: number }, Result, Single>
      className={styles.pagination}
      requestQuery={DonationRequestFactory.donationRequestIdHistoryGet}
      stateRef={paginationState}
      variables={{ id }}
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
