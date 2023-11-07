import express, { query } from "express";
import db from "./connection.js";
import cors from "cors";
import accountsRouter from "./router/account.js";
import transactionRouter from "./router/transaction.js";
import serviceRouter from "./router/service.js";
import createSchema from "./schema.js";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use("/api/service", serviceRouter);
app.use("/api/accounts", accountsRouter);
app.use("/api/transaction", transactionRouter);



app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    error: err
  });
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: ", err);
    return;
  }
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  createSchema();
});
