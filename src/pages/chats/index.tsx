import React, { FC, useRef } from "react";
import { Badge, Col, List, Row } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { Link } from "@curi/react-dom";
import { ChatDialog as Single, ChatDialogResponse as Result } from "@generated";
import PaginatedQuery, { StateRef } from "@lib/components/Pagination";
import RoleSwitch from "@lib/components/RoleSwitch";
import { useListSelection } from "@lib/hooks";
import { formatDate } from "@lib/utils";
import { fullName } from "@lib/utils/name";
import { router, useTranslation, Workspace } from "@providers";
import { AuthConsumer } from "@providers/authContext";
import { ChatsFactory } from "@providers/axios";
import Unauthorized from "pages/_unauthorized";

import styles from "./styles.module.less";

const ChatsPage: FC = () => {
  const { t } = useTranslation("Chats");

  const { setList } = useListSelection<Single>();

  const paginationState = useRef<StateRef>(null);

  const onElementClick = (record: Single): void => {
    router.navigate({
      url: router.url({ name: "chats:show", params: { id: record.id } }),
    });
  };

  return (
    <Workspace title={t("title")} noRefresh>
      <PaginatedQuery<{ page: number; size: number }, Result, Single>
        className={styles.pagination}
        requestQuery={ChatsFactory.apiChatDialogsGet}
        variables={{
          sort: "",
        }}
        stateRef={paginationState}
        onResult={(result) => {
          setList(result.data ?? []);
        }}
        render={(entries) => (
          <List
            itemLayout="horizontal"
            dataSource={entries}
            renderItem={(item) => {
              const { first_name, middle_name, last_name } = item.user;

              return (
                <List.Item onClick={() => onElementClick(item)}>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={`/api/file/${item.user?.image_id}/download`}
                      />
                    }
                    title={
                      <Link name={"users:show"} params={{ id: item.user?.id }}>
                        {fullName(first_name, middle_name, last_name)}
                      </Link>
                    }
                    description={item.user?.email}
                  />
                  <Row align="top" style={{ marginRight: "10px" }}>
                    <Col>
                      <Row
                        justify="center"
                        style={{
                          color: "gray",
                          fontSize: "12px",
                          marginBottom: "5px",
                        }}
                      >
                        {formatDate(Date())}
                      </Row>
                      <Row justify="end">
                        <Badge count={10}></Badge>
                      </Row>
                    </Col>
                  </Row>
                </List.Item>
              );
            }}
          />
        )}
      />
    </Workspace>
  );
};

export const name = "chats:index";

export const pageComponent: FC = () => (
  <AuthConsumer>
    {({ user }) => {
      return (
        <RoleSwitch
          role={user.role}
          perform={name}
          yes={() => <ChatsPage />}
          no={() => <Unauthorized />}
        />
      );
    }}
  </AuthConsumer>
);
