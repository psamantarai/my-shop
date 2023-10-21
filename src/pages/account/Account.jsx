import React, { useContext, useState } from "react";
import "./account.scss";
import amountFormat from "../../utils/textConverter";
import { CheckOpeningBalance } from "../../context/CheckOpeningBalanceContext/CheckOpeningBalanceContext";
import axios from "axios";
import { toast } from "react-toastify";
import { DashBoardContext } from "../../context/DashBoardContext";
const Account = ({ setCount }) => {
  const { isPresent, isNewUser, fetchIsNewUser } = useContext(
    CheckOpeningBalance
  );
  const { data, fetchDashBoardData } = useContext(DashBoardContext);
  console.log(data);
  const [openingBalance, setNewDayOpeningBalance] = useState(
    isNewUser ? 0 : data.balance
  );
  const setOpeningBalance = async () => {
    await axios
      .post("http://localhost:8000/api/accounts", {
        openingBalance,
      })
      .then((res) => {
        fetchIsNewUser();
        fetchDashBoardData();
        toast.success(res.data.success, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => {
        toast.error(err.response.data.error, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };
  const handleClick = () => {
    if (isNewUser) {
      const createOpeningBlance = async () => {
        await axios
          .post("http://localhost:8000/api/accounts/new_user", {
            openingBalance,
          })
          .then((res) => {
            fetchIsNewUser();
            fetchDashBoardData();
            toast.success(res.data.success, {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          })
          .catch((err) => {
            toast.error(err.response.data.error, {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          });
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
          <button onClick={handleClick}>Set</button>
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
