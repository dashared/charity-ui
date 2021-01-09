import React, { FC } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { ConfigProvider as AntdConfigProvider } from "antd";
// static imports aren't perfect for locales
import ru from "antd/lib/locale/ru_RU";
import { Response } from "@curi/types";
import Auth from "@lib/components/Auth";
import { transliterate } from "@lib/utils";
import { closeRightPanel } from "reducer/workspace";

import { init as i18nInit } from "./i18n";
import { store } from "./redux";
import { init as routerInit, Router, router } from "./router";

// i18n reexports
export { default as i18n } from "i18next";
export { useTranslation } from "react-i18next";

// router reexports
export { useResponse, useActive } from "@curi/react-dom";
export { router } from "./router";
export interface PageProps {
  response: Response;
}

// Redux reexports
export { useDispatch, useSelector, useStore, shallowEqual } from "react-redux";
export { useActions } from "./redux";

// Helpers
export { default as Workspace } from "../Layout/Workspace/index";

const Provider: FC = ({ children }) => {
  return (
    <AntdConfigProvider locale={ru}>
      <ReduxProvider store={store}>
        <Auth>
          <Router>{children}</Router>
        </Auth>
      </ReduxProvider>
    </AntdConfigProvider>
  );
};

router.observe(() => {
  store.dispatch(closeRightPanel());
});

function setupGlobalInfo(info: APP_INFO): void {
  window.APP = {
    name: transliterate(info.name),
  };
}

export const init = async (info: APP_INFO): Promise<void> => {
  setupGlobalInfo(info);
  await Promise.all([i18nInit(), routerInit()]);
};

export default Provider;
