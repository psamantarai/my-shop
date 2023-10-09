import express from "express";
import db from "../connection.js";
import { v4 as uuidv4 } from "uuid";
uuidv4();
const router = express.Router();

const convert_Date = (date) => {
  const currentDate = date;

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is 0-based, so add 1 and pad with '0' if necessary
  const day = String(currentDate.getDate()).padStart(2, "0"); // Pad with '0' if necessary

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

// Get Current Balance, current day revenue, prevday revenue
router.get("/accounts", (req, res) => {
  const q = `SELECT date, opening_balance, closing_balance FROM my_shop.accounts ORDER BY date DESC LIMIT 2`;
  db.query(q, (error, data) => {
    if (error) {
      console.error("Error storing data:", error);
      return res.status(500).json({ error: "Error fetching current balance." }); // Internal server error
    }
    const current_day_balance = data[0].closing_balance;
    const current_day_revenue =
      data[0].closing_balance - data[0].opening_balance;
    const prev_day_revenue = data[1].closing_balance - data[1].opening_balance;

    return res
      .status(200)
      .send({ current_day_balance, current_day_revenue, prev_day_revenue }); // OK
  });
});

//Creating new balance
router.post("/accounts", (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Balance information required!" });
  }
  const opening_balance = parseFloat(req.body.opening_balance);
  const id = uuidv4();

  const get_query =
    "SELECT date AS current_day, id FROM accounts ORDER BY date DESC LIMIT 1";

  db.query(get_query, (err, result) => {
    if (err) {
      console.error("Error Fetching the data: ", err);
      return;
    }

    const db_date = convert_Date(result[0].current_day);
    const account_id = result[0].id;
    const today = convert_Date(new Date());

    if (today === db_date) {
      const update_query =
        "UPDATE accounts SET opening_balance = ?, closing_balance = ? WHERE (id = ?)";
      db.query(
        update_query,
        [opening_balance, opening_balance, account_id],
        (updateErr) => {
          if (updateErr) {
            console.error("Error Updating the Balance", updateErr);
            return res
              .status(500)
              .json({ error: "Error Updating the Balance" });
          }
          return res.status(200).json({ success: "Balance Updated" });
        }
      );
    } else {
      const insert_query =
        "INSERT INTO accounts (`id`, `opening_balance`, `closing_balance`) VALUES (?)";
      db.query(
        insert_query,
        [[id, opening_balance, opening_balance]],
        (insertErr) => {
          if (insertErr) {
            console.error("Error Creating the Balance", insertErr);
            return res
              .status(500)
              .json({ error: "Error Creating the Balance!" });
          }
          return res.status(200).json({ success: "Balance Created!" });
        }
      );
    }
  });
});

//Updating the new day opening_balance
router.post("/accounts/opening_balance", (req, res) => {
  const id = uuidv4();
  const get_query =
    "SELECT date AS current_day, closing_balance FROM accounts ORDER BY date DESC LIMIT 1";

  db.query(get_query, (err, result) => {
    if (err) {
      console.error("Error Fetching the data: ", err);
      return;
    }

    if (convert_Date(result[0].current_day) !== convert_Date(new Date())) {
      const closing_balance = result[0].closing_balance;
      const insert_query =
        "INSERT INTO `accounts` (`id`, `opening_balance`, `closing_balance`) VALUES (?)";
      db.query(
        insert_query,
        [[id, closing_balance, closing_balance]],
        (insertErr) => {
          if (insertErr) {
            console.error("Error Creating the Balance", insertErr);
            return res
              .status(500)
              .json({ error: "Error Creating the Balance!" });
          }
          return res.status(200).json({ success: "Balance Created!" });
        }
      );
    }
    if (convert_Date(result[0].current_day) === convert_Date(new Date())) {
      return res.status(400).json({ error: "Balance Already Exist!" });
    }
  });
});

//Warning message for creating opening balance
router.get("/accounts/opening_balance", (req, res) => {
  const get_query =
    "SELECT DATE(date) AS current_day FROM accounts ORDER BY date DESC LIMIT 1";

  db.query(get_query, (err, result) => {
    if (err) {
      console.error("Error fetching data", err);
      return res
        .status(500)
        .json({ error: "Error Checking existance of balance!" });
    }
    const db_date = convert_Date(result[0].current_day);

    const today = convert_Date(new Date());
    if (today !== db_date) {
      return res.status(200).json({ warning: "Update the opening_balance!" });
    }
    return res.status(200).json({ success: "Good Morning!" });
  });
});

//Check for new user
router.get("/accounts/check", (req, res) => {
  const q = "SELECT COUNT(*) AS number FROM my_shop.accounts";
  db.query(q, (err, result) => {
    if (err) {
      console.error("Error Fetching accounts: ", err);
      return res.status(500).json({ error: "Error Fetching accounts" });
    }
    if (result[0].number === 0) {
      return res.status(200).json({ success: "Welcome!" });
    }
  });
});

export default router;
