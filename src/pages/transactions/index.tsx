import React, { FC, useRef } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "@curi/react-dom";
import {
  DonationRequestBody as Single,
  DonationRequestResponse as Result,
} from "@generated"; // TODO: replace to TransactionRequestBody
import PaginatedQuery, { StateRef } from "@lib/components/Pagination";
import RegistryTable from "@lib/components/RegistryTable";
import RoleSwitch from "@lib/components/RoleSwitch";
import { useListSelection } from "@lib/hooks";
import { format } from "@lib/utils/date";
import { cred } from "@lib/utils/name";
import { router, useTranslation, Workspace } from "@providers";
import { AuthConsumer } from "@providers/authContext";
import { DonationRequestFactory } from "@providers/axios";
import Redirect from "pages/_redirect";

import StatusTag, {
  TransactionStatus,
} from "components/Transaction/Status/tag";

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
  const {
    isTarget,
    isSelected,
    onElementClick,
    setList,
  } = useListSelection<Single>();

  const paginationState = useRef<StateRef>(null);

  const { t } = useTranslation("Transaction");

  const columns = [
    {
      key: "id",
      render(record: Single) {
        return (
          <Link params={{ id: record.id }} name="transactions:show">
            {record.id}
          </Link>
        );
      },
    },
    {
      key: "sum",
      render() {
        return "1000 $";
      },
    },
    {
      key: "who",
      render() {
        return cred("Алексей", "Юрьевич", "Андреев");
      },
    },
    {
      key: "aim",
      render() {
        return (
          // TODO: replace after transactions api is done
          <Link params={{ id: 1 }} name="applications:show">
            Имя заявки как дела
          </Link>
        );
      },
    },

    {
      key: "status",
      render() {
        return <StatusTag status={TransactionStatus.Success} />;
      },
    },

    {
      key: "time",
      render(record: Single) {
        return format(record.until);
      },
    },
  ];

  // TODO: replace api calls to TransactionsFactory
  return (
    <Workspace noRefresh title={t("title")} actions={<Actions />}>
      <PaginatedQuery<{ page: number; size: number }, Result, Single>
        className={styles.pagination}
        requestQuery={DonationRequestFactory.donationRequestGet}
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
                onElementClick(event, index);
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
            no={() => <Redirect name="home"></Redirect>}
          />
        );
      }}
    </AuthConsumer>
  );
};
