import express from "express";
import db from "../connection.js";
const router = express.Router();
import { v4 as uuidv4 } from "uuid";
uuidv4();

function toKebabCase(inputText) {
  // Replace spaces and underscores with hyphens
  var kebabCaseText = inputText.replace(/[\s_]+/g, "-");

  // Convert to lowercase
  kebabCaseText = kebabCaseText.toLowerCase();

  return kebabCaseText;
}

//Get all Services
router.get("/service", (req, res) => {
  db.query(`SELECT * FROM services`, (err, data) => {
    if (err) {
      console.error("Error querying MySQL:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.status(200).json(data);
  });
});

// Upload new Services
router.post("/service", (req, res) => {
  if (
    Object.keys(req.body).length === 0 ||
    req.body.service_name === "" ||
    req.body.service_type === ""
  ) {
    return res.status(400).json({ error: "Fields Required!" });
  }
  const id = uuidv4();
  let { service_type, service_name } = req.body;
  service_type = toKebabCase(service_type);
  service_name = toKebabCase(service_name);
  const q = `INSERT INTO services (id, service_type, service_name) VALUES (?) `;
  const values = [id, service_type, service_name];

  db.query(q, [values], (error) => {
    if (error) {
      console.error("Error storing data:", error);
      return res.status(500).json({ error: "Error saving the service." }); // Internal server error
    } else {
      console.log("Data stored successfully");
      return res.status(200).json({ success: "Service saved successfully!" }); // OK
    }
  });
});

// Delete a Service
router.delete("/service/:id", (req, res) => {
  const serviceId = req.params.id;
  const q = "DELETE FROM `services` WHERE (`id` = ?)";

  db.query(q, serviceId, (error, results) => {
    const errMessage = "Error Deleting Service.";
    const successMessage = "Service Deleted!";

    if (error) {
      if (error.code === "ER_ROW_IS_REFERENCED_2") {
        return res.status(500).json({ error: "Can't delete this service!" });
      }
      return res.status(500).json({ error: "Failure in Service delete!" });
    } else {
      console.log(successMessage);
      return res.status(200).json({ success: successMessage });
    }
  });
});

// Get Service Type
router.get("/service/type", (req, res) => {
  const q = `SELECT DISTINCT service_type FROM services`;
  db.query(q, (error, data) => {
    if (error) {
      console.error("Error Fetching service type:", error);
      return res.status(500).json({ error: "Error Fetching service type!" }); // Internal server error
    }
    console.log("Service Type");
    return res.status(200).send(data); // OK
  });
});

//Get service names
router.get("/service/:type", (req, res) => {
  const service_type = req.params.type;
  const q = `SELECT service_name FROM services WHERE service_type = ?`;
  db.query(q, service_type, (error, data) => {
    if (error) {
      console.error("Error Fetching service name:", error);
      return res.status(500).json({ error: "Error Fetching service name!" }); // Internal server error
    }
    // console.log("Service Type");
    return res.status(200).send(data); // OK
  });
});

export default router;
