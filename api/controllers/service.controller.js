import { executeQuery } from "../utils/query.js";
import { errorHandler } from "../utils/error.js";
import { v4 as uuidv4 } from "uuid";
uuidv4();

function toKebabCase(inputText) {
  // Replace spaces and underscores with hyphens
  var kebabCaseText = inputText.replace(/[\s_]+/g, "-");

  // Convert to lowercase
  kebabCaseText = kebabCaseText.toLowerCase();

  return kebabCaseText;
}

export const getAllServices = async (req, res, next) => {
  try {
    const data = await executeQuery(`SELECT * FROM services`);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const insertNewService = async (req, res, next) => {
  try {
    if (
      Object.keys(req.body).length === 0 ||
      req.body.service_name === "" ||
      req.body.service_type === ""
    ) {
      return next(errorHandler(400, "Fields Required!"));
    }
    const id = uuidv4();
    let { service_type, service_name } = req.body;
    service_type = toKebabCase(service_type);
    service_name = toKebabCase(service_name);

    const q = `INSERT INTO services (id, service_type, service_name) VALUES (?) `;
    const values = [id, service_type, service_name];

    await executeQuery(
      q,
      [values],
      errorHandler(500, "Error saving the service.")
    );
    return res.status(200).json({ success: "Service saved successfully!" });
  } catch (error) {
    next(error);
  }
};

export const deleteService = async (req, res, next) => {
  try {
    const serviceId = req.params.id;
    const q = "DELETE FROM `services` WHERE (`id` = ?)";

    await executeQuery(q, serviceId);
    return res.status(200).json({ success: "Service Deleted!" });
  } catch (error) {
    if (error.code === "ER_ROW_IS_REFERENCED_2") {
      return next(errorHandler(500, "Can't delete this service!"));
    }
    next(error);
  }
};

export const getServiceType = async (req, res, next) => {
  try {
    const q = `SELECT DISTINCT service_type FROM services`;
    const data = await executeQuery(q);
    return res.status(200).send(data);
  } catch (error) {
    next(error);
  }
};

export const getSericeName = async (req, res, next) => {
  try {
    const service_type = req.params.type;
    const q = `SELECT service_name FROM services WHERE service_type = ?`;
    const data = await executeQuery(q, service_type);
    return res.status(200).send(data);
  } catch (error) {
    next(error);
  }
};
