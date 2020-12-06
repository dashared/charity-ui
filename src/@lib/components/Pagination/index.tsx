import React, { MutableRefObject, ReactNode, useEffect, useState } from "react";
import { Empty, Skeleton } from "antd";
import Pagination, { PaginationProps } from "antd/lib/pagination";
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
  limit: number;
  offset: number;
};

type PaginationHookState = PaginationState & {
  current: number;
  pageSize: number;
  onCurrentChange: PaginationProps["onChange"];
  onPageSizeChange: PaginationProps["onShowSizeChange"];
};

export type PaginatedResult<T> = {
  total: number | null;
  entries: T[];
};

export type StateRef = {
  limit: number;
  offset: number;
} | null;

type PaginatedQueryProps<Variables, Result, Single> = {
  noInfo?: boolean;
  className?: string;
  paginationClassName?: string;
  requestQuery: (
    limit: number,
    offset: number,
  ) => Promise<AxiosResponse<Result>>;
  variables?: Omit<Variables, "limit" | "offset">;
  stateRef?: MutableRefObject<StateRef>;
  initialLimit?: number;
  initialOffset?: number;
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
 * Just wrap handling limit and offset to page and size for Ant component.
 *
 * @param initialLimit
 * @param initialOffset
 */
function useAntPagination(
  initialLimit: number,
  initialOffset: number,
): PaginationHookState {
  const [limit, setLimit] = useState(initialLimit);
  const [offset, setOffset] = useState(initialOffset);

  const current = Math.floor(offset / limit) + 1;

  return {
    limit,
    offset,
    current,
    pageSize: limit,
    onCurrentChange(page, size = initialLimit) {
      const newOffset = (page - 1) * size;
      setOffset(newOffset);
    },
    onPageSizeChange(page, size) {
      setOffset(0);
      setLimit(size);
    },
  };
}

/**
 * Extracts entries and total using provided reduce option
 *
 * @param data raw query result
 */
function grabPaginatedResult<V, R, S>(data: R): PaginatedResult<S> {
  let entries: S[] = [];

  // eslint-disable-next-line
  const { total = null, ...rest } = data as any; // TODO

  // can be less hacky if pagination has fixed list field name
  if (Object.keys(rest).length === 1) {
    entries = rest[Object.keys(rest)[0]];
  }

  return {
    total,
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
  //
  requestQuery,
  initialLimit = 10,
  initialOffset = 0,
  stateRef,
  // variables,
  // onResult,
  render,
  onPaginationState,
  ...rest
}: PaginatedQueryProps<Variables, Result, Single> &
  RestProps): JSX.Element | null {
  // pagination state handlers
  const {
    limit,
    offset,
    current,
    pageSize,
    onCurrentChange,
    onPageSizeChange,
  } = useAntPagination(initialLimit, initialOffset);

  // save state above if needed
  useEffect(() => {
    if (stateRef !== undefined) {
      stateRef.current = { limit, offset };
    }
    onPaginationState?.({ limit, offset });
  }, [stateRef, onPaginationState, limit, offset]);

  const [data, setData] = useState<Result | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    setLoading(true);

    requestQuery(limit, offset)
      .then((r) => {
        setData(r.data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle data
  if (error || loading || !data) {
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
        current={current}
        pageSize={pageSize}
        pageSizeOptions={rest.pageSizeOptions ?? ["10", "20", "50"]}
        showSizeChanger={total > pageSize}
        showQuickJumper={total > pageSize}
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
