import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";

ReactDOM.render(
  <React.StrictMode>
    {/* <ThemeContext.Provider value={{ color: "blue" }}>
      <App />
    </ThemeContext.Provider> */}
    {/* 其中一种做法 */}
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
