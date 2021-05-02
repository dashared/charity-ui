import { CategoryCategory as Category, CategoryCategory } from "@generated";

export function format(
  lang: "ru" | "en" | string | undefined,
  category?: Category,
): string {
  if (lang === "ru") {
    return category?.rus ?? "-";
  }

  if (lang === "en") {
    return category?.eng ?? "-";
  }

  return "-";
}

export function formatMany(
  lang: "run" | "en" | string | undefined,
  categories?: CategoryCategory[],
): string {
  if (!categories) {
    return "-";
  }

  if (categories?.length === 0) {
    return "-";
  }

  return categories
    .map((item) => {
      return format(lang, item);
    })
    .join(", ");
}
