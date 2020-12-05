// Позволяет импортировать имена классов из LESS module
// В идеале для каждого модуля можно указать конкретные экспортируемые имена.
declare module "*.module.less" {
  const classes: { [key: string]: string };
  export default classes;
}

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

type WrapperComponent<T> = (props: {
  className?: string;
  children: T;
}) => JSX.Element | null;
