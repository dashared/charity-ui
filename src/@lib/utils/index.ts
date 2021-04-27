import { format as formatDate, UnixTime } from "./date";

export { queryParse, queryStringify } from "./query";
export { copyTextToClipboard } from "./clipboard";
export { encode as base64encode, decode as base64decode } from "./base64";
export { format as formatDate, formatDateTime } from "./date";
export { format as formatMoney } from "./currency";
export { format as formatNumber } from "./number";
export { format as formatCategory } from "./category";
export { default as transliterate } from "./transliterate";
export { default as KVStorage } from "./kvstorage";
export { bindStyles } from "./styles";
export { format as formatString } from "./list_data";

export { NO_DATA_PLACEHOLDER, NO_IMAGE_PLACEHOLDER } from "./meta";

type User = {
  name: string;
};

export function formatSystemInfo(
  date: UnixTime | null | undefined,
  user: User | null | undefined,
): string {
  if (user === undefined || user === null) {
    return formatDate(date);
  }

  if (date === undefined) {
    return user.name;
  }

  return `${user.name} - ${formatDate(date)}`;
}
