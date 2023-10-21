import React, { useState } from "react";
import "./MultiStage.scss";
import Welcome from "../welcome/Welcome";
import Account from "../account/Account";

const MultiStage = () => {
  const [count, setCount] = useState(0);
  console.log(count);
  const navigatePage = () => {
    if (count === 0) {
      return <Welcome setCount={setCount} />;
    } else {
      return <Account />;
    }
  };
  return <div className="multistage">{navigatePage()}</div>;
};

export default MultiStage;
