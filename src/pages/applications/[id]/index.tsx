import React, { FC } from "react";
import { Empty, Skeleton, Space } from "antd";
import { DefaultApiFactory } from "@generated";
import { PageProps, useTranslation, Workspace } from "@providers";
import useAxios from "@providers/axios";

import StartProcessingButton from "components/Application/Buttons/processing";
import SpamButton from "components/Application/Buttons/spam";
import { ApplicationStatus } from "components/Application/Status/tag";
import ApplicationView from "components/Application/View";

const Actions: FC<{ id: string; status: ApplicationStatus }> = ({
  id,
  status,
}) => {
  return (
    <Space>
      {<SpamButton applicationId={id} />}
      {status === ApplicationStatus.New && (
        <StartProcessingButton applicationId={id} />
      )}
    </Space>
  );
};

const ApplicationPage: FC<PageProps> = ({ response }) => {
  const id = response.params.id as string;

  const { t } = useTranslation("Application");

  const { data, loading } = useAxios(
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
      actions={
        <Actions id={data.id ?? ""} status={data.status as ApplicationStatus} />
      }
    >
      <ApplicationView donation={data} />
    </Workspace>
  );
};

export const name = "applications:show";

export default ApplicationPage;
