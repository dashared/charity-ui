import React, { FC, Suspense } from "react";
import Provider, { useTranslation } from "@providers";

import { getToken, onMessageListener } from "./firebase";
import Layout from "./Layout";

const App: FC = () => {
  const { t } = useTranslation();
  const loadingMessage = <div>{t("loading")} </div>;

  getToken();

  onMessageListener()
    .then((payload) => {
      console.log(payload);
    })
    .catch((err) => console.log("failed: ", err));

  return (
    <Suspense fallback={loadingMessage}>
      <Provider>
        <Layout />
      </Provider>
    </Suspense>
  );
};

export default App;
