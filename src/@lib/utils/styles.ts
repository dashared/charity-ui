import { isFunction, map } from "lodash";
import classnames from "classnames";

type StyleModule = Record<string, string>;

type State = Record<string, boolean | undefined>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function bindStyles<T extends (...args: any[]) => State>(
  styles: StyleModule,
  stateFn?: T,
) {
  return (...args: Parameters<T>): string => {
    if (!isFunction(stateFn)) {
      return "";
    }

    return classnames(
      map(stateFn(...args), (isActive, state) => isActive && styles[state]),
    );
  };
}
