import React, { FC, useCallback, useState } from "react";
import Elm from "react-elm-components";
import Editor from "react-markdown-editor-lite";
import { Button } from "antd";
import RoleSwitch from "@lib/components/RoleSwitch";
import { notify } from "@lib/utils/notification";
import { useTranslation, Workspace } from "@providers";
import { AuthConsumer } from "@providers/authContext";
import useAxios, { CharityFactory } from "@providers/axios";
import FaqElm from "Elm/FAQ.elm";

// import PrettyFAQ from "Home/FAQ";
import FAQ from "components/FAQ";

const Actions: FC<{ onSubmit: () => Promise<void>; loading: boolean }> = ({
  onSubmit,
  loading,
}) => {
  const { t } = useTranslation("FAQ");

  return (
    <Button type="primary" onClick={onSubmit} loading={loading}>
      {t("save")}
    </Button>
  );
};

const FAQPage: FC = () => {
  const [loading, setLoading] = useState(false);

  const { data, refetchQuery } = useAxios(
    CharityFactory.apiCharityFaqGet,
    false,
  );

  const { t } = useTranslation("FAQ");

  const editorRef = React.useRef<Editor>(null);

  const onSubmit = useCallback(async () => {
    try {
      setLoading(true);
      const text = (editorRef as React.RefObject<Editor>).current?.getMdValue();
      await CharityFactory.apiCharityFaqPatch({ faq: text });

      notify(t("update_success"), "success");
    } catch (e) {
      console.log(e);
      notify(t("update_error"), "error");
    } finally {
      setLoading(false);
      await refetchQuery();
    }
  }, [editorRef, refetchQuery, t]);

  return (
    <AuthConsumer>
      {({ user }) => {
        return (
          <RoleSwitch
            role={user.role}
            perform="faq:pretty"
            yes={() => (
              <Elm
                key={data?.faq}
                src={FaqElm.Elm.Elm.FAQ}
                flags={{
                  faq: data?.faq ?? "",
                }}
              />
            )}
            no={() => (
              <Workspace
                noRefresh
                title={t("title")}
                actions={
                  <RoleSwitch
                    role={user.role}
                    perform="faq:edit"
                    yes={() => (
                      <Actions onSubmit={onSubmit} loading={loading} />
                    )}
                  />
                }
              >
                <FAQ
                  role={user.role}
                  text={data?.faq ?? ""}
                  editorRef={editorRef}
                />
              </Workspace>
            )}
          />
        );
      }}
    </AuthConsumer>
  );
};

export const name = "fund:faq-index";

export default FAQPage;
