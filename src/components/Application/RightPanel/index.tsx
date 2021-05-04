import React, { FC, useCallback } from "react";
import { toInteger } from "lodash";
import {
  Button,
  Card,
  Col,
  Divider,
  Empty,
  List,
  Row,
  Skeleton,
  Statistic,
  Tag,
  Typography,
} from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { CheckOutlined, CloseCircleOutlined } from "@ant-design/icons";
import {
  DonationRequestReviewResponseReviewStatusEnum as ReviewStatus,
  DonationRequestSingleReviewStatusSingleReviewStatusEnum as SingleReviewStatus,
  DonationRequestSubmitReviewInputIsReadyEnum as IsReadyEum,
} from "@generated";
import { fullName } from "@lib/utils/name";
import { notify } from "@lib/utils/notification";
import { useTranslation } from "@providers";
import { AuthConsumer } from "@providers/authContext";
import useAxios, { DonationRequestFactory } from "@providers/axios";

const { Paragraph } = Typography;

const StatusTag: FC<{ status?: ReviewStatus }> = ({ status }) => {
  const { t } = useTranslation("Application");

  let color;

  switch (status) {
    case ReviewStatus.Accepted:
      color = "green";
      break;
    case ReviewStatus.Rejected:
      color = "red";
      break;
    case ReviewStatus.NotViewed:
      color = "gold";
      break;
  }

  return <Tag color={color}>{t(`ReviewStatus.${status}`)}</Tag>;
};

const SingleReviewSpan: FC<{ status?: SingleReviewStatus }> = ({ status }) => {
  const { t } = useTranslation("Application");
  let emoji;

  switch (status) {
    case SingleReviewStatus.Accepted:
      emoji = "👍🏻";
      break;
    case SingleReviewStatus.Rejected:
      emoji = "👎🏻";
      break;
    case SingleReviewStatus.NotViewed:
      emoji = "⏳";
      break;
  }

  return (
    <span>
      {emoji} {t(`ReviewStatus.${status}`)}
    </span>
  );
};

const RightPanel: FC<{ id: number }> = ({ id }) => {
  const { t } = useTranslation("Application");

  const { data, loading, refetchQuery } = useAxios(
    DonationRequestFactory.apiDonationRequestIdGetAllReviewersGet,
    undefined,
    id,
  );

  const voteAPI = useCallback(
    async (vote: IsReadyEum) => {
      try {
        await DonationRequestFactory.apiDonationRequestIdSubmitReviewPost(id, {
          id: toInteger(id.toString()),
          review_status: vote,
        });

        notify(t("$views.rightPanel.success_vote"), "success");
      } catch (e) {
        notify(t("$views.rightPanel.error_vote"), "error");
      } finally {
        refetchQuery();
      }
    },
    [t, id, refetchQuery],
  );

  if (!data) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }

  if (loading) {
    return <Skeleton active={true} />;
  }

  return (
    <AuthConsumer>
      {({ user }) => {
        //const canVote = data.reviewers?.[0];
        const canVote = data.reviewers?.find(
          (element) => element.manager?.id === user.uuid,
        );
        const alreadyVoted =
          canVote?.single_review_status !== SingleReviewStatus.NotViewed;

        return (
          <Card
            title={t("$views.rightPanel.title")}
            bordered={false}
            extra={<StatusTag status={data.review_status} />}
          >
            <Row gutter={16}>
              <Col span={8}>
                <Statistic
                  title={t("$views.rightPanel.for")}
                  value={data.accepted_count}
                  prefix={"👍🏻"}
                  suffix={`/ ${data.total_count}`}
                />
                {canVote && !alreadyVoted && (
                  <Button
                    style={{ marginTop: 16 }}
                    type="primary"
                    onClick={() => voteAPI(IsReadyEum.Accepted)}
                  >
                    {t("$views.rightPanel.vote_for")}
                  </Button>
                )}
              </Col>
              <Col span={8}>
                <Statistic
                  title={t("$views.rightPanel.against")}
                  value={data.rejected_count}
                  prefix={"👎🏻"}
                  suffix={`/ ${data.total_count}`}
                />
                {canVote && !alreadyVoted && (
                  <Button
                    style={{ marginTop: 16 }}
                    type="default"
                    danger
                    onClick={() => voteAPI(IsReadyEum.Rejected)}
                  >
                    {t("$views.rightPanel.vote_against")}
                  </Button>
                )}
              </Col>
              <Col span={8}>
                <Statistic
                  title={t("$views.rightPanel.not_voted")}
                  value={data.not_viewed_count}
                  prefix={"⏳"}
                  suffix={`/ ${data.total_count}`}
                />
              </Col>

              {alreadyVoted &&
                canVote?.single_review_status ===
                  SingleReviewStatus.Accepted && (
                  <Col style={{ marginTop: "16px" }} span={24}>
                    <Paragraph style={{ marginBottom: "0px" }}>
                      <CheckOutlined style={{ color: "green" }} />{" "}
                      {t("vote_text", { id })}
                    </Paragraph>
                  </Col>
                )}

              {alreadyVoted &&
                canVote?.single_review_status ===
                  SingleReviewStatus.Rejected && (
                  <Col style={{ marginTop: "16px" }} span={24}>
                    <Paragraph style={{ marginBottom: "0px" }}>
                      <CloseCircleOutlined style={{ color: "red" }} />{" "}
                      {t("vote_text_reject", { id })}
                    </Paragraph>
                  </Col>
                )}
            </Row>

            <Divider />
            <span>{t("reviewers")}</span>
            <List
              itemLayout="horizontal"
              dataSource={data.reviewers}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={`/api/file/${item.manager?.image_id}/download`}
                      />
                    }
                    description={fullName(
                      item.manager?.first_name,
                      item.manager?.middle_name,
                      item.manager?.last_name,
                    )}
                    title={
                      <SingleReviewSpan status={item.single_review_status} />
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        );
      }}
    </AuthConsumer>
  );
};

export default RightPanel;
