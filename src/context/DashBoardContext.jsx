import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const DashBoardContext = createContext();

export const DashBoardContextProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const fetchDashBoardData = async () => {
    await axios
      .get("http://localhost:8000/api/accounts")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchDashBoardData();
  }, []);
  return (
    <DashBoardContext.Provider value={{ data, fetchDashBoardData }}>
      {children}
    </DashBoardContext.Provider>
  );
};
