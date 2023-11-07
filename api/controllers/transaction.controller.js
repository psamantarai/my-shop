import { executeQuery } from "../utils/query.js";
import { errorHandler } from "../utils/error.js";

export const createTransction = async (req, res, next) => {
  try {
    const transactionList = req.body;
    if (transactionList.length === 0)
      return next(errorHandler(400, "Empty Transction"));
    const query = {
      serviceId: `SELECT id FROM my_shop.services WHERE service_type = ? and service_name = ?`,
      transactionInsert: `INSERT INTO transaction (id, service_id, amount_recieved, amount_paid,current_balance, payment_bank) VALUES (?)`,
    };

    transactionList.map(async (transaction) => {
      try {
        const serviceRes = await executeQuery(query.serviceId, [
          transaction.service_type,
          transaction.service_name,
        ]);
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

        await executeQuery(
          query.transactionInsert,
          [values],
          errorHandler(400, "Failed Posting Transaction!")
        );

        res.status(200).json({ success: "Transaction Saved!" });
      } catch (err) {
        next(err);
      }
    });
  } catch (error) {
    next(error);
  }
};
