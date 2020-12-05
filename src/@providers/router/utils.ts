import { map, reverse, set, sortBy, toPairs } from "lodash";
import { RouteDescriptor } from "@curi/types";

export const filename = Symbol("filename");

type PageInfo = {
  [filename]: string;
};

type PageTree = {
  [key: string]: PageTree | PageInfo;
};

function cleanPath(str: string): string {
  return str.replace(/(^|\/)index$/, "").replace(/\[([^\]]*)\]/g, ":$1");
}

function cleanName(str: string): string {
  return str.replace(/\[(.*)\]/, "");
}

type RouteBuilder = (
  file: string,
  path: string,
  name: string,
) => RouteDescriptor;

type BuilderContext = {
  build: RouteBuilder;
};

export function buildFromTree(
  this: BuilderContext,
  from: PageTree | PageInfo,
  paths: Array<string> = [],
  names: Array<string> = [],
): RouteDescriptor {
  // Util function for child routes
  const buildChildrenRoutes = (tree: PageTree): Array<RouteDescriptor> => {
    // Sort pairs from tree by key, basically moving templated routes down
    const sorted = reverse(sortBy(toPairs(tree), ["0"]));

    return map(sorted, ([path, value]) => {
      const addedName = cleanName(path);
      const addedPath = cleanPath(path);

      return buildFromTree.call(
        this,
        value,
        [...paths, addedPath],
        [...names, addedName],
      );
    });
  };

  // Actual function body
  const pathTail = paths.length > 0 ? paths[paths.length - 1] : "";

  const currentName = names.filter(Boolean).join(":");

  if ((from as PageInfo)[filename]) {
    const leaf = from as PageInfo;

    return this.build(leaf[filename], pathTail, currentName);
  }

  if (paths.length === 0) {
    const tree = from as PageTree;
    // Ephemeral root
    const resultEntry: RouteDescriptor = {
      name: "",
      path: "",
    };

    resultEntry.children = buildChildrenRoutes(tree);

    return resultEntry;
  }

  const { index, ...rest } = from as PageTree;

  const resultEntry: RouteDescriptor = index
    ? this.build(
        (index as PageInfo)[filename],
        pathTail,
        `${currentName}:index`,
      )
    : {
        name: `${currentName}:index`,
        path: pathTail,
      };

  resultEntry.children = buildChildrenRoutes(rest);

  return resultEntry;
}

export function treeFromFilenames(files: Array<string>): PageTree {
  const result = {};

  files.forEach((file) => {
    const centerPart = file.replace(/^\.\//, "").replace(/.tsx$/, "");

    set(result, centerPart.split("/"), { [filename]: file });
  });

  return result;
}

export function buildRoutes(
  files: Array<string>,
  builder: RouteBuilder,
): Array<RouteDescriptor> {
  const tree = treeFromFilenames(files);
  return buildFromTree.call({ build: builder }, tree).children ?? [];
}
