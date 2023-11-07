import React, { useContext, useState } from "react";
import "./account.scss";
import amountFormat from "../../utils/textConverter";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { BalanceContext } from "../../context/BalanceContext";
import { showToast } from "../../utils/showToast.js";
const Account = ({ setCount }) => {
  const { isPresent, isNewUser, fetchIsNewUser } = useContext(UserContext);
  const { data, fetchBalanceData } = useContext(BalanceContext);

  const [openingBalance, setNewDayOpeningBalance] = useState(data.balance);
  const setOpeningBalance = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/accounts", {
        openingBalance,
      });
      fetchIsNewUser();
      fetchBalanceData();
      showToast("success", res.data.success);
    } catch (error) {
      showToast("error", error.response.data.message || error.message);
    }
  };
  const handleClick = () => {
    if (isNewUser) {
      const createOpeningBlance = async () => {
        try {
          const res = await axios.post(
            "http://localhost:8000/api/accounts/new_user",
            { openingBalance }
          );
          fetchIsNewUser();
          fetchBalanceData();
          showToast(res.data.success);
        } catch (error) {
          showToast("error", error.response.data.message || error.message);
        }
      };
      createOpeningBlance();
    } else if (!isNewUser && !isPresent) {
      setOpeningBalance();
    } else if (!isNewUser && isPresent) {
      setOpeningBalance();
      setCount(0);
    }
  };
  return (
    <div className="account">
      <div className="account-container">
        <div className="up">
          <h2>{isPresent === true ? "Update" : "Set"} Opening Balance</h2>
          <div className="formItem">
            <label htmlFor="opening-balance">Opening Balance</label>
            <input
              type="number"
              id="opening-balance"
              value={openingBalance}
              onChange={(e) => setNewDayOpeningBalance(e.target.value)}
            />
          </div>
          <div
            className="btn-div"
            style={{
              display: "flex",
              marginTop: "10px",
              width: "80%",
              gap: "10px",
            }}
          >
            <button onClick={handleClick}>Set</button>
            {!isNewUser && isPresent && (
              <button onClick={() => setCount(0)}>Cancel</button>
            )}
          </div>
        </div>
        <div className="down">
          <div className="prev-day-stats">
            {isNewUser === true ? (
              <p>Create your opening balance.</p>
            ) : isPresent === false ? (
              <p>Yesterday closing balance {amountFormat(data.balance)}.</p>
            ) : (
              <p>Current day balance: {amountFormat(data.balance)}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
