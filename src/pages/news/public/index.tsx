import React, { FC } from "react";
import Elm from "react-elm-components";
import RoleSwitch from "@lib/components/RoleSwitch";
import { AuthConsumer } from "@providers/authContext";
import NewsPublicElm from "Elm/News.elm";
import Redirect from "pages/_redirect";

const PublicNewsPage: FC = () => {
  return (
    <Elm
      src={NewsPublicElm.Elm.Elm.News}
      flags={{ baseUrl: process.env.REACT_APP_API_URL }}
    />
  );
};

export const name = "news:public";

export const pageComponent = (): JSX.Element => {
  return (
    <AuthConsumer>
      {({ user }) => {
        return (
          <RoleSwitch
            role={user.role}
            perform={name}
            yes={() => <PublicNewsPage />}
            no={() => <Redirect name="home" />}
          />
        );
      }}
    </AuthConsumer>
  );
};
