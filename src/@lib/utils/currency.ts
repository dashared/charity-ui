import { UtilsMoneyJson } from "@generated";

import { NO_DATA_PLACEHOLDER } from "./meta";

export function format(apiValue: UtilsMoneyJson | undefined): string {
  if (!apiValue) {
    return NO_DATA_PLACEHOLDER;
  }

  const { currency, denominator, numerator } = apiValue;

  return `${numerator ?? 0 / (denominator ?? 0)} ${currency}`;
}
