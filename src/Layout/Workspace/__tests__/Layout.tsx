/* eslint-disable no-undef */
import React from "react";
import { render } from "@testing-library/react";

import Footer from "../Footer";

const randomString = (): string => Math.random().toString(36).substring(2);

test("renders footer", () => {
  const name = randomString();
  const version = randomString();
  const { getByText } = render(
    <Footer logo={<span>{name}</span>} version={version} />,
  );
  const nameText = getByText(new RegExp(name));
  const versionText = getByText(new RegExp(version));
  expect(nameText).toBeInTheDocument();
  expect(versionText).toBeInTheDocument();
});
