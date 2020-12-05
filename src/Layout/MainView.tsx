import React, { PureComponent, ReactNode } from "react";
import { ResponseConsumer } from "@curi/react-dom";

// PureComponent здесь чтобы избавиться от переотрисовки при изменении состояния лейаута выше
export default class MainView extends PureComponent {
  render(): JSX.Element {
    return (
      <ResponseConsumer>
        {({ response }): ReactNode => {
          const { body: Body } = response;

          return <Body response={response} />;
        }}
      </ResponseConsumer>
    );
  }
}
