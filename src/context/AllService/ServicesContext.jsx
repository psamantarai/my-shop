import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { optionListConverter } from "../../utils/optionListConverter";

export const ServicesContext = createContext();

export const ServiceContextProvider = ({ children }) => {
  const [serviceList, setServiceList] = useState([]);
  const fetchServices = async () => {
    await axios
      .get("http://localhost:8000/api/service")
      .then((res) => {
        setServiceList(res.data);
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

  useEffect(() => {
    fetchServices();
  }, []);

  function filterUniqueKeyValues(list, key) {
    const uniqueValues = [];
    const seenValues = new Set();

    for (const obj of list) {
      const value = obj[key];

      if (!seenValues.has(value)) {
        seenValues.add(value);
        uniqueValues.push(value);
      }
    }

    return uniqueValues;
  }

  const serviceTypeList = filterUniqueKeyValues(serviceList, "service_type");
  const serviceNameList = serviceList.map((item) => item.service_name);
  // console.log("From Context: ", serviceList);

  return (
    <ServicesContext.Provider
      value={{ serviceList, serviceTypeList, serviceNameList, fetchServices }}
    >
      {children}
    </ServicesContext.Provider>
  );
};
