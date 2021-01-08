import React, { FC, useCallback, useRef } from "react";
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

type RefType = {
  onRefetch: () => Promise<void>;
};

const ApplicationPage: FC<PageProps> = ({ response }) => {
  const id = response.params.id as string;

  const { t } = useTranslation("Application");

  const refetchRef = useRef<RefType | null>(null);

  const onRefetchButton = useCallback(async () => {
    refetchRef.current?.onRefetch();
  }, []);

  const { data, loading, refetchQuery } = useAxios(
    DonationRequestFactory.donationRequestIdGet,
    undefined,
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
      title={t("$views.title", { id: data.id, title: data.title })}
      actions={
        <Actions
          applicationId={data.id ?? 0}
          status={data.status as ApplicationStatus}
          onRefetch={onRefetchButton}
        />
      }
    >
      <ApplicationView
        donation={data}
        onRefetch={refetchQuery}
        ref={refetchRef}
      />
    </Workspace>
  );
};

export const name = "applications:show";

export default ApplicationPage;
