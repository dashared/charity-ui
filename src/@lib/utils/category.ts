import { CategoryCategory as Category } from "@generated";

export function format(
  lang: "ru" | "en" | string | undefined,
  category?: Category,
): string {
  if (lang === "ru") {
    return category?.rus ?? "-";
  }

  if (lang === "eng") {
    return category?.eng ?? "-";
  }

  return "-";
}
