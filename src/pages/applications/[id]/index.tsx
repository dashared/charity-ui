import React, { FC } from "react";
import { Empty, Skeleton, Space } from "antd";
import { DefaultApiFactory } from "@generated";
import { PageProps, useTranslation, Workspace } from "@providers";
import useAxios from "@providers/axios";

import {
  RequestChangesButton,
  RequireConfirmationButton,
  ReturnFromSpamButton,
  SpamButton,
  StartProcessingButton,
  StopProcessingButton,
} from "components/Application/Buttons";
import { ApplicationStatus } from "components/Application/Status/tag";
import ApplicationView from "components/Application/View";

const Actions: FC<{
  applicationId: string;
  status: ApplicationStatus;
  onRefetch: () => Promise<void>;
}> = (props) => {
  return (
    <Space>
      <SpamButton {...props} />
      <ReturnFromSpamButton {...props} />
      <StopProcessingButton {...props} />
      <RequestChangesButton {...props} />
      <StartProcessingButton {...props} />
      <RequireConfirmationButton {...props} />
    </Space>
  );
};

const ApplicationPage: FC<PageProps> = ({ response }) => {
  const id = response.params.id as string;

  const { t } = useTranslation("Application");

  const { data, loading, refetchQuery } = useAxios(
    DefaultApiFactory(undefined).donationRequestIdGet,
    id,
  );

  if (!data) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }

  if (loading) {
    return <Skeleton active={loading} />;
  }

  return (
    <Workspace
      withBack
      noRefresh
      title={t("$views.title", { id: 1, title: data.title })}
      // TODO: replace id: 1 after it's done in API https://www.notion.so/Human-readable-id-User-fa8d1bda3a11449781f924f1c187645e
      actions={
        <Actions
          applicationId={data.id ?? ""}
          status={data.status as ApplicationStatus}
          onRefetch={refetchQuery}
        />
      }
    >
      <ApplicationView donation={data} />
    </Workspace>
  );
};

export const name = "applications:show";

export default ApplicationPage;
