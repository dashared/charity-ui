import React from "react";

import meta from "../package.json";

export const logoSmall = "Charity";

export const logoLarge = "Charity CRM";

export const nameString = "Charity";

export const name = (
  <>
    Система <b>{nameString}</b>
  </>
);

const suffix = process.env.CI_PIPELINE_ID || "dev";
export const version = `${meta.version}.${suffix}`;
