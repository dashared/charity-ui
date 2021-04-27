/* eslint-disable */
// Позволяет импортировать имена классов из LESS module
// В идеале для каждого модуля можно указать конкретные экспортируемые имена.
declare module "*.module.less" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.elm" {
  export const Elm: any;
}

declare module "react-elm-components" {
  import { Component } from "react";

  type ElmProps = {
    src: any;
    flags?: any;
    ports?: any;
    key?: string;
  };
  class Elm extends Component<ElmProps> {}
  export = Elm;
}

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

type WrapperComponent<T> = (props: {
  className?: string;
  children: T;
}) => JSX.Element | null;
