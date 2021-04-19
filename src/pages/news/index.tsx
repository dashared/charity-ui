import React, { FC, useRef } from "react";
import { Button, Col, Image, List, Row } from "antd";
import { NewsResponse as Result, NewsView as Single } from "@generated";
import PaginatedQuery, { StateRef } from "@lib/components/Pagination";
import RoleSwitch from "@lib/components/RoleSwitch";
import { useListSelection } from "@lib/hooks";
import { DateTimeFormat, format } from "@lib/utils/date";
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

  const paginationState = useRef<StateRef>(null);

  return (
    <Workspace title={t("title")} noRefresh actions={<Actions />}>
      <PaginatedQuery<{ page: number; size: number }, Result, Single>
        className={styles.pagination}
        requestQuery={NewsFactory.apiNewsGet}
        stateRef={paginationState}
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
                key={item.title}
                actions={[
                  <Button key="0" type="link">
                    {t("delete")}
                  </Button>,
                  <Button key="1" type="link">
                    {t("edit")}
                  </Button>,
                ]}
              >
                <Row justify="space-between" gutter={16}>
                  <Col>
                    <Image
                      width={150}
                      style={{ padding: 8 }}
                      src={`/api/file/${item.image_id}/download`}
                      fallback={"https://placeholder.pics/svg/300"}
                    />
                  </Col>
                  <Col>
                    <h3>{item.title}</h3>
                    <List.Item.Meta
                      description={format(
                        item.updated_at,
                        DateTimeFormat.DATE_SHORT,
                      )}
                    />
                    {item.description}
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
