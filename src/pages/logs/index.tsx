import React, { FC, useRef } from "react";
import { useTranslation } from "react-i18next";
import { AuditAudit as Single, AuditResponse as Result } from "@generated";
import PaginatedQuery, { StateRef } from "@lib/components/Pagination";
import RegistryTable from "@lib/components/RegistryTable";
import RoleSwitch from "@lib/components/RoleSwitch";
import { useListSelection } from "@lib/hooks";
import { format } from "@lib/utils/date";
import { fullName } from "@lib/utils/name";
import { Workspace } from "@providers";
import { AuthConsumer } from "@providers/authContext";
import { AuditFactory } from "@providers/axios";
import Unauthorized from "pages/_unauthorized";

import RoleTag from "components/User/Role/tag";

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
        return format(record.created_at);
      },
    },
    {
      key: "who",
      render(record: Single) {
        if (!record.author) {
          return null;
        }
        const { first_name, middle_name, last_name } = record.author;
        return fullName(first_name, middle_name, last_name);
      },
    },
    {
      key: "role",
      render(record: Single) {
        if (!record?.author?.role) {
          return null;
        }
        return <RoleTag roles={[record.author.role]} />;
      },
    },
    {
      key: "action",
      render(record: Single) {
        return record.type;
      },
    },
  ];

  return (
    <Workspace noRefresh title={t("title")}>
      <PaginatedQuery<{ page: number; size: number }, Result, Single>
        className={styles.pagination}
        requestQuery={AuditFactory.apiAuditGet}
        stateRef={paginationState}
        onResult={(result) => {
          setList(result.data ?? []);
        }}
        render={(entries) => (
          <RegistryTable
            entity="Log"
            expandable={{
              expandedRowRender(record: Single) {
                const data = JSON.parse(record?.data ?? "");
                const r = {
                  ...record,
                  data,
                };
                return (
                  <div>
                    <pre style={{ fontSize: "10px" }}>
                      {JSON.stringify(r, null, 3)}
                    </pre>
                  </div>
                );
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
