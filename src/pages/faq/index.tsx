import React, { FC, useCallback, useState } from "react";
import Editor from "react-markdown-editor-lite";
import { Button } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import RoleSwitch from "@lib/components/RoleSwitch";
import { useTranslation, Workspace } from "@providers";
import { AuthConsumer } from "@providers/authContext";
import PrettyFAQ from "Home/FAQ";

import FAQ from "components/FAQ";

const Actions: FC<{ onSubmit: () => Promise<void>; loading: boolean }> = ({
  onSubmit,
  loading,
}) => {
  const { t } = useTranslation("FAQ");

  return (
    <Button
      type="primary"
      onClick={onSubmit}
      loading={loading}
      icon={<SaveOutlined />}
    >
      {t("save")}
    </Button>
  );
};

const FAQPage: FC = () => {
  const [loading, setLoading] = useState(false);

  // const {data, loading} = useAxios() ... API CALL TODO

  const { t } = useTranslation("FAQ");

  const editorRef = React.useRef<Editor>(null);

  const onSubmit = useCallback(async () => {
    try {
      setLoading(true);
      console.log((editorRef as React.RefObject<Editor>).current?.getMdValue());
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      // onRefetch
    }
  }, [editorRef]);

  return (
    <AuthConsumer>
      {({ user }) => {
        return (
          <RoleSwitch
            role={user.role}
            perform="faq:pretty"
            yes={() => <PrettyFAQ />}
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
                  text={`###  Heading`}
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

export const name = "faq:index";

export default FAQPage;
