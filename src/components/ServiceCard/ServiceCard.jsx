import React from "react";
import "./serviceCard.scss";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { kebabToCapitalize } from "../../utils/textConverter";
import Popup from "../Popup/Popup";

const ServiceCard = ({ id, service_type, service_name, handleDelete }) => {
  const handleClick = () => {
    handleDelete(id);
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="service-card">
      <div className="title">
        <h3>{kebabToCapitalize(service_name)}</h3>
        <h5>{kebabToCapitalize(service_type)}</h5>
      </div>
      <div className="card-details">
        <p>Something</p>
        <CancelOutlinedIcon className="close-btn" onClick={handleClickOpen} />
        <Popup
          open={open}
          handleClose={handleClose}
          handleDelete={handleClick}
          title={`Are you sure want to delete ${service_name} service?`}
        />
      </div>
    </div>
  );
};

export default ServiceCard;
