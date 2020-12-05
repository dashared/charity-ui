/* eslint-disable no-undef */
import { RouteDescriptor } from "@curi/types";

import { buildRoutes, filename, treeFromFilenames } from "../utils";

const CONF_1 = {
  pages: [
    "./first/[id].tsx",
    "./first/index.tsx",
    "./first/foo.tsx",
    "./index.tsx",
  ],
  tree: {
    index: { [filename]: "./index.tsx" },
    first: {
      "[id]": { [filename]: "./first/[id].tsx" },
      index: { [filename]: "./first/index.tsx" },
      foo: { [filename]: "./first/foo.tsx" },
    },
  },
  routes: [
    { name: "index", path: "", extra: { file: "./index.tsx" } },
    {
      name: "first:index",
      path: "first",
      extra: { file: "./first/index.tsx" },
      children: [
        { name: "first:foo", path: "foo", extra: { file: "./first/foo.tsx" } },
        { name: "first", path: ":id", extra: { file: "./first/[id].tsx" } },
      ],
    },
  ],
};

test("Tree builder", () => {
  expect(treeFromFilenames(CONF_1.pages)).toEqual(CONF_1.tree);
});

const builderMock = jest.fn(
  (file: string, path: string, name: string): RouteDescriptor => ({
    path,
    name,
    extra: { file },
  }),
);

const wrap = (x: Array<string>): Array<RouteDescriptor> =>
  buildRoutes(x, builderMock);

test("Routes builder", () => {
  expect(wrap(CONF_1.pages)).toEqual(CONF_1.routes);
  expect(builderMock.mock.calls.length).toBe(4);
});
