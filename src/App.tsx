import React, { FC, Suspense } from "react";
import Provider, { useTranslation } from "@providers";

import Layout from "./Layout";

const App: FC = () => {
  const { t } = useTranslation();
  const loadingMessage = <div>{t("loading")} </div>;

  return (
    <Suspense fallback={loadingMessage}>
      <Provider>
        <Layout />
      </Provider>
    </Suspense>
  );
};

export default App;
