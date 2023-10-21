import React, { useContext } from "react";
import "./welcome.scss";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";

const Welcome = ({ setCount }) => {
  return (
    <div className="welcome">
      <div className="container">
        <h1>WELCOME</h1>
        <div className="set-opening-balance">
          <p>Set Opening Balance</p>
          <ArrowCircleRightRoundedIcon
            className="btn"
            onClick={() => {
              setCount(1);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
