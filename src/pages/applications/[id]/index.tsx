import React, { FC, useCallback, useRef } from "react";
import { Empty, Skeleton } from "antd";
import { DonationRequestBodyAvailableStatusesEnum as ApplicationStatus } from "@generated";
import RoleSwitch from "@lib/components/RoleSwitch";
import { PageProps, useTranslation, Workspace } from "@providers";
import { AuthConsumer } from "@providers/authContext";
import useAxios, { DonationRequestFactory } from "@providers/axios";
import Redirect from "pages/_redirect";

import { ChangeButton } from "components/Application/ActionForm";
import ApplicationView from "components/Application/View";

const Actions: FC<{
  currentStatus: ApplicationStatus;
  undoTransition?: boolean;
  applicationId: number;
  availiableStatuses: ApplicationStatus[];
  onRefetch: () => Promise<void>;
}> = ({
  availiableStatuses,
  applicationId,
  currentStatus,
  undoTransition,
  onRefetch,
}) => {
  return (
    <ChangeButton
      id={applicationId}
      currentStatus={currentStatus}
      undoTransition={undoTransition}
      refetch={onRefetch}
      availiableStatuses={availiableStatuses}
    />
  );
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
    DonationRequestFactory.apiDonationRequestIdGet,
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
          currentStatus={(data.status as unknown) as ApplicationStatus}
          undoTransition={data.undo_transition}
          applicationId={data.id ?? 0}
          availiableStatuses={data.available_statuses ?? []}
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

export const pageComponent: FC<PageProps> = (props) => (
  <AuthConsumer>
    {({ user }) => {
      return (
        <RoleSwitch
          role={user.role}
          perform={name}
          yes={() => <ApplicationPage {...props} />}
          no={() => <Redirect name="home"></Redirect>}
        />
      );
    }}
  </AuthConsumer>
);
