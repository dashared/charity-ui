import React, { FC } from "react";
import { Button, Result } from "antd";
import { AuthConsumer } from "@providers/authContext";

import Redirect from "./_redirect";

const Unauthorized: FC = () => {
  return (
    <AuthConsumer>
      {({ authenticated }) => {
        if (authenticated) {
          return (
            <Result
              status="403"
              title="403"
              subTitle="Sorry, you are not authorized to access this page."
              extra={<Button type="primary">Back Home</Button>}
            />
          );
        } else {
          return <Redirect name="login" />;
        }
      }}
    </AuthConsumer>
  );
};

export default Unauthorized;
