import React from "react";
import "./sidebar.scss";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <h1 className="logo">
          <Link to="/" className="link">
            Logo
          </Link>
        </h1>
        <div className="contents">
          <div className="items">
            <span>
              <Link to="/" className="link">
                Dashboard
              </Link>
            </span>
          </div>
          <div className="items">
            <span>
              <Link to="/transaction" className="link">
                Transaction
              </Link>
            </span>
          </div>
          <div className="items">
            <span>
              <Link to="/service" className="link">
                Service
              </Link>
            </span>
          </div>
          <div className="items">
            <span>
              <Link to="/reports" className="link">
                Reports
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
