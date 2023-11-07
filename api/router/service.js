import express from "express";
import db from "../connection.js";
import {
  deleteService,
  getAllServices,
  getSericeName,
  getServiceType,
  insertNewService,
} from "../controllers/service.controller.js";
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
router.get("/", getAllServices);

// Upload new Services
router.post("/", insertNewService);

// Delete a Service
router.delete("/:id", deleteService);

// Get Service Type
router.get("/type", getServiceType);

//Get service names
router.get("/:type", getSericeName);

export default router;
