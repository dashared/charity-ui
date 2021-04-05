import React, { FC, Suspense } from "react";
import Provider, { useTranslation } from "@providers";
import { requestFirebaseNotificationPermission } from "@providers/firebase";

import Layout from "./Layout";

const App: FC = () => {
  const { t } = useTranslation();
  const loadingMessage = <div>{t("loading")} </div>;

  requestFirebaseNotificationPermission()
    .then((firebaseToken) => {
      // eslint-disable-next-line no-console
      console.log(firebaseToken);
    })
    .catch((err) => {
      return err;
    });

  return (
    <Suspense fallback={loadingMessage}>
      <Provider>
        <Layout />
      </Provider>
    </Suspense>
  );
};

export default App;
