import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Card, Comment, Empty, Form, Input } from "antd";
import { CommentProps } from "antd/lib/comment";
import { UserUser } from "@generated";
import { formatDate } from "@lib/utils";
import { DonationRequestFactory } from "@providers/axios";
import { IdComponent } from "@typings/component";

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
    <Card title={t("title", { count: comments.length })} bordered={false}>
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

export const CommentTab: IdComponent = ({ id }) => {
  const { t } = useTranslation("Users");

  const [state, setState] = useState<{
    comments: CommentProps[];
    submitting: boolean;
    value: string;
  }>({
    comments: [],
    submitting: false,
    value: "",
  });

  const formatName = (author?: UserUser): string => {
    return `${author?.first_name} ${author?.last_name} (${t(
      `Role.${author?.role}`,
    )})`;
  };

  const fetchAPI = useCallback(
    async () => {
      const {
        data,
      } = await DonationRequestFactory.apiDonationRequestIdCommentsGet(id);

      if (data) {
        setState({
          ...state,
          comments: data.map((comment) => {
            return {
              author: formatName(comment.author),
              content: comment.text,
              datetime: formatDate(comment.created_at),
            };
          }),
        });
      }
    },
    // eslint-disable-next-line
    [id, setState, state],
  );

  const sendMessage = useCallback(async () => {
    try {
      await DonationRequestFactory.apiDonationRequestIdStatusPatch(id, {
        comment: state.value,
      });
    } finally {
      setState({
        submitting: false,
        value: "",
        comments: [],
      });
    }
  }, [state, setState, id]);

  useEffect(
    () => {
      if (!state.submitting) {
        fetchAPI();
      }
    },
    // eslint-disable-next-line
    [state.submitting],
  );

  const handleSubmit = useCallback(
    () => {
      if (!state.value) {
        return;
      }

      setState({
        ...state,
        submitting: true,
      });

      sendMessage();
    },
    // eslint-disable-next-line
    [state, setState],
  );

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
