import Home from "./pages/home/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Service from "./pages/service/Service";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Transaction from "./pages/transaction/Transaction";
import Dashboard from "./pages/dashboard/Dashboard";
import Report from "./pages/report/Report";
import "./layout.scss";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";

import MultiStage from "./pages/MultiStage/MultiStage";

function App() {
  const { isPresent, isNewUser } = useContext(UserContext);
  const renderCheck = () => !(isPresent && !isNewUser);

  console.log(
    `isPresent : ${isPresent}  isNewUser: ${isNewUser}  logic: ${renderCheck()}`
  );
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={renderCheck() ? <MultiStage /> : <Home />}>
            <Route index element={<Dashboard />} />
            <Route path="transaction" element={<Transaction />} />
            <Route path="service" element={<Service />} />
            <Route path="reports" element={<Report />} />
          </Route>
        </Routes>
      </Router>

      <ToastContainer />
    </div>
  );
}

export default App;
