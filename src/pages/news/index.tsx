import React, { FC, useCallback, useRef, useState } from "react";
import { Button, Col, Image, List, Row } from "antd";
import { NewsResponse as Result, NewsView as Single } from "@generated";
import PaginatedQuery, { StateRef } from "@lib/components/Pagination";
import RoleSwitch from "@lib/components/RoleSwitch";
import { useListSelection } from "@lib/hooks";
import { DateTimeFormat, format } from "@lib/utils/date";
import { notify } from "@lib/utils/notification";
import { router, useTranslation, Workspace } from "@providers";
import { AuthConsumer } from "@providers/authContext";
import { NewsFactory } from "@providers/axios";
import Unauthorized from "pages/_unauthorized";

import styles from "./styles.module.less";

const Actions: FC = () => {
  const { t } = useTranslation("News");

  return (
    <Button
      type="primary"
      onClick={() => {
        router.navigate({
          url: router.url({ name: "news:create" }),
        });
      }}
    >
      {t("create")}
    </Button>
  );
};

const NewsPage: FC = () => {
  const { t } = useTranslation("News");

  const { setList } = useListSelection<Single>();

  const [refetch, setRefetch] = useState<boolean | undefined>(undefined);

  const paginationState = useRef<StateRef>(null);

  // wtf
  const refetchFund = useCallback(() => {
    setRefetch(!refetch);
  }, [refetch]);

  const deleteItemRequest = useCallback(
    async (id: string) => {
      try {
        await NewsFactory.apiNewsIdDelete(id);

        notify(t("$views.deleteSuccess"));
      } catch (e) {
        console.error(e);
        notify(t("$views.deleteError"));
      } finally {
        refetchFund();
      }
    },
    [t, refetchFund],
  );

  return (
    <Workspace title={t("title")} noRefresh actions={<Actions />}>
      <PaginatedQuery<{ page: number; size: number }, Result, Single>
        className={styles.pagination}
        requestQuery={NewsFactory.apiNewsGet}
        stateRef={paginationState}
        refetch={refetch}
        onResult={(result) => {
          setList(result.data ?? []);
        }}
        render={(entries) => (
          <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={entries}
            renderItem={(item) => (
              <List.Item
                key={item.created_at}
                actions={[
                  <Button
                    key="0"
                    type="link"
                    onClick={() => deleteItemRequest(item.id ?? "")}
                  >
                    {t("delete")}
                  </Button>,
                  <Button
                    key="1"
                    type="link"
                    onClick={() => {
                      router.navigate({
                        url: router.url({
                          name: "news:edit",
                          params: { id: item.id },
                        }),
                      });
                    }}
                  >
                    {t("edit")}
                  </Button>,
                ]}
              >
                <Row justify="start">
                  <Col>
                    <Image
                      width={150}
                      style={{ padding: 8, paddingRight: 20 }}
                      src={`/api/file/${item.image_id}/download`}
                      fallback={"https://placeholder.pics/svg/300"}
                    />
                  </Col>
                  <Col span={10}>
                    <div style={{ minWidth: "300px" }}>
                      <h3>{item.title}</h3>
                      <List.Item.Meta
                        description={format(
                          item.updated_at,
                          DateTimeFormat.DATE_SHORT,
                        )}
                      />
                      {item.description}
                    </div>
                  </Col>
                </Row>
              </List.Item>
            )}
          />
        )}
      />
    </Workspace>
  );
};

export const name = "news:index";

export const pageComponent: FC = () => {
  return (
    <AuthConsumer>
      {({ user }) => {
        return (
          <RoleSwitch
            role={user.role}
            perform={name}
            yes={() => <NewsPage />}
            no={() => <Unauthorized />}
          />
        );
      }}
    </AuthConsumer>
  );
};
