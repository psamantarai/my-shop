import React, { useContext } from "react";
import "./account.scss";
import amountFormat from "../../utils/textConverter";
import { CheckOpeningBalance } from "../../context/CheckOpeningBalanceContext/CheckOpeningBalanceContext";
const Account = () => {
  const { setIsNewUser, setIsPresent, isPresent, isNewUser } = useContext(
    CheckOpeningBalance
  );
  const handleClick = () => {
    if (isNewUser) {
      // createOpeningBlance();
    } else if (!isNewUser && !isPresent) {
      //setNewDayOpeningBalance();
    } else if (!isNewUser && isPresent) {
      // updateCurrentDayOpeningBalance();
    }
  };
  return (
    <div className="account">
      <div className="account-container">
        <div className="up">
          <h2>Set Opening Balance</h2>
          <div className="formItem">
            <label htmlFor="opening-balance">Opening Balance</label>
            <input type="number" id="opening-balance" />
          </div>
          <button onClick={setIsPresent(true)}>Set</button>
        </div>
        <div className="down">
          <div className="prev-day-stats">
            <p>
              Yesterday Closing Balance: <span>{amountFormat(5000)}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
