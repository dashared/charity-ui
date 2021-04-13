import React, { FC } from "react";
import { Button, Card, List, Skeleton } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import RoleSwitch from "@lib/components/RoleSwitch";
import { router, useTranslation, Workspace } from "@providers";
import { AuthConsumer } from "@providers/authContext";
import useAxios, { NewsFactory } from "@providers/axios";
import Unauthorized from "pages/_unauthorized";

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

  const { data, loading } = useAxios(NewsFactory.apiNewsGet, false, 0, 10);
  const loadMore = !loading ? (
    <div
      style={{
        textAlign: "center",
        marginTop: 12,
        height: 32,
        lineHeight: "32px",
      }}
    >
      <Button>loading more</Button>
    </div>
  ) : null;

  // return <Workspace title={t("title")} actions={<Actions />} noRefresh>
  //   <PaginatedQuery<{ page: number; size: number }, Result, Single>
  //     className={styles.pagination}
  //     requestQuery={NewsFactory.apiNewsGet}
  //     stateRef={paginationState}
  //     onResult={(result) => {
  //       setList(result.data ?? []);
  //     }}
  //     render={(entries) => (
  //       <RegistryTable
  //         entity="Users"
  //         columns={columns}
  //         // eslint-disable-next-line
  //         rows={entries as Record<string, any>[]} // TODO
  //         rowState={(record, index) => ({
  //           selected: isSelected(index),
  //           target: isTarget(index),
  //         })}
  //         onRecordClick={(event, record, index) => {
  //           if (index !== undefined) {
  //             onElementClick(record);
  //           }
  //         }}
  //       />
  //     )}
  //   />
  // </Workspace>;

  return (
    <Workspace title={t("title")} noRefresh actions={<Actions />}>
      <Card>
        <List
          className="demo-loadmore-list"
          loading={loading}
          itemLayout="horizontal"
          loadMore={loadMore}
          dataSource={data?.data}
          renderItem={(item) => (
            <List.Item
              actions={[
                <a key="list-loadmore-edit">Edit</a>,
                <a key="list-loadmore-more">Delete</a>,
              ]}
            >
              <Skeleton avatar title={false} loading={loading} active>
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title={<a href="https://ant.design">{item.title}</a>}
                  description={item.description}
                />
              </Skeleton>
            </List.Item>
          )}
        />
      </Card>
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
