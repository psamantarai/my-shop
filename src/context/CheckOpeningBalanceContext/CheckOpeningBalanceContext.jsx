import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const CheckOpeningBalance = createContext();

export function CheckOpeningBalanceProvider({ children }) {
  const [isPresent, setIsPresent] = useState(null);
  const [isNewUser, setIsNewUser] = useState(null);

  const fetchIsNewUser = async () => {
    await axios
      .get("http://localhost:8000/api/accounts/check")
      .then((res) => {
        setIsPresent(res.data.isPresent);
        setIsNewUser(res.data.newUser);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchIsNewUser();
  }, []);
  return (
    <CheckOpeningBalance.Provider
      value={{
        isNewUser,
        setIsNewUser,
        isPresent,
        setIsPresent,
        fetchIsNewUser,
      }}
    >
      {children}
    </CheckOpeningBalance.Provider>
  );
}
