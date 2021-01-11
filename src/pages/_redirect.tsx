import React, { FC } from "react";
import { router } from "@providers";
import { AuthConsumer } from "@providers/authContext";

import NotFound from "./_notFound";

const Redirect: FC<{ name?: string; component?: () => JSX.Element }> = ({
  name,
  component,
}) => {
  return (
    <AuthConsumer>
      {({ authenticated }) => {
        if (authenticated) {
          router.navigate({ url: router.url({ name }) });
        } else {
          router.navigate({ url: router.url({ name: "login:index" }) });
        }

        if (component) {
          return component();
        } else {
          return <NotFound />;
        }
      }}
    </AuthConsumer>
  );
};

export default Redirect;
