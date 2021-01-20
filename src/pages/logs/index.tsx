import React, { FC, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  DonationRequestBody as Single,
  DonationRequestResponse as Result,
} from "@generated";
import PaginatedQuery, { StateRef } from "@lib/components/Pagination";
import RegistryTable from "@lib/components/RegistryTable";
import RoleSwitch from "@lib/components/RoleSwitch";
import { useListSelection } from "@lib/hooks";
import { format } from "@lib/utils/date";
import { Workspace } from "@providers";
import { AuthConsumer } from "@providers/authContext";
import { DonationRequestFactory } from "@providers/axios";
import Unauthorized from "pages/_unauthorized";

import styles from "./styles.module.less";

const LogsPage: FC = () => {
  const { t } = useTranslation("Log");

  const {
    isTarget,
    isSelected,
    onElementClick,
    setList,
  } = useListSelection<Single>();

  const paginationState = useRef<StateRef>(null);

  const columns = [
    {
      key: "date",
      render(record: Single) {
        return format(record.started_at);
      },
    },
    {
      key: "who",
      render(record: Single) {
        return record.id;
      },
    },
    {
      key: "action",
      render() {
        return "Описание действия, выполненного пользователем";
      },
    },
  ];

  return (
    <Workspace noRefresh title={t("title")}>
      <PaginatedQuery<{ page: number; size: number }, Result, Single>
        className={styles.pagination}
        requestQuery={DonationRequestFactory.apiDonationRequestGet}
        stateRef={paginationState}
        onResult={(result) => {
          setList(result.data ?? []);
        }}
        render={(entries) => (
          <RegistryTable
            entity="Log"
            expandable={{
              expandedRowRender(record) {
                return <p style={{ margin: 0 }}>{record.description}</p>;
              },
              rowExpandable: (record) => record.name !== "Not Expandable",
            }}
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

export const name = "logs:index";

export const pageComponent: FC = () => {
  return (
    <AuthConsumer>
      {({ user }) => {
        return (
          <RoleSwitch
            role={user.role}
            perform={name}
            yes={() => <LogsPage />}
            no={() => <Unauthorized />}
          />
        );
      }}
    </AuthConsumer>
  );
};
