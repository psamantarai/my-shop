import React, { useContext } from "react";
import "./welcome.scss";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import { CheckOpeningBalance } from "../../context/CheckOpeningBalanceContext/CheckOpeningBalanceContext";
const Welcome = ({ setCount }) => {
  return (
    <div className="welcome">
      <div className="container">
        <h1>WELCOME</h1>
        <div className="set-opening-balance">
          <p>Set Opening Balance</p>
          <ArrowCircleRightRoundedIcon
            className="btn"
            onClick={(e) => {
              setCount(1);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
