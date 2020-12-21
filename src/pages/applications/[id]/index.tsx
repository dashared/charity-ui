import React, { FC } from "react";
import { Button, Empty, Skeleton, Space } from "antd";
import { DefaultApiFactory } from "@generated";
import { PageProps, useTranslation, Workspace } from "@providers";
import useAxios from "@providers/axios";

import ApplicationView from "components/Application/View";

const Actions: FC = () => {
  const { t } = useTranslation("Application");

  return (
    <Space>
      <Button>{t("$views.button")}</Button>
    </Space>
  );
};

const ApplicationPage: FC<PageProps> = ({ response }) => {
  const id = response.params.id as number;

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
      title={t("$views.title", { id: data.id })}
      actions={<Actions />}
    >
      <ApplicationView donation={data} />
    </Workspace>
  );
};

export const name = "applications:show";

export default ApplicationPage;
