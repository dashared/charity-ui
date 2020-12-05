/* eslint-disable no-undef */
import t from "../transliterate";

test("Transliteration", () => {
  expect(t("TEST")).toEqual("TEST");
  expect(t("♠♠♠")).toEqual("♠♠♠");
  expect(t("АБВ")).toEqual("ABV");
  expect(t("Сложна")).toEqual("Slozhna");
  expect(t("шщыяё")).toEqual("shschiyayo");
});
