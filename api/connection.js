import mysql from "mysql";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "pritesh",
  database: "my_shop",
});

export default db;
