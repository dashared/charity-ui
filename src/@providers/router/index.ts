import { createRouterComponent } from "@curi/react-dom";
import { createRouter, prepareRoutes } from "@curi/router";
import { browser } from "@hickory/browser";

import pages from "./pageRoutes";

const routes = prepareRoutes(pages);

export const router = createRouter(browser, routes);

export function init(): Promise<void> {
  return new Promise((resolve) => router.once(() => resolve()));
}

export const Router = createRouterComponent(router);
