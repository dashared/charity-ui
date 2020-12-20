import React, { FC } from "react";
import { Empty, Skeleton } from "antd";
import { DefaultApiFactory } from "@generated";
import { PageProps } from "@providers";
import useAxios from "@providers/axios";

import ApplicationView from "components/Application/View";

const ApplicationPage: FC<PageProps> = ({ response }) => {
  const id = response.params.id as number;

  const { data, loading } = useAxios(
    DefaultApiFactory(undefined).donationRequestIdGet,
    id,
  );

  console.log(data, loading);

  if (!data) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }

  if (loading) {
    return <Skeleton active={loading} />;
  }

  return <ApplicationView donation={data} />;
};

export default ApplicationPage;
