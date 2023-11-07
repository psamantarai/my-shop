import db from "../connection.js";

export const executeQuery = async (query, values = [], error) => {
  return new Promise((resolve, reject) => {
    db.query(query, values, (err, result) => {
      if (err) {
        if (error === "") reject(err);
        else reject({ ...err, ...error });
      } else {
        resolve(result);
      }
    });
  });
};
