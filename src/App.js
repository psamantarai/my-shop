import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./pages/home/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Service from "./pages/service/Service";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Transaction from "./pages/transaction/Transaction";
import Dashboard from "./pages/dashboard/Dashboard";
import Report from "./pages/report/Report";
import "./layout.scss";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Dashboard />} />
            <Route path="transaction" element={<Transaction />} />
            <Route path="service" element={<Service />} />
            <Route path="reports" element={<Report />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
