import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ServiceContextProvider } from "./context/AllService/ServicesContext";
import { UserContextProvider } from "./context/UserContext";
import { BalanceContextProvider } from "./context/BalanceContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <ServiceContextProvider>
        <BalanceContextProvider>
          <App />
        </BalanceContextProvider>
      </ServiceContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
