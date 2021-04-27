import React, { FC, useCallback, useRef } from "react";
import { Button, Card } from "antd";
import { NewsInput } from "@generated";
import RoleSwitch from "@lib/components/RoleSwitch";
import { notify } from "@lib/utils/notification";
import { router, useTranslation, Workspace } from "@providers";
import { AuthConsumer } from "@providers/authContext";
import { NewsFactory } from "@providers/axios";
import Unauthorized from "pages/_unauthorized";

import NewsForm, { NewsFormHandler } from "components/News";

const CreateNewsPage: FC = () => {
  const { t } = useTranslation("News");

  const handlers = useRef<NewsFormHandler>(null);

  const onCreate = useCallback(
    (values: NewsInput) => {
      NewsFactory.apiNewsPost({
        ...values,
      })
        .then(() => {
          notify(t("$views.createSuccess"), "success");
          router.navigate({ url: router.url({ name: "news:index" }) });
        })
        .catch((e) => {
          console.error(e);
          notify(t("$views.createError"), "error");
        });
    },
    [t],
  );

  return (
    <Workspace
      title={t("createTitle")}
      noRefresh
      withBack
      actions={
        <Button type="primary" onClick={() => handlers.current?.submit()}>
          {t("$views.buttons.add")}
        </Button>
      }
    >
      <Card>
        <NewsForm ref={handlers} onSubmit={onCreate} initial={undefined} />
      </Card>
    </Workspace>
  );
};

export const name = "news:create";

export const pageComponent: FC = () => {
  return (
    <AuthConsumer>
      {({ user }) => {
        return (
          <RoleSwitch
            role={user.role}
            perform={name}
            yes={() => <CreateNewsPage />}
            no={() => <Unauthorized />}
          />
        );
      }}
    </AuthConsumer>
  );
};
