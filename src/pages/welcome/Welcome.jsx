import React from "react";
import "./welcome.scss";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
const Welcome = () => {
  return (
    <div className="welcome">
      <div className="container">
        <h1>WELCOME</h1>
        <div className="set-opening-balance">
          <p>Set Opening Balance</p>
          <ArrowCircleRightRoundedIcon className="btn" />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
