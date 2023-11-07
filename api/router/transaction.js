import express from "express";

import { createTransction } from "../controllers/transaction.controller.js";
const router = express.Router();

//Get all transactions
router.get("/", (req, res) => {
  db.query(`SELECT * FROM transaction`, (err, data) => {
    if (err) {
      console.error("Error querying MySQL:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.status(200).json(data);
  });
});

//Post new transactions
router.post("/", createTransction);

export default router;
