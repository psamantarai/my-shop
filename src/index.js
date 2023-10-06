import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ServiceContextProvider } from "./context/AllService/ServicesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ServiceContextProvider>
      <App />
    </ServiceContextProvider>
  </React.StrictMode>
);
