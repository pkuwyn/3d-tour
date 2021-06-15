import { CssBaseline } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Ion } from "cesium";
Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwMTgzOTUxOS02MjI3LTQ4NTktYjI5YS0xOWY0ZDExMmI5YTMiLCJpZCI6NTg0OSwic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU0NDQ0MjkyNn0.Hbp3qTx_zUoCwJyHDLGpMAuHWqLZW8YPEMRjneTZvIk";

ReactDOM.render(
  <>
    <CssBaseline></CssBaseline>
    <App />
  </>,
  document.getElementById("root")
);
