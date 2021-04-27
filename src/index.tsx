import React from "react";
import ReactDOM from "react-dom";
import { init } from "@providers";

import App from "./App";
import { nameString } from "./appInfo";

const rootEl = document.getElementById("root");

init({ name: nameString }).then(() => {
  ReactDOM.render(<App />, rootEl);
});
