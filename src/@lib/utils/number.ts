import { NO_DATA_PLACEHOLDER } from "./meta";

const numberFormatter = new Intl.NumberFormat("ru-ru");

export function format(apiValue: number | null | undefined): string {
  if (apiValue === null || apiValue === undefined) {
    return NO_DATA_PLACEHOLDER;
  }

  return numberFormatter.format(apiValue);
}
