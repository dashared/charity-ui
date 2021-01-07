import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Avatar, Button, Card, Comment, Empty, Form, Input } from "antd";
import { CommentProps } from "antd/lib/comment";
import { IdComponent } from "@typings/component";
import moment from "moment";

import styles from "./styles.module.less";

const { TextArea } = Input;

/** Comment list */
const CommentList: FC<{ comments: CommentProps[] }> = ({ comments }) => {
  const { t } = useTranslation("Comments");

  // eslint-disable-next-line
  const messagesEndRef = useRef<any>(null);

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [comments]);

  return (
    <Card title={t("title", { count: 5 })} bordered={false}>
      <div className={styles.list}>
        {comments.length === 0 && (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
        {comments.map((item, index) => (
          <Comment key={index} {...item} />
        ))}
        <div id="end" ref={messagesEndRef} />
      </div>
    </Card>
  );
};

const Editor: FC<{
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  submitting: boolean;
  value: string;
}> = ({ onChange, onSubmit, submitting, value }) => {
  const { t } = useTranslation("Comments");

  return (
    <>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
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
    </>
  );
};

export const CommentTab: IdComponent = () => {
  const [state, setState] = useState<{
    comments: CommentProps[];
    submitting: boolean;
    value: string;
  }>({
    comments: [],
    submitting: false,
    value: "",
  });

  const handleSubmit = useCallback(() => {
    if (!state.value) {
      return;
    }

    setState({
      ...state,
      submitting: true,
    });

    setTimeout(() => {
      setState({
        submitting: false,
        value: "",
        comments: [
          ...state.comments,
          {
            author: "Han Solo",
            avatar:
              "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            content: <p>{state.value}</p>,
            datetime: moment().fromNow(),
          },
        ],
      });
    }, 1000);
  }, [state, setState]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setState({
        ...state,
        value: e.target.value,
      });
    },
    [state],
  );

  const { comments, submitting, value } = state;

  return (
    <>
      {<CommentList comments={comments} />}
      <Comment
        avatar={
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
        }
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
          />
        }
      />
    </>
  );
};
