import { executeQuery } from "../utils/query.js";
import { errorHandler } from "../utils/error.js";
import { v4 as uuidv4 } from "uuid";
uuidv4();

const convert_Date = (date) => {
  const currentDate = date;

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is 0-based, so add 1 and pad with '0' if necessary
  const day = String(currentDate.getDate()).padStart(2, "0"); // Pad with '0' if necessary

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

export const prevDayBalance = async (req, res, next) => {
  try {
    const q = `SELECT * FROM accounts ORDER BY date DESC LIMIT 1`;
    const data = await executeQuery(q);
    // For new user after one day
    if (data.length == 1) {
      return res.status(200).json({ balance: data[0].closing_balance });
    }

    //FOr new user
    if (data.length == 0) {
      return res.status(200).json({ balance: 0 });
    }
  } catch (error) {
    next(error);
  }
};

export const balanceUpdate = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return next(errorHandler(400, "Balance information required!"));
    }

    const opening_balance = parseFloat(req.body.openingBalance);
    const id = uuidv4();

    const get_query =
      "SELECT date AS current_day, id FROM accounts ORDER BY date DESC LIMIT 1";

    const result = await executeQuery(get_query);
    const db_date = convert_Date(result[0].current_day);
    const account_id = result[0].id;
    const today = convert_Date(new Date());

    if (today == db_date) {
      const update_query =
        "UPDATE accounts SET opening_balance = ?, closing_balance = ? WHERE (id = ?)";
      await executeQuery(update_query, [
        opening_balance,
        opening_balance,
        account_id,
      ]);
      return res.status(200).json({ success: "Balance Updated" });
    } else {
      const insert_query =
        "INSERT INTO accounts (`id`, `opening_balance`, `closing_balance`) VALUES (?)";
      await executeQuery(insert_query, [
        [id, opening_balance, opening_balance],
      ]);
      return res.status(200).json({ success: "Balance Created!" });
    }
  } catch (error) {
    next(error);
  }
};

export const newUserBalance = async (req, res, next) => {
  try {
    const id = uuidv4();
    const opening_balance = req.body.openingBalance;

    const get_query =
      "SELECT date AS current_day, closing_balance FROM accounts ORDER BY date DESC LIMIT 1";

    const result = await executeQuery(get_query);

    if (result.length === 0) {
      const q =
        "INSERT INTO `accounts` (`id`, `opening_balance`, `closing_balance`) VALUES (?)";

      await executeQuery(q, [[id, +opening_balance, +opening_balance]]);
      return res.status(200).json({ success: "Opening Balance Created!" });
    } else {
      return next(errorHandler(401, "Balance Exist!"));
    }
  } catch (error) {
    next(error);
  }
};

export const checkNewUser = async (req, res, next) => {
  try {
    const q = "SELECT COUNT(*) AS number FROM my_shop.accounts";
    const result = await executeQuery(q);
    if (result[0].number === 0) {
      return res
        .status(200)
        .json({ newUser: true, greeting: "Welcome!", isPresent: false });
    } else {
      const get_query =
        "SELECT DATE(date) AS current_day FROM accounts ORDER BY date DESC LIMIT 1";
      const date_result = await executeQuery(get_query);
      const db_date = convert_Date(date_result[0].current_day);

      const today = convert_Date(new Date());
      if (today !== db_date) {
        return res.status(200).json({
          warning: "Update the opening_balance!",
          isPresent: false,
          newUser: false,
          greeting: "Good Morning",
        });
      }
      return res
        .status(200)
        .json({ success: "Good Morning!", isPresent: true, newUser: false });
    }
  } catch (error) {
    next(error);
  }
};
