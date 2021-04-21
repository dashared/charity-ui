import React, { FC, useCallback, useRef } from "react";
import { Button, Card, Empty, Skeleton } from "antd";
import { NewsInput } from "@generated";
import RoleSwitch from "@lib/components/RoleSwitch";
import { notify } from "@lib/utils/notification";
import { PageProps, router, useTranslation, Workspace } from "@providers";
import { AuthConsumer } from "@providers/authContext";
import useAxios, { NewsFactory } from "@providers/axios";
import Unauthorized from "pages/_unauthorized";

import NewsForm, { NewsFormHandler } from "components/News";

const EditNewsPage: FC<PageProps> = ({ response }) => {
  const { t } = useTranslation("News");

  const id = response.params.id as string;

  const handlers = useRef<NewsFormHandler>(null);

  const { data, loading } = useAxios(NewsFactory.apiNewsIdGet, undefined, id);

  const onEdit = useCallback(
    (values: NewsInput) => {
      NewsFactory.apiNewsIdPatch(id, {
        ...values,
      })
        .then(() => {
          notify(t("$views.editSuccess"), "success");
          router.navigate({ url: router.url({ name: "news:index" }) });
        })
        .catch((e) => {
          console.error(e);
          notify(t("$views.editError"), "error");
        });
    },
    [t, id],
  );

  if (loading) {
    return <Skeleton active={loading} />;
  }

  if (!data) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }

  return (
    <Workspace
      title={t("editTitle")}
      noRefresh
      withBack
      actions={
        <Button type="primary" onClick={() => handlers.current?.submit()}>
          {t("$views.buttons.edit")}
        </Button>
      }
    >
      <Card>
        <NewsForm ref={handlers} onSubmit={onEdit} initial={data} />
      </Card>
    </Workspace>
  );
};

export const name = "news:edit";

export const pageComponent: FC<PageProps> = (props) => {
  return (
    <AuthConsumer>
      {({ user }) => {
        return (
          <RoleSwitch
            role={user.role}
            perform={name}
            yes={() => <EditNewsPage {...props} />}
            no={() => <Unauthorized />}
          />
        );
      }}
    </AuthConsumer>
  );
};
