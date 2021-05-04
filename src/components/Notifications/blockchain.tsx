import React, { FC, useRef } from "react";
import { Tag } from "antd";
import {
  BlockchainDonationsResponse as Result,
  BlockchainStatus as Single,
  BlockchainStatusStatusEnum,
} from "@generated";
import PaginatedQuery, { StateRef } from "@lib/components/Pagination";
import RegistryTable from "@lib/components/RegistryTable";
import { useListSelection } from "@lib/hooks";
import { formatDate } from "@lib/utils";
import { useTranslation } from "@providers";
import { BatchStatusFactory } from "@providers/axios";

import styles from "./styles.module.less";

const BlockchainStatusTag: FC<{ status?: BlockchainStatusStatusEnum }> = ({
  status,
}) => {
  const { t } = useTranslation("Notifications");

  let color = "grey";

  switch (status) {
    case BlockchainStatusStatusEnum.Pending:
      color = "grey";
      break;
    case BlockchainStatusStatusEnum.Success:
      color = "green";
      break;
    case BlockchainStatusStatusEnum.Failure:
      color = "red";
      break;
    default:
      break;
  }

  return <Tag color={color}>{t(`BlockchainStatusStatusEnum.${status}`)}</Tag>;
};

export const BlockchainNotificationsPage: FC = () => {
  const { t } = useTranslation("Notifications");

  const paginationState = useRef<StateRef>(null);

  const { isTarget, isSelected, setList } = useListSelection<Single>();

  const columns = [
    {
      key: "created_at",
      width: "15%",
      render(record: Single) {
        return formatDate(record.created_at);
      },
    },
    {
      key: "updated_at",
      width: "15%",
      render(record: Single) {
        return formatDate(record.updated_at);
      },
    },
    {
      key: "status",
      width: "12%",
      render(record: Single) {
        return <BlockchainStatusTag status={record.status} />;
      },
    },
    {
      key: "type",
      render(record: Single) {
        return t(`BlockchainStatusTypeEnum.${record.type}`);
      },
    },
  ];

  return (
    <PaginatedQuery<{ page: number; size: number }, Result, Single>
      className={styles.pagination}
      requestQuery={BatchStatusFactory.apiBatchStatusesGet}
      stateRef={paginationState}
      onResult={(result) => {
        setList(result.data ?? []);
      }}
      render={(entries) => (
        <RegistryTable
          entity="Notifications"
          columns={columns}
          rowKey="created_at"
          // eslint-disable-next-line
          rows={entries as Record<string, any>[]} // TODO
          rowState={(record, index) => ({
            selected: isSelected(index),
            target: isTarget(index),
          })}
          onRecordClick={() => {
            //
          }}
        />
      )}
    />
  );
};
