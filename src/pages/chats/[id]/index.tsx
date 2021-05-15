import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import {
  Button,
  Comment,
  Empty,
  Form,
  Input,
  List,
  Skeleton,
  Tooltip,
} from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { ChatMessageBody } from "@generated";
import RoleSwitch from "@lib/components/RoleSwitch";
import { formatDate } from "@lib/utils";
import { cred } from "@lib/utils/name";
import { PageProps, useTranslation, Workspace } from "@providers";
import { AuthConsumer, User } from "@providers/authContext";
import useAxios, { ChatsFactory, soketUrl } from "@providers/axios";
// import { io } from "socket.io-client";
import Unauthorized from "pages/_unauthorized";

import styles from "./styles.module.less";

const ChatPage: FC<PageProps & { user: User }> = ({ response }) => {
  const id = response.params.id;

  const [listState, setListState] = useState<{
    chats: ChatMessageBody[];
    cursor?: string;
    loading: boolean;
    hasMore: boolean;
  }>({
    chats: [],
    cursor: undefined,
    loading: false,
    hasMore: false,
  });

  const [state, setState] = useState<{
    submitting: boolean;
    value: string;
  }>({
    submitting: false,
    value: "",
  });

  useEffect(
    () => {
      // const socket = io(
      //   `${process.env.REACT_APP_API_URL}`, {
      //   path: '/api/chat/ws/',
      //   transports: ['websocket']
      // });

      // socket.on('message', (event, ...args) => {
      //   console.log(`got ${event}`);
      // });

      // socket.onAny((event, ...args) => {
      //   console.log(`got ${event}`);
      // });

      // socket.on('connect', (...args) => {
      //   console.log(args);
      // })
      const socket = new WebSocket(soketUrl);

      socket.onmessage = socketListener;

      return () => {
        socket.close();
      };
    },
    // eslint-disable-next-line
    [],
  );

  const socketListener = useCallback(
    // eslint-disable-next-line
    (...websocketTarget: MessageEvent<any>[]) => {
      const data = websocketTarget
        .map((item) => {
          return JSON.parse(item.data) as ChatMessageBody;
        })
        .filter((item) => item.dialog_id === id);

      setListState({
        ...listState,
        chats: data.concat(listState.chats),
      });
    },
    // eslint-disable-next-line
    [listState.chats, setListState],
  );

  useEffect(
    () => {
      if (!state.submitting) {
        fetchAPI();
      }
    },
    // eslint-disable-next-line
    [state.submitting],
  );

  const fetchAPI = useCallback(async () => {
    setListState({ ...listState, loading: true });

    const responseAPI = await ChatsFactory.apiChatDialogsIdMessagesGet(
      10,
      id,
      listState.cursor,
    );

    if (responseAPI.data.cursor !== listState.cursor) {
      setListState({
        chats: listState.cursor
          ? [...listState.chats, ...(responseAPI.data.data ?? [])]
          : responseAPI.data.data ?? [],
        loading: false,
        hasMore: !(
          "1" === responseAPI.data.cursor || "0" === responseAPI.data.cursor
        ),
        cursor: responseAPI.data.cursor,
      });
    } else {
      setListState({
        ...listState,
        hasMore: false,
        loading: false,
      });
    }
  }, [listState, setListState, id]);

  const sendMessage = useCallback(async () => {
    try {
      await ChatsFactory.apiChatOperatorPost({
        body: state.value,
        dialog_id: id,
      });
    } finally {
      setState({
        submitting: false,
        value: "",
      });
    }
  }, [state, setState, id]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setState({
        ...state,
        value: e.target.value,
      });
    },
    [state],
  );

  const handleSubmit = useCallback(
    () => {
      if (!state.value) {
        return;
      }

      setListState({
        ...listState,
        chats: [],
        cursor: undefined,
      });

      setState({
        ...state,
        submitting: true,
      });

      sendMessage();
    },
    // eslint-disable-next-line
    [state, setState, setListState, listState],
  );

  const { data, loading } = useAxios(
    ChatsFactory.apiChatDialogsIdGet,
    false,
    id,
  );

  // eslint-disable-next-line
  const observer = useRef<any>();

  const lastMessageReceived = useCallback(
    (node) => {
      if (listState.loading) {
        return;
      }
      if (observer.current) {
        observer?.current?.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && listState.hasMore) {
          const lastChat = listState.chats.pop();
          if (lastChat) {
            setState({ ...state, submitting: true });
            listState.chats.push(lastChat);
            setListState({ ...listState, cursor: lastChat.id?.toString() });
            setState({ ...state, submitting: false });
          }
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    // eslint-disable-next-line
    [listState.chats, listState.loading, listState.hasMore],
  );

  if (!data) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }

  if (loading) {
    return <Skeleton active={true} />;
  }

  return (
    <Workspace noRefresh withBack title={data.user.email ?? ""}>
      <div style={{ background: "white" }}>
        <div className={styles.container}>
          {listState.chats.length !== 0 && (
            <List
              className={styles.pagination}
              loading={listState.loading}
              dataSource={listState.chats}
              renderItem={(item, index) => {
                if (listState.chats.length - 1 === index) {
                  return (
                    <div ref={lastMessageReceived}>
                      <List.Item>
                        <List.Item.Meta description={item.body} />
                      </List.Item>
                    </div>
                  );
                }

                if (!item.author) {
                  return null;
                }

                const { first_name, middle_name, last_name } = item.author;

                return (
                  <Comment
                    className={styles.message}
                    author={cred(first_name, middle_name, last_name)}
                    avatar={
                      <Avatar
                        src={`/api/file/${item.author?.image_id}/download`}
                        alt={cred(first_name, middle_name, last_name)}
                      />
                    }
                    content={<p>{item.body}</p>}
                    datetime={
                      <Tooltip title={formatDate(item.created_at)}>
                        <span>{formatDate(item.created_at)}</span>
                      </Tooltip>
                    }
                  />
                );
              }}
            />
          )}
        </div>
        <Comment
          content={
            <Editor
              onChange={handleChange}
              onSubmit={handleSubmit}
              value={state.value}
            />
          }
        />
      </div>
    </Workspace>
  );
};

const Editor: FC<{
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit?: () => void;
  submitting?: boolean;
  value?: string;
}> = ({ onChange, onSubmit, submitting, value }) => {
  const { t } = useTranslation("Comments");

  return (
    <div className={styles.editor}>
      <Form.Item>
        <Input.TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          loading={submitting}
          onClick={onSubmit}
          type="primary"
        >
          {t("add_comment")}
        </Button>
      </Form.Item>
    </div>
  );
};

export const name = "chats:show";

export const pageComponent: FC<PageProps> = (props) => {
  return (
    <AuthConsumer>
      {({ user }) => {
        return (
          <RoleSwitch
            role={user.role}
            perform={name}
            yes={() => <ChatPage {...props} user={user} />}
            no={() => <Unauthorized />}
          />
        );
      }}
    </AuthConsumer>
  );
};
