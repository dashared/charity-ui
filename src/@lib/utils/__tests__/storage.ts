/* eslint-disable no-undef */
import KVStorage from "../kvstorage";

const value = {
  foo: 1,
  bar: "bar",
};

test("KVStorage", () => {
  const S = new KVStorage("local", "test");
  expect(S.get("1")).toEqual(undefined);

  S.set("2", 1);
  expect(S.get("2")).toEqual(1);

  S.set("3", value);
  expect(S.get("3")).toEqual(value);

  S.remove("3");
  expect(S.get("3")).toEqual(undefined);

  S.clear();
  expect([S.get("1"), S.get("2"), S.get("3")]).toStrictEqual([
    undefined,
    undefined,
    undefined,
  ]);
});
