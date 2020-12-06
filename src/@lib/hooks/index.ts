import { useEffect } from "react";

import { nameString } from "../../appInfo";

export {
  useLocationQuery,
  useLocationQueryState,
  useLocationQueryEffect,
} from "./location";

export { usePrevious } from "./previous";
export { useListSelection } from "./list";
export { useDebounce } from "./debounce";

export function useDocumentTitle(title: string): void {
  useEffect(() => {
    document.title = `[${nameString}] ${title}`;

    return () => {
      document.title = `[${nameString}]`;
    };
  }, [title]);
}
