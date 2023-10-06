import express, { query } from "express";
import db from "./connection.js";
import cors from "cors";
import accountsRouter from "./router/account.js";
import transactionRouter from "./router/transaction.js";
import serviceRouter from "./router/service.js";

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
});

// const database_name = "my__shop";
// const create_database = `CREATE DATABASE IF NOT EXISTS ${database_name}`;

// db.query(create_database, (err) => {
//   if (err) {
//     console.log("Error creating database: ", err);
//   }
//   console.log("Database created...");

//   const use_database = `USE ${database_name}`;
//   db.query(use_database, (err) => {
//     if (err) {
//       console.log("Error in using database: ", err);
//     }
//     console.log(`Using database ${database_name}`);
//   });

//   const schema = {
//     accounts: `CREATE TABLE accounts (
//           id varchar(50) NOT NULL,
//           date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
//           opening_balance float NOT NULL,
//           closing_balance float NOT NULL,
//           PRIMARY KEY (id),
//           UNIQUE KEY id_UNIQUE (id),
//           UNIQUE KEY date_UNIQUE (date)
//         ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`,
//   };

//   db.query(schema.accounts, (err) => {
//     if (err) {
//       console.log("Error creating Accounts schema", err);
//     }
//     console.log("Accounts table created");
//   });
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
