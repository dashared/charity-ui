import React, { FC } from "react";
import { router } from "@providers";
import { AuthConsumer } from "@providers/authContext";

import NotFound from "./_notFound";

const Redirect: FC<{ name?: string }> = ({ name }) => {
  return (
    <AuthConsumer>
      {({ authenticated }) => {
        if (authenticated) {
          console.log(authenticated);
          router.navigate({ url: router.url({ name }) });
        } else {
          router.navigate({ url: router.url({ name: "login:index" }) });
        }

        return <NotFound />;
      }}
    </AuthConsumer>
  );
};

export default Redirect;
