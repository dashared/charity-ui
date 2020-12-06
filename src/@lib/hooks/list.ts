import { useCallback, useEffect, useMemo, useState } from "react";
import { isNil, update } from "lodash/fp";

type Index = number;

type ListSelectionState<T> = {
  target?: T | null;
  selected: T[];
  isTarget: (index: Index | undefined) => boolean;
  isSelected: (index: Index | undefined) => boolean;
  onElementClick: (event: React.MouseEvent | MouseEvent, index: Index) => void;
  setList: React.Dispatch<React.SetStateAction<T[]>>;
  getSelectedIndeces: () => Index[];
  reset: () => void;
};

type SelectedState = boolean[];

function buildStateFromList<T>(
  list: T[],
  from?: Index,
  to?: Index,
): SelectedState {
  if (isNil(to)) {
    if (isNil(from)) {
      return list.map(() => false);
    }

    return list.map((e, index) => index >= from);
  }
  const selectedStart = Math.min(from ?? 0, to);
  const selectedEnd = Math.max(from ?? 0, to);
  return list.map((e, index) => index >= selectedStart && index <= selectedEnd);
}

function isCtrl(event: React.MouseEvent | MouseEvent): boolean {
  return event.ctrlKey || event.metaKey;
}

function isShift(event: React.MouseEvent | MouseEvent): boolean {
  return event.shiftKey;
}

type ListSelectionProps = {
  external?: boolean;
};

export function useListSelection<T>(
  list: T[] = [],
  { external = false }: ListSelectionProps = {},
): ListSelectionState<T> {
  const [innerList, setList] = useState<T[]>(list);

  const actualList = useMemo(() => (external ? list : innerList), [
    external,
    list,
    innerList,
  ]);

  const [selected, setSelected] = useState<SelectedState>(() =>
    buildStateFromList(actualList),
  );

  const [target, setTarget] = useState<Index | undefined>();

  const reset = useCallback((): void => {
    setSelected(buildStateFromList(actualList));
    setTarget(undefined);
  }, [actualList]);

  const toggleElement = (index: Index): void => {
    setSelected(update([index], (x) => !x));
  };

  const isTarget = useCallback(
    (index: Index | undefined): boolean =>
      target !== undefined && target === index,
    [target],
  );

  const isSelected = useCallback(
    (index: Index | undefined = -1): boolean => selected[index] ?? false,
    [selected],
  );

  const onElementClick = useCallback(
    (event: React.MouseEvent | MouseEvent, index: Index): void => {
      const currentTarget = target;

      // Click with queue
      if (isCtrl(event)) {
        event.preventDefault();

        toggleElement(index);
        setTarget(index);
        return;
      }

      // From-to select
      if (isShift(event)) {
        event.preventDefault();

        setSelected(buildStateFromList(actualList, currentTarget, index));
        return;
      }

      // Usual single click
      if (currentTarget === index) {
        reset();
      } else {
        setSelected(buildStateFromList(actualList, index, index));
        setTarget(index);
      }
    },
    [actualList, target, reset],
  );

  const getSelectedIndeces = useCallback(
    () =>
      selected.reduce(
        (ac, value, index) => (value ? [...ac, index] : ac),
        [] as Index[],
      ),
    [selected],
  );

  useEffect(reset, [actualList, reset]);

  return {
    target: useMemo(() => (isNil(target) ? null : actualList[target]), [
      actualList,
      target,
    ]),
    selected: useMemo(
      () => actualList.filter((element, index) => selected[index]),
      [actualList, selected],
    ),
    isTarget,
    isSelected,
    onElementClick,

    getSelectedIndeces,
    setList,
    reset,
  };
}
