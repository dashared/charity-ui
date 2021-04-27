import React, { FC } from "react";
import { Empty, Skeleton } from "antd";
import RoleSwitch from "@lib/components/RoleSwitch";
import { useTranslation, Workspace } from "@providers";
import { AuthConsumer } from "@providers/authContext";
import useAxios, { CategoryFactory } from "@providers/axios";
import Redirect from "pages/_redirect";

import CategoryPage from "components/Category";

const CategoriesPage: FC = () => {
  const { t } = useTranslation("Category");

  const { data, loading } = useAxios(
    CategoryFactory.apiCategoriesGet,
    undefined,
  );

  console.log(data);

  if (!data) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }
  if (loading) {
    return <Skeleton active={loading} />;
  }

  return (
    <Workspace title={t("title")} noRefresh>
      <CategoryPage data={data} />
    </Workspace>
  );
};

export const pageComponent: FC = () => (
  <AuthConsumer>
    {({ user }) => {
      return (
        <RoleSwitch
          role={user.role}
          perform="categories:index"
          yes={() => <CategoriesPage />}
          no={() => <Redirect name="home"></Redirect>}
        />
      );
    }}
  </AuthConsumer>
);
