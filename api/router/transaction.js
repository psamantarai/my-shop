import express from "express";
import db from "../connection.js";
const router = express.Router();

//Get all transactions
router.get("/transaction", (req, res) => {
  db.query(`SELECT * FROM transaction`, (err, data) => {
    if (err) {
      console.error("Error querying MySQL:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.status(200).json(data);
  });
});

router.post("/transaction", (req, res) => {
  const transactionList = req.body;
  const query = {
    serviceId: `SELECT id FROM my_shop.services WHERE service_type = ? and service_name = ?`,
    transactionInsert: `INSERT INTO transaction (id, service_id, amount_recieved, amount_paid,current_balance, payment_bank) VALUES (?)`,
  };

  let transactionErr = false;
  transactionList.map((transaction) => {
    db.query(
      query.serviceId,
      [transaction.service_type, transaction.service_name],
      (serviceErr, serviceRes) => {
        if (serviceErr) {
          console.log("Error Fetching ID: ", err);
        }
        const {
          service_type,
          service_name,
          amount_recieved,
          amount_paid,
        } = transaction;
        let curr_balance = 0;
        if (service_type === "banking" && service_name === "withdraw") {
          curr_balance = amount_recieved;
        } else {
          curr_balance = amount_recieved - amount_paid;
        }
        const values = [
          transaction.id,
          serviceRes[0].id,
          transaction.amount_recieved,
          transaction.amount_paid,
          curr_balance,
          transaction.payment_bank,
        ];
        db.query(query.transactionInsert, [values], (trErr) => {
          if (trErr) {
            console.log("Erorr Posting Transaction: ", trErr);
            transactionErr = true;
          }
        });
      }
    );
  });
  if (transactionErr) {
    return res.status(500).json({ error: "Transction Saving Failed!" });
  } else {
    return res.status(200).json({ success: "Transaction Saved!" });
  }
});



export default router;
