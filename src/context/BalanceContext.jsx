import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const BalanceContext = createContext();

export const BalanceContextProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const fetchBalanceData = async () => {
    await axios
      .get("http://localhost:8000/api/accounts/balance")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchBalanceData();
  }, []);
  return (
    <BalanceContext.Provider value={{ data, fetchBalanceData }}>
      {children}
    </BalanceContext.Provider>
  );
};
