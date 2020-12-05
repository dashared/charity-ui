import { ReactNode } from "react";
import { RouteDescriptor, SettableResponseProperties } from "@curi/types";

import NotFound from "../../pages/_notFound";

import { buildRoutes } from "./utils";

interface ResolveResult {
  component: ReactNode;
}

// TODO: better regexp for pages to ignore util pages
const context = require.context("../../pages", true, /\.\/[^_]*.tsx$/);

function buildSubRoute(
  file: string,
  path: string,
  name: string,
): RouteDescriptor {
  const { default: importedComponent, name: importedName } = context(file);

  return {
    path,
    name: importedName || name,
    resolve(): Promise<ResolveResult> {
      // TODO: check if this can be async
      return Promise.resolve({
        component: importedComponent,
      });
    },
    respond({ resolved }): SettableResponseProperties {
      const { component } = resolved as ResolveResult;
      return { body: component };
    },
  };
}

const appRoutes = buildRoutes(context.keys(), buildSubRoute);

const utilRoutes: Array<RouteDescriptor> = [
  {
    name: "NotFound",
    path: "(.*)",
    respond(): SettableResponseProperties {
      return { body: NotFound };
    },
  },
];

export default [...appRoutes, ...utilRoutes];
