import React, { FC, useRef } from "react";
import { Button, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  BlockchainDonation as Single,
  BlockchainDonationsResponse as Result,
} from "@generated"; // TODO: replace to TransactionRequestBody
import PaginatedQuery, { StateRef } from "@lib/components/Pagination";
import RegistryTable from "@lib/components/RegistryTable";
import RoleSwitch from "@lib/components/RoleSwitch";
import { useListSelection } from "@lib/hooks";
import { formatDate, formatMoney } from "@lib/utils";
import { cred } from "@lib/utils/name";
import { router, useTranslation, Workspace } from "@providers";
import { AuthConsumer } from "@providers/authContext";
import { DonationsFactory } from "@providers/axios";
import Redirect from "pages/_redirect";

import styles from "./styles.module.less";

const Actions: FC = () => {
  const { t } = useTranslation("Transaction");

  return (
    <Button
      type="primary"
      icon={<PlusOutlined />}
      onClick={() => {
        router.navigate({ url: router.url({ name: "transactions:create" }) });
      }}
    >
      {t("createTransaction")}
    </Button>
  );
};

const TransactionsPage: FC = () => {
  const { isTarget, isSelected, setList } = useListSelection<Single>();

  const onElementClick = (id: string): void => {
    router.navigate({
      url: router.url({ name: "transactions:show", params: { id } }),
    });
  };

  const paginationState = useRef<StateRef>(null);

  const { t } = useTranslation("Transaction");

  const columns = [
    {
      key: "sum",
      render(record: Single) {
        return formatMoney(record.amount);
      },
    },
    {
      key: "who",
      render(record: Single) {
        if (!record.donation_author) {
          return <>-</>;
        }
        const { first_name, middle_name, last_name } = record.donation_author;
        return cred(first_name, middle_name, last_name);
      },
    },
    {
      key: "aim",
      render(record: Single) {
        return (
          <>
            {record.donation_request && (
              <Tag color="blue">
                {t("to_application", { id: record.donation_request.id })}
              </Tag>
            )}
            {!record.donation_request && (
              <Tag color="default">{t("to_fund")}</Tag>
            )}
          </>
        );
      },
    },

    {
      key: "createdAt",
      render(record: Single) {
        return formatDate(record.created_at);
      },
    },
  ];

  // TODO: replace api calls to TransactionsFactory
  return (
    <Workspace noRefresh title={t("title")} actions={<Actions />}>
      <PaginatedQuery<{ page: number; size: number }, Result, Single>
        className={styles.pagination}
        requestQuery={DonationsFactory.apiDonationsGet}
        stateRef={paginationState}
        onResult={(result) => {
          setList(result.data ?? []);
        }}
        render={(entries) => (
          <RegistryTable
            entity="Transaction"
            columns={columns}
            // eslint-disable-next-line
            rows={entries as Record<string, any>[]} // TODO
            rowState={(record, index) => ({
              selected: isSelected(index),
              target: isTarget(index),
            })}
            onRecordClick={(event, record, index) => {
              if (index !== undefined) {
                onElementClick(record.id);
              }
            }}
          />
        )}
      />
    </Workspace>
  );
};

export const pageComponent: FC = () => {
  return (
    <AuthConsumer>
      {({ user }) => {
        return (
          <RoleSwitch
            role={user.role}
            perform="transactions:index"
            yes={() => <TransactionsPage />}
            no={() => <Redirect name="home" />}
          />
        );
      }}
    </AuthConsumer>
  );
};
