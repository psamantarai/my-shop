import React from "react";
import Service from "../service/Service";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./home.scss";
import Transaction from "../transaction/Transaction";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Home;
