import React, { FC, useCallback, useRef } from "react";
import Elm from "react-elm-components";
import { Button, Empty, Skeleton } from "antd";
import { CharityFundInput } from "@generated";
import RoleSwitch from "@lib/components/RoleSwitch";
import { notify } from "@lib/utils/notification";
import { useTranslation, Workspace } from "@providers";
import { AuthConsumer } from "@providers/authContext";
import useAxios, { CharityFactory } from "@providers/axios";
import FundElm from "Elm/Fund.elm";

import EditFundDescription, {
  CharityInfoHandler,
} from "components/Fund/Description/edit";
import { FundDescriptionView } from "components/Fund/Description/view";

const FundDescription: FC = () => {
  const { t } = useTranslation("Fund");

  const { data, loading } = useAxios(CharityFactory.apiCharityGet);

  const handlers = useRef<CharityInfoHandler>(null);

  const onSubmit = useCallback(
    async (values: CharityFundInput) => {
      try {
        await CharityFactory.apiCharityPatch({
          ...values,
        });

        notify(t("update_success"), "success");
      } catch (e) {
        console.error(e);
        notify(t("update_error"), "error");
      }
    },
    [t],
  );

  if (!data) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }

  if (loading) {
    return <Skeleton active={loading} />;
  }

  return (
    <AuthConsumer>
      {({ user }) => {
        return (
          <RoleSwitch
            role={user.role}
            perform="fund:description-pretty" // visitor or not
            yes={() => <Elm src={FundElm.Elm.Elm.Fund} flags={data} />}
            no={() => (
              <Workspace
                noRefresh
                title={t("title")}
                actions={
                  <RoleSwitch
                    role={user.role}
                    perform="fund:description-edit" // has permission to edit or not
                    yes={() => (
                      <Button
                        type="primary"
                        onClick={() => handlers.current?.submit()}
                      >
                        {t("save")}
                      </Button>
                    )}
                  />
                }
              >
                <RoleSwitch
                  role={user.role}
                  perform="fund:description-edit"
                  yes={() => (
                    <EditFundDescription
                      ref={handlers}
                      onSubmit={onSubmit}
                      initialInfo={data}
                    />
                  )}
                  no={() => <FundDescriptionView data={data} />}
                />
              </Workspace>
            )}
          />
        );
      }}
    </AuthConsumer>
  );
};

export const name = "fund:description";

export default FundDescription;
