import { UtilsMoneyJson } from "@generated";

import { NO_DATA_PLACEHOLDER } from "./meta";

export function format(apiValue: UtilsMoneyJson | undefined): string {
  if (!apiValue) {
    return NO_DATA_PLACEHOLDER;
  }

  const { currency, denominator, numerator } = apiValue;

  return `${numerator ?? 0 / (denominator ?? 0)} ${currency}`;
}

export function moneyCollected(
  approved?: UtilsMoneyJson,
  collected?: UtilsMoneyJson,
): number | undefined {
  if (!approved) {
    return undefined;
  }

  const approvedNumber =
    (approved?.numerator ?? 0) / (approved?.denominator ?? 1);
  const collectedNumber =
    (collected?.numerator ?? 0) / (collected?.denominator ?? 1);

  console.log(approved, collected);

  if (approvedNumber < collectedNumber) {
    return 100;
  }

  return Math.ceil((collectedNumber / approvedNumber) * 100);
}
