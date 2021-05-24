import React, { FC, useCallback, useEffect, useState } from "react";
import { Badge, Col, List, Row, Skeleton } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "@curi/react-dom";
import {
  ChatDialogResponseBody as Single,
  ChatMessageBody,
  UtilsPageData,
} from "@generated";
import RoleSwitch from "@lib/components/RoleSwitch";
import { formatDate } from "@lib/utils";
import { fullName } from "@lib/utils/name";
import { router, useTranslation, Workspace } from "@providers";
import { AuthConsumer } from "@providers/authContext";
import { ChatsFactory, soketUrl } from "@providers/axios";
import Unauthorized from "pages/_unauthorized";

const ChatsPage: FC = () => {
  const { t } = useTranslation("Chats");

  //const { setList } = useListSelection<Single>();

  const [pageData, setPageData] = useState<UtilsPageData>({
    page: 1,
    size: 5,
  });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Single[]>([]);

  const onElementClick = (record: Single): void => {
    router.navigate({
      url: router.url({ name: "chats:show", params: { id: record.id } }),
    });
  };

  useEffect(
    () => {
      const socket = new WebSocket(soketUrl);

      socket.onmessage = socketListener;

      return () => {
        socket.close();
      };
    },
    // eslint-disable-next-line
    [],
  );

  useEffect(
    () => {
      fetchAPI();
    },
    // eslint-disable-next-line
    [pageData.page],
  );

  const fetchAPI = useCallback(async () => {
    try {
      setLoading(true);

      const apiPage = (pageData.page ?? 0) - 1;
      const dataFromAPI = await ChatsFactory.apiChatDialogsGet(
        apiPage,
        pageData.size,
        "last_message_at,desc",
      );

      setData(dataFromAPI.data?.data ?? []);
      setPageData({
        ...dataFromAPI.data.page,
        page: (dataFromAPI.data.page?.page ?? 0) + 1,
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [pageData.page, pageData.size]);

  const socketListener = useCallback(
    // eslint-disable-next-line
    (...websocketTarget: MessageEvent<any>[]) => {
      const dataMessages: Single[] = websocketTarget.map((item) => {
        const message = JSON.parse(item.data) as ChatMessageBody;
        return {
          id: message.dialog_id,
          user: message.dialog?.user,
          last_message: {
            ...message,
          },
        };
      });

      setData((prev) => {
        const dialogsss: Single[] = [...dataMessages];

        for (const newDialog of dataMessages) {
          for (const prevDialog of prev) {
            if (newDialog.id !== prevDialog.id) {
              dialogsss.push(prevDialog);
            }
          }
        }

        return dialogsss;
      });
    },
    // eslint-disable-next-line
    [],
  );

  return (
    <Workspace title={t("title")} noRefresh>
      {loading && <Skeleton active={true} />}
      {!loading && data && (
        <List
          style={{ background: "white", padding: "16px" }}
          pagination={{
            onChange: (page) => {
              setPageData({
                ...pageData,
                page,
              });
            },
            pageSize: pageData.size,
            total: pageData.totalElements,
            current: pageData.page ?? 0 + 1,
          }}
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => {
            if (!item.user) {
              return null;
            }

            const { first_name, middle_name, last_name } = item.user;

            return (
              <List.Item onClick={() => onElementClick(item)}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={
                        item.user?.image_id
                          ? `/api/file/${item.user?.image_id}/download`
                          : ""
                      }
                      icon={!item.user?.image_id ? <UserOutlined /> : null}
                    />
                  }
                  title={
                    <Link name={"users:show"} params={{ id: item.user?.id }}>
                      {fullName(first_name, middle_name, last_name)}
                    </Link>
                  }
                  description={item.last_message?.body}
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
                      {formatDate(item.last_message?.created_at)}
                    </Row>
                    <Row justify="end">
                      <Badge count={item.unread_message_counter}></Badge>
                    </Row>
                  </Col>
                </Row>
              </List.Item>
            );
          }}
        />
      )}
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
