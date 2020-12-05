import { ReactNode } from "react";
import { useResponse } from "@curi/react-dom";
import { queryStringify } from "@lib/utils";

export type MenuEntry = {
  display: ReactNode;
  key?: string;
  name?: string;
  params?: {
    [key: string]: string;
  };
  // TODO: proper support for nested leftbar menu
  nested?: Array<MenuEntry>;
};

export type MenuKeys = {
  selectedKeys: Array<string>;
  defaultOpenKeys: Array<string>;
};

export function entryToKey(
  entry: Pick<MenuEntry, "name" | "params" | "key">,
): string {
  const { name, params, key } = entry;
  return key ?? queryStringify({ name, params }, false);
}

function buildKeyCache(
  menuConf: Array<MenuEntry>,
): { [key: string]: Array<string> } {
  const keyCache: { [key: string]: Array<string> } = {};

  function openKeys(entry: MenuEntry, path: Array<string> = []): void {
    const { nested = [], name } = entry;
    const key = entryToKey(entry);

    if (name) {
      keyCache[key] = path;
    }

    if (nested.length > 0) {
      nested.forEach((subentry) => openKeys(subentry, [...path, key]));
    }
  }

  menuConf.forEach((entry) => openKeys(entry));

  return keyCache;
}

export function buildUseMenuKeys(menuConf: Array<MenuEntry>): () => MenuKeys {
  const openKeysCache = buildKeyCache(menuConf);
  return () => {
    const { response } = useResponse();
    const key = entryToKey(response);

    return {
      selectedKeys: [key],
      defaultOpenKeys: openKeysCache[key] ?? [],
    };
  };
}
