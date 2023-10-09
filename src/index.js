import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ServiceContextProvider } from "./context/AllService/ServicesContext";
import { CheckOpeningBalanceProvider } from "./context/CheckOpeningBalanceContext/CheckOpeningBalanceContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CheckOpeningBalanceProvider>
      <ServiceContextProvider>
        <App />
      </ServiceContextProvider>
    </CheckOpeningBalanceProvider>
  </React.StrictMode>
);
