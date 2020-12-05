import React from "react";

import meta from "../package.json";

export const logoSmall = "LOGO";

export const logoLarge = "LARGE LOGO";

export const nameString = "AppName";

export const name = (
  <>
    Система <b>{nameString}</b>
  </>
);

const suffix = process.env.CI_PIPELINE_ID || "dev";
export const version = `${meta.version}.${suffix}`;
