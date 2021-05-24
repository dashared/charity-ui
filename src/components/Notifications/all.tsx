import React, { FC, useRef } from "react";
import {
  NotificationsNotification as Single,
  NotificationsNotificationResponse as Result,
} from "@generated";
import PaginatedQuery, { StateRef } from "@lib/components/Pagination";
import RegistryTable from "@lib/components/RegistryTable";
import { useListSelection } from "@lib/hooks";
import { formatDate } from "@lib/utils";
import { fullName } from "@lib/utils/name";
import { useTranslation } from "@providers";
import { NotificationsFactory } from "@providers/axios";

import styles from "./styles.module.less";

export const AllnNotificationsPage: FC = () => {
  // eslint-disable-next-line
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
      key: "author",
      width: "15%",
      render(record: Single) {
        if (!record.notification_author) {
          return null;
        }

        const {
          first_name,
          middle_name,
          last_name,
        } = record.notification_author;
        return fullName(first_name, middle_name, last_name);
      },
    },
    {
      key: "body",
      width: "15%",
      render(record: Single) {
        return record.body;
      },
    },
    {
      key: "notification_type",
      render(record: Single) {
        return record.notification_type;
      },
    },
  ];

  return (
    <PaginatedQuery<{ page: number; size: number }, Result, Single>
      className={styles.pagination}
      requestQuery={NotificationsFactory.apiNotificationsGet}
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
