import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ServiceContextProvider } from "./context/AllService/ServicesContext";
import { CheckOpeningBalanceProvider } from "./context/CheckOpeningBalanceContext/CheckOpeningBalanceContext";
import { DashBoardContextProvider } from "./context/DashBoardContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CheckOpeningBalanceProvider>
      <ServiceContextProvider>
        <DashBoardContextProvider>
          <App />
        </DashBoardContextProvider>
      </ServiceContextProvider>
    </CheckOpeningBalanceProvider>
  </React.StrictMode>
);
