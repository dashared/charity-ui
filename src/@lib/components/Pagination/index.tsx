import React, { MutableRefObject, ReactNode, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Empty, Result as DisplayResult, Skeleton } from "antd";
import Pagination, { PaginationProps } from "antd/lib/pagination";
import useAxios, { PageData as ModelsPageData } from "@providers/axios";
import { AxiosResponse } from "axios";
import classnames from "classnames";
import i18n from "i18next";

import styles from "./styles.module.less";

type RestProps = Omit<
  PaginationProps,
  | "current"
  | "defaultCurrent"
  | "defaultPageSize"
  | "pageSize"
  | "total"
  | "showSizeChanger"
  | "showQuickJumper"
  | "showTotal"
  | "onChange"
  | "onShowSizeChange"
>;

type FullProps<Variables, Result, Single> = PaginatedQueryProps<
  Variables,
  Result,
  Single
> &
  RestProps;

type PaginationState = {
  currentPage: number;
  size: number;
};

type PaginationHookState = PaginationState & {
  onCurrentChange: PaginationProps["onChange"];
  onPageSizeChange: PaginationProps["onShowSizeChange"];
};

export type PaginatedResult<T> = {
  total: number | null;
  entries: T[];
};

export type StateRef = {
  page: number;
  size: number;
} | null;

type PaginatedQueryProps<Variables, Result, Single> = {
  noInfo?: boolean;
  className?: string;
  paginationClassName?: string;
  refetch?: boolean;
  // eslint-disable-next-line
  requestQuery: (variables: any) => Promise<AxiosResponse<Result>>;
  variables?: Omit<Variables, "page" | "size">;
  stateRef?: MutableRefObject<StateRef>;
  initialPage?: number;
  initialSize?: number;
  render: (
    entries: PaginatedResult<Single>["entries"],
    total: PaginatedResult<Single>["total"],
  ) => ReactNode;
  onResult?: (queryResult: Result) => void;
  onPaginationState?: (state: PaginationState) => void;
};

/**
 * Pagination resume, generates string from total and current scope
 *
 * @param total
 * @param scope [from, to]
 */
function showTotal(total: number, [from, to]: [number, number]): string {
  return i18n.t("Pagination.showTotal", { total, from, to });
}

/**
 * Extracts entries and total using provided reduce option
 *
 * @param data raw query result
 */
function grabPaginatedResult<V, R, S>(data: R): PaginatedResult<S> {
  let entries: S[] = [];

  // eslint-disable-next-line
  const { page = null, ...rest } = data as any; // TODO

  // can be less hacky if pagination has fixed list field name
  if (Object.keys(rest).length === 1) {
    entries = rest[Object.keys(rest)[0]];
  }

  return {
    total: (page as ModelsPageData).totalElements ?? 0,
    entries,
  };
}

/**
 *  Actual Pagination component without wrapper for className
 */
function InnerPaginatedQuery<
  Variables extends Record<string, unknown>,
  Result,
  Single
>({
  noInfo = false,
  paginationClassName,
  refetch = undefined,
  requestQuery,
  initialPage = 1,
  initialSize = 10,
  stateRef,
  variables,
  onResult,
  render,
  onPaginationState,
  ...rest
}: PaginatedQueryProps<Variables, Result, Single> &
  RestProps): JSX.Element | null {
  // pagination state handlers

  const { t } = useTranslation("Common");

  const [page, onCurrentChange] = useState(initialPage);
  const [size, onPageSizeChange] = useState(initialSize);

  console.log(page, size);

  // save state above if needed
  useEffect(() => {
    if (stateRef !== undefined) {
      stateRef.current = { page, size };
    }
    onPaginationState?.({ currentPage: page, size });
  }, [stateRef, onPaginationState, page, size]);

  const { data, loading, error } = useAxios(
    requestQuery,
    refetch,
    ...Object.values(
      variables
        ? { ...variables, page: page - 1, size, sort: "" }
        : { page: page - 1, size, sort: "" },
    ),
  );

  // propagate result above if needed
  useEffect(() => {
    if (data) {
      onResult?.(data);
    }
  }, [onResult, data]);

  if (error) {
    // TODO : make more userfriendly and consice
    return <DisplayResult status="500" title="500" subTitle={t("error")} />;
  }

  // Handle data
  if (loading || !data) {
    return <Skeleton active={loading} />;
  }

  // Grab total and entries
  const { total, entries } = grabPaginatedResult<Variables, Result, Single>(
    data,
  );

  // Handle bad response
  if (total === null || total === 0) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }

  return (
    <>
      {render(entries, total)}

      <Pagination
        {...rest}
        className={classnames(styles.pagination, paginationClassName)}
        total={total}
        current={page}
        pageSize={size}
        pageSizeOptions={rest.pageSizeOptions ?? ["10", "20", "50"]}
        showSizeChanger={total > size}
        showQuickJumper={total > size}
        showTotal={noInfo ? () => "" : showTotal}
        onChange={onCurrentChange}
        onShowSizeChange={onPageSizeChange}
      />
    </>
  );
}

export default function PaginatedQuery<
  Variables extends Record<string, unknown>,
  Result,
  Single
>(props: FullProps<Variables, Result, Single>): JSX.Element {
  return (
    <div className={props.className}>
      <InnerPaginatedQuery {...props} />
    </div>
  );
}
