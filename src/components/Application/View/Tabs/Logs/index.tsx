import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  DonationRequestHistoryResponse as Result,
  DonationRequestStatusHistory as Single,
} from "@generated";
import PaginatedQuery, { StateRef } from "@lib/components/Pagination";
import RegistryTable from "@lib/components/RegistryTable";
import { useListSelection } from "@lib/hooks";
import { format } from "@lib/utils/date";
import { fullName } from "@lib/utils/name";
import { useTranslation } from "@providers";
import { DonationRequestFactory } from "@providers/axios";

import StatusTag, {
  ApplicationStatus,
} from "components/Application/Status/tag";
import RoleTag from "components/User/Role/tag";

import styles from "./styles.module.less";

type RefType = {
  onRefetch: () => Promise<void>;
};

type PropsType = {
  id: number;
  onButtonsStatusRefetch: () => Promise<void>;
};

export const LogsTab = React.forwardRef<RefType, PropsType>((props, ref) => {
  const { id, onButtonsStatusRefetch } = props;
  const { t } = useTranslation("Application");

  const [refetch, setRefetch] = useState<boolean | undefined>(undefined);

  const {
    isTarget,
    isSelected,
    onElementClick,
    setList,
  } = useListSelection<Single>();

  const onResult = useCallback(
    (result: Result) => {
      setList(result.data ?? []);
    },
    [setList],
  );

  const paginationState = useRef<StateRef>(null);

  useEffect(() => {
    if (ref !== null) {
      (ref as MutableRefObject<RefType>).current = {
        onRefetch: async () => {
          await onButtonsStatusRefetch();
          setRefetch(!refetch);
        },
      };
    }
    // eslint-disable-next-line
  }, [ref, setRefetch, refetch]);

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
        return format(record.created_at);
      },
    },

    {
      key: "authorUpd",
      render(record: Single) {
        const author = record.author;

        return author ? (
          fullName(author.first_name, author.middle_name, author.last_name)
        ) : (
          <>-</>
        );
      },
    },

    {
      key: "authorRole",
      render(record: Single) {
        const author = record.author;
        return <RoleTag roles={author?.role ? [author?.role] : []} />;
      },
    },
  ];

  return (
    <PaginatedQuery<{ page: number; size: number }, Result, Single>
      className={styles.pagination}
      // eslint-disable-next-line
      // @ts-ignore
      requestQuery={DonationRequestFactory.apiDonationRequestIdHistoryGet}
      stateRef={paginationState}
      refetch={refetch}
      variables={{ sort: "", id }}
      onResult={onResult}
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
});
