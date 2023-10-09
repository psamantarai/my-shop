import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const CheckOpeningBalance = createContext();

export function CheckOpeningBalanceProvider({ children }) {
  const [isPresent, setIsPresent] = useState(true);

  const fetchOpeningBalance = async () => {
    await axios
      .get("http://localhost:8000/api/accounts/check")
      .then((res) => {
        if (res.data.success) {
          setIsPresent(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchOpeningBalance();
  }, []);
  return (
    <CheckOpeningBalance.Provider value={{ isPresent, setIsPresent }}>
      {children}
    </CheckOpeningBalance.Provider>
  );
}
