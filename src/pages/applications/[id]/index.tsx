import React, { FC } from "react";
import { Empty, Skeleton } from "antd";
import { PageProps, useTranslation, Workspace } from "@providers";
import useAxios, { DonationRequestFactory } from "@providers/axios";

import ActionButtons from "components/Application/Buttons";
import { ApplicationStatus } from "components/Application/Status/tag";
import ApplicationView from "components/Application/View";

const Actions: FC<{
  applicationId: number;
  status: ApplicationStatus;
  onRefetch: () => Promise<void>;
}> = (props) => {
  return <ActionButtons {...props} />;
};

const ApplicationPage: FC<PageProps> = ({ response }) => {
  const id = response.params.id as string;

  const { t } = useTranslation("Application");

  const { data, loading, refetchQuery } = useAxios(
    DonationRequestFactory.donationRequestIdGet,
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
          applicationId={data.id ?? 0}
          status={data.status as ApplicationStatus}
          onRefetch={refetchQuery}
        />
      }
    >
      <ApplicationView donation={data} onRefetch={refetchQuery} />
    </Workspace>
  );
};

export const name = "applications:show";

export default ApplicationPage;
