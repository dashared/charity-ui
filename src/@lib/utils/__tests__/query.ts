/* eslint-disable no-undef */
import { queryParse, queryStringify } from "../query";

const settings = {
  str: "test",
  flag: false,
  interval: {
    from: 0,
    to: 10,
  },
  tags: ["tag1", "tag2"],
  hide: undefined,
};

test("queryParse", () => {
  expect(queryParse("a=b&c=d")).toEqual({ a: "b", c: "d" });
  expect(queryParse("a=true")).toEqual({ a: true });
  expect(queryParse("a=")).toEqual({ a: "" });
  expect(queryParse("a")).toEqual({ a: null });
  expect(queryParse("a=1&a=2&a=3")).toEqual({ a: [1, 2, 3] });
  expect(queryParse("a.a=1&a.b=b")).toEqual({ a: { a: 1, b: "b" } });
});

test("queryStringify", () => {
  expect(queryStringify({ a: true }, false)).toEqual("a=true");
  expect(queryStringify({ a: "b", c: "d" }, false)).toEqual("a=b&c=d");
  expect(queryStringify({ a: [1, 2, 3] }, false)).toEqual("a=1&a=2&a=3");
  expect(queryStringify({ a: { a: 1, b: "b" } }, false)).toEqual("a.a=1&a.b=b");
  expect(queryStringify({ a: { a: [1, 2, 3] } }, false)).toEqual(
    "a.a=1&a.a=2&a.a=3",
  );
  expect(queryStringify(settings, false)).toEqual(
    "flag=false&interval.from=0&interval.to=10&str=test&tags=tag1&tags=tag2",
  );
});

test("marshall/unmarshall", () => {
  expect(queryParse(queryStringify(settings))).toEqual(settings);
});
