import { toast } from "react-toastify";

export const showToast = (message, type = "success", duration = 1) => {
  console.log(type);
  console.log(message);
  switch (type) {
    case "success":
      return toast.success(message || "Success", {
        position: "top-right",
        autoClose: duration * 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

    case "error":
      return toast.error(message || "Error", {
        position: "top-right",
        autoClose: duration * 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

    case "warning":
      return toast.warning(message || "Warning", {
        position: "top-right",
        autoClose: duration * 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

    default:
      return toast.success(message || "Success", {
        position: "top-right",
        autoClose: duration * 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
  }
};
