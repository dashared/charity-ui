import React, { FC, useRef } from "react";
import { C as Single, CList, ProjectsApiFactory } from "@generated";
import PaginatedQuery, { StateRef } from "@lib/components/Pagination";
import RegistryTable from "@lib/components/RegistryTable";
import { useListSelection } from "@lib/hooks";

const FirstPage: FC = () => {
  const {
    isTarget,
    isSelected,
    onElementClick,
    setList,
  } = useListSelection<Single>();

  const paginationState = useRef<StateRef>(null);

  const columns = [
    {
      key: "someKey",
      name: "ColumnName",
      render(record: Single) {
        return record.name;
      },
    },
  ];

  return (
    <PaginatedQuery<{ limit: number; offset: number }, CList, Single>
      requestQuery={ProjectsApiFactory(undefined).getCounter}
      stateRef={paginationState}
      onResult={(result) => setList(Array.from(result.entries))}
      render={(entries) => (
        <RegistryTable
          entity="C"
          columns={columns}
          // TODO FIX this
          rows={entries.map((r) => {
            return { name: r.name };
          })}
          rowState={(record, index) => ({
            selected: isSelected(index),
            target: isTarget(index),
          })}
          onRecordClick={(event, record, index) => {
            if (index !== undefined) {
              onElementClick(event, index);
            }
          }}
        />
      )}
    />
  );
};

export default FirstPage;
