import React, { FC } from "react";
import { AuthConsumer } from "@providers/authContext";

import FAQ from "components/FAQ";

const FAQPage: FC = () => {
  // const {data, loading} = useAxios() ... API CALL TODO

  return (
    <AuthConsumer>
      {({ user }) => {
        return <FAQ role={user.role} text={"hello"} />;
      }}
    </AuthConsumer>
  );
};

export const name = "faq:index";

export default FAQPage;
