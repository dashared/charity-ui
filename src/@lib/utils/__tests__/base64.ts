/* eslint-disable no-undef */
import { decode as d, encode as e } from "../base64";

test("base64 encode", () => {
  expect(e("test string")).toEqual("dGVzdCUyMHN0cmluZw==");
  expect(e("♠")).toEqual("JUUyJTk5JUEw");
});

test("base64 decode", () => {
  expect(d("dGVzdCUyMHN0cmluZw==")).toEqual("test string");
  expect(d("JUUyJTk5JUEw")).toEqual("♠");
});

test("base64 full cycle", () => {
  expect(d(e("test string") ?? "")).toEqual("test string");
});
