import React from "react";
import ReactDOM from "react-dom";
import { init } from "@providers";

import App from "./App";
import { nameString } from "./appInfo";
import * as serviceWorker from "./serviceWorker";

const rootEl = document.getElementById("root");

init({ name: nameString }).then(() => {
  ReactDOM.render(<App />, rootEl);
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
