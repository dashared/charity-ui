import React, { useCallback, useMemo } from "react";
import { get, isFunction } from "lodash";
import { Table } from "antd";
import { ColumnsType, ColumnType, TableProps } from "antd/lib/table";
import { bindStyles, formatDate, formatNumber } from "@lib/utils";
import classnames from "classnames";
import i18n, { TFunction } from "i18next";

import styles from "./styles.module.less";

export type RegistryColumnConf<Element> = {
  key: string;
  title?: string;
  render?:
    | ColumnType<Element>["render"]
    | "Int"
    | "Boolean"
    | "String"
    | "Text"
    | "DateTime";
};

export type RegistryRowState = {
  selected?: boolean;
  target?: boolean;
};

export type RegistryTableProps<Element> = {
  entity: string;
  className?: string;
  headerClassName?: string;
  rowState?: (record: Element, index?: number) => RegistryRowState;
  rowClassName?:
    | string
    | ((record: Element, index?: number) => string | undefined);
  rowKey?: TableProps<Element>["rowKey"];
  columns: Array<RegistryColumnConf<Element>>;
  rows: Element[];
  expandable?: TableProps<Element>["expandable"];
  // Handlers
  onRecordClick?: (
    event: React.MouseEvent,
    record: Element,
    index?: number,
  ) => void;
};

function cellRenderer<Element>(
  t: TFunction,
  key: string,
  type: RegistryColumnConf<Element>["render"],
): ColumnType<Element>["render"] {
  switch (type) {
    case "Int":
      return (text, record) => formatNumber(get(record, key));
    case "Boolean":
      return (text, record) => get(record, key);
    case "String":
      return (text, record) => get(record, key);
    case "Text":
      return (text, record) => (get(record, key, "") as string).substr(0, 200);
    case "DateTime":
      return (text, record) => formatDate(get(record, key));

    default:
      return type;
  }
}

function buildSingleColumn<Element>(
  t: TFunction,
  column: RegistryColumnConf<Element>,
): ColumnType<Element> {
  const key = column.key;
  const title = column.title ?? t(column.key);
  const render = cellRenderer(t, key, column.render);

  return { key, title, render };
}

function buildColumns<Element>(
  entity: string,
  columns: Array<RegistryColumnConf<Element>>,
): ColumnsType<Element> {
  const t = i18n.getFixedT(null, entity);
  return columns.map((column) => buildSingleColumn(t, column));
}

function RegistryTable<Element extends Record<string, unknown>>({
  entity,
  className,
  headerClassName,
  rowState,
  rowClassName,
  rows,
  rowKey = "id",
  columns,
  // Handlers
  expandable,
  onRecordClick,
}: RegistryTableProps<Element>): JSX.Element {
  const COLUMNS = useMemo(() => buildColumns(entity, columns), [
    entity,
    columns,
  ]);

  const onHeaderRow = useCallback(
    () => ({
      className: classnames(styles.headerRow, headerClassName),
    }),
    [headerClassName],
  );

  const boundStyles = useMemo(() => bindStyles(styles, rowState), [rowState]);

  const onRow = useCallback(
    (record: Element, index?: number) => ({
      className: classnames(
        styles.row,
        boundStyles(record, index),
        isFunction(rowClassName) ? rowClassName(record, index) : rowClassName,
      ),
      onClick(event: React.MouseEvent): void {
        onRecordClick?.(event, record, index);
      },
      onMouseDown(event: React.MouseEvent): void {
        // prevent shift+click selection behavior
        event.preventDefault();
      },
    }),
    [boundStyles, rowClassName, onRecordClick],
  );

  return (
    <Table
      className={classnames(styles.table, className)}
      rowKey={rowKey}
      onHeaderRow={onHeaderRow}
      onRow={onRow}
      pagination={false}
      columns={COLUMNS}
      dataSource={rows}
      expandable={expandable}
    />
  );
}

export default RegistryTable;
