import React, { useState } from "react";
import Account from "../account/Account";

const Dashboard = () => {
  const [count, setCount] = useState(0);
  if (count == 1) {
    return <Account setCount={setCount} />;
  }
  return (
    <div>
      <button onClick={() => setCount(1)}>Update Balance</button>
    </div>
  );
};

export default Dashboard;
