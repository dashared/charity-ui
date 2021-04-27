import React, { FC, useRef } from "react";
import { Card } from "antd";
import { Link } from "@curi/react-dom";
import {
  DonationRequestBody as Single,
  DonationRequestResponse as Result,
} from "@generated";
import PaginatedQuery, { StateRef } from "@lib/components/Pagination";
import RegistryTable from "@lib/components/RegistryTable";
import { useListSelection } from "@lib/hooks";
import { format } from "@lib/utils/date";
import { useTranslation } from "@providers";
import { DonationRequestFactory } from "@providers/axios";

import StatusTag, {
  ApplicationStatus,
} from "components/Application/Status/tag";

export const ApplicationsTab: FC<{ userId: string }> = ({ userId }) => {
  const { t } = useTranslation("Application");

  const paginationState = useRef<StateRef>(null);

  const {
    isTarget,
    isSelected,
    onElementClick,
    setList,
  } = useListSelection<Single>();

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
      key: "createdAt",
      name: t("createdAt"),
      render(record: Single) {
        return format(record.created_at);
      },
    },
  ];

  return (
    <Card title={t("listTitle")} bordered={false}>
      <PaginatedQuery<{ page: number; size: number }, Result, Single>
        //className={styles.pagination}
        requestQuery={DonationRequestFactory.apiDonationRequestGet}
        variables={{ sort: "", author: [userId] }}
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
    </Card>
  );
};
