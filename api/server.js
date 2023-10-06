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
app.use("/api", serviceRouter);
app.use("/api", accountsRouter);
app.use("/api", transactionRouter);

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: ", err);
    return;
  }
  console.log("Connected to the database");
  createSchema();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
