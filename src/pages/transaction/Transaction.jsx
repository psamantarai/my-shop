import Select from "react-select";
import "./transaction.scss";
import { useContext, useEffect, useState } from "react";
import { ServicesContext } from "../../context/AllService/ServicesContext";
import { optionListConverter } from "../../utils/optionListConverter";
import amountFormat, { kebabToCapitalize } from "../../utils/textConverter";
import { v4 as uuidv4 } from "uuid";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { showToast } from "../../utils/showToast.js";

const Transaction = () => {
  const { serviceList, serviceTypeList, serviceNameList } = useContext(
    ServicesContext
  );
  const navigate = useNavigate();
  const [serviceTypeOptionList, serviceNameOptionList] = [
    optionListConverter(serviceTypeList),
    optionListConverter(serviceNameList),
  ];
  const [transactionList, setTransactionList] = useState([]);
  const [data, setData] = useState({
    id: uuidv4(),
    service_type: "",
    service_name: "",
    amount_recieved: 0,
    amount_paid: 0,
    payment_bank: "",
  });
  const [serviceType, setServiceType] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [serviceNames, setServiceNames] = useState(serviceNameOptionList);
  const [recieveAmount, setRecieveAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const postTransacitonList = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/transaction",
        transactionList
      );
      showToast(res.data.success);
    } catch (error) {
      showToast(error.response.data.message || error.message, "error");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (transactionList.length === 0)
      return showToast("Add Transctions to Submit!", "warning", 5);
    postTransacitonList();
    setData({
      id: uuidv4(),
      service_type: "",
      service_name: "",
      amount_recieved: "",
      amount_paid: 0,
      payment_bank: "",
    });
    setServiceType("");
    setServiceName("");
    setTransactionList([]);
  };

  useEffect(() => {
    let names = serviceList.filter(
      (item) => item.service_type === serviceType.value
    );
    names = names.map((item) => item.service_name);
    names = optionListConverter(names);
    setServiceNames(names);
  }, [serviceType]);

  useEffect(() => {
    setTotalAmount(calcTotal(transactionList));
  }, [transactionList]);

  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      service_type: serviceType.value,
      service_name: serviceName.value,
      [e.target.name]: parseFloat(e.target.value),
    }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (
      serviceType === "" ||
      serviceName === "" ||
      data.amount_recieved === 0
    ) {
      showToast("Fill the details", "warning");
      return;
    }
    if (
      data.amount_paid > data.amount_recieved &&
      (serviceName !== "withdraw" || serviceName !== "transfer")
    ) {
      showToast("Payment Amount is Greater than Recieved!", "warning");
    }

    setTransactionList((prev) => [...prev, data]);
    setData({
      id: uuidv4(),
      service_type: "",
      service_name: "",
      amount_recieved: "",
      amount_paid: 0,
      payment_bank: "",
    });
    setServiceType("");
    setServiceName("");
  };

  const handleDelete = (id) => {
    const updatedList = transactionList.filter((item) => item.id !== id);
    setTransactionList(updatedList);
  };

  const calcTotal = (list) => {
    let total = 0;
    for (let i = 0; i < list.length; i++) {
      total += list[i].amount_recieved;
    }
    return total;
  };

  return (
    <div className="transaction">
      <form>
        <div className="form-container">
          <div className="transaction-form">
            <h2 className="title">Transaction Form</h2>
            <div className="inputItems required">
              <label htmlFor="service-type">Service Type</label>
              <Select
                className="input select"
                id="service-type"
                name="service_type"
                options={serviceTypeOptionList}
                isSearchable={true}
                value={serviceType}
                onChange={setServiceType}
              />
            </div>
            <div className="inputItems required">
              <label htmlFor="service-name">Service Name</label>
              <Select
                className="input select"
                id="service-name"
                name="service_name"
                options={serviceNames}
                value={serviceName}
                onChange={setServiceName}
                isSearchable={true}
              />
            </div>
            <div className="inputItems required">
              <label htmlFor="amount">
                {serviceName.value === "withdraw"
                  ? "Withdraw Charge"
                  : "Amount"}
              </label>
              <input
                autoComplete="off"
                className="input"
                type="number"
                id="amount"
                name="amount_recieved"
                value={data.amount_recieved}
                onChange={handleChange}
              />
            </div>
            <div className="inputItems">
              <label htmlFor="payment-amount">
                {serviceName.value === "withdraw"
                  ? "Withdraw Amount"
                  : "Payment Amount (Retailer)"}
              </label>
              <input
                autoComplete="off"
                className="input"
                type="number"
                id="payment-amount"
                name="amount_paid"
                value={data.amount_paid}
                onChange={handleChange}
              />
            </div>
            {data.amount_paid > 0 && (
              <div className="inputItems">
                <label htmlFor="payment-bank">Payment Bank (Retailer)</label>
                <input
                  autoComplete="off"
                  className="input"
                  type="text"
                  id="payment-bank"
                  name="payment_bank"
                  value={data.payment_bank}
                  onChange={handleChange}
                />
              </div>
            )}
            <div className="btn">
              <p>
                Service not listed?{" "}
                <span className="link" onClick={() => navigate("/service")}>
                  Click here
                </span>
              </p>
              <button onClick={handleAdd}>Add</button>
            </div>
          </div>
          <div className="transction-list">
            <h2>Transaction Recipt</h2>
            <div className="list-container">
              <div className="details-conatainer">
                <table>
                  <thead>
                    <tr>
                      <th>Serial</th>
                      <th>Service</th>
                      <th>Amount</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactionList.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>
                          {`${kebabToCapitalize(item.service_type)} - 
                          ${kebabToCapitalize(item.service_name)}`}
                        </td>
                        <td> {amountFormat(item.amount_recieved)}</td>
                        <td>
                          <DeleteOutlineOutlinedIcon
                            onClick={() => handleDelete(item.id)}
                            style={{
                              color: "red",
                              cursor: "pointer",
                              fontSize: "20px",
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="list-summary">
                <h3>
                  Total: <span>{amountFormat(totalAmount)}</span>
                </h3>
                <div>
                  <label htmlFor="recieve-amount">Recieved Amount</label>
                  <input
                    type="number"
                    id="recieve-amount"
                    value={recieveAmount}
                    onChange={(e) => setRecieveAmount(e.target.value)}
                  />
                </div>
                <h3>
                  Return:{" "}
                  <span>
                    {recieveAmount === 0
                      ? amountFormat(0)
                      : amountFormat(recieveAmount - totalAmount)}
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </div>
        <button className="btn" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Transaction;
