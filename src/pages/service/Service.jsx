import React, { useContext, useEffect, useState } from "react";
import "./service.scss";
import axios from "axios";

import ServiceCard from "../../components/ServiceCard/ServiceCard";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { kebabToCapitalize } from "../../utils/textConverter";
import { ServicesContext } from "../../context/AllService/ServicesContext";
import { showToast } from "../../utils/showToast.js";

const Service = () => {
  const { serviceList, fetchServices, serviceTypeList } = useContext(
    ServicesContext
  );
  const [data, setData] = useState({
    service_type: "",
    service_name: "",
  });
  const [query, setQuery] = useState("");

  const postService = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/service", data);
      fetchServices();
      console.log("success", res.data.success);
      showToast(res.data.success);
    } catch (error) {
      showToast(error.response.data.message || error.message, "error");
    }
  };
  const deleteService = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8000/api/service/${id}`);
      fetchServices();
      console.log(res);
      showToast(res.data.success);
    } catch (error) {
      showToast(error.response.data.message || error.message, "error");
    }
  };

  const handleDelete = (id) => {
    deleteService(id);
  };
  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    postService();
    setData({
      service_type: "",
      service_name: "",
    });
  };

  const getFilterList = () => {
    if (!query) {
      return serviceList;
    }

    return serviceList.filter((item) => {
      return (
        kebabToCapitalize(item.service_name)
          .toLowerCase()
          .includes(query.toLowerCase()) ||
        kebabToCapitalize(item.service_type)
          .toLowerCase()
          .includes(query.toLowerCase())
      );
    });
  };
  const filteredList = getFilterList();

  return (
    <div className="service">
      <div className="top">
        <div className="form-container">
          <form className="form">
            <div className="inputItems">
              <label htmlFor="service-type">Service Type</label>
              <input
                type="text"
                id="service-type"
                name="service_type"
                onChange={handleChange}
                value={data.service_type}
                autoComplete={"off"}
                list="service-types"
                required
              />
              <datalist id="service-types">
                {serviceTypeList.map((item, id) => (
                  <option key={id} value={kebabToCapitalize(item)} />
                ))}
              </datalist>
            </div>
            <div className="inputItems">
              <label htmlFor="service-name">Service Name</label>
              <input
                type="text"
                id="service-name"
                name="service_name"
                onChange={handleChange}
                value={data.service_name}
                autoComplete={"off"}
                required
              />
            </div>
            <button onClick={handleSubmit}>Add</button>
          </form>
        </div>
      </div>
      <div className="bottom">
        <div className="service-container">
          <div className="search">
            <div className="search-container">
              <input type="text" onChange={(e) => setQuery(e.target.value)} />
              <SearchOutlinedIcon className="search-button" />
            </div>
            <div className="details">
              Total Services: <span>{serviceList.length}</span>
            </div>
          </div>
          <div className="service-list">
            {filteredList.map((service) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                service_type={service.service_type}
                service_name={service.service_name}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
