import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { useResponse, useRouter } from "@curi/react-dom";
import { NavigationDetails } from "@curi/types";
import { QueryObject, queryParse, queryStringify } from "@lib/utils/query";

type T = QueryObject;

/**
 * get @QueryObject from route location query
 *
 * @param value
 */
export function useLocationQuery(defaultValue: T = {}): T {
  const { response } = useResponse();

  const { query: queryString } = response.location;
  const value = isEmpty(queryString) ? defaultValue : queryParse(queryString);

  return value;
}

/**
 * Store limited @QueryObject synchronously with route location query
 *
 * @param value
 */
export function useLocationQueryEffect(
  value: T,
  method: NavigationDetails["method"] = "replace",
): void {
  const { response } = useResponse();
  const router = useRouter();

  const { pathname: currentPath } = response.location;

  useEffect(() => {
    const newQueryString = queryStringify(value);
    router.navigate({
      url: `${currentPath}?${newQueryString}`,
      method,
    });
  }, [value, router, currentPath, method]);
}

/**
 * Allows to work with limited @QueryObject as usual useState,
 * but stores it synchronously with route location query
 *
 * @param defaultValue
 */
export function useLocationQueryState(
  defaultValue: T = {},
  method: NavigationDetails["method"] = "replace",
): [T, Dispatch<SetStateAction<T>>] {
  const initialState = useLocationQuery(defaultValue);
  const [value, setValue] = useState<T>(initialState);

  useLocationQueryEffect(value, method);

  return [value, setValue];
}
