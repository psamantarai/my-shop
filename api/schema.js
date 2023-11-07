import db from "./connection.js";

const createSchema = () => {
  const q = {
    accountTable:
      "CREATE TABLE IF NOT EXISTS accounts (id varchar(50) NOT NULL, date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, opening_balance float NOT NULL, closing_balance float NOT NULL, PRIMARY KEY (id), UNIQUE KEY id_UNIQUE (id)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci",
    serviceTable:
      "CREATE TABLE IF NOT EXISTS `services` (`id` varchar(50) NOT NULL,`service_type` varchar(45) NOT NULL,`service_name` varchar(45) NOT NULL,PRIMARY KEY (`id`), UNIQUE KEY `id_UNIQUE` (`id`), UNIQUE KEY `service_name_UNIQUE` (`service_name`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci",
    transactionTable:
      "CREATE TABLE IF NOT EXISTS `transaction` (`id` varchar(50) NOT NULL,`timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, `service_id` varchar(50) NOT NULL,`amount_recieved` float NOT NULL,`amount_paid` float NOT NULL, `current_balance` float NOT NULL,    `payment_bank` varchar(45) DEFAULT NULL,`account_id` varchar(50) NOT NULL, PRIMARY KEY (`id`),UNIQUE KEY `id_UNIQUE` (`id`),KEY `service_id_idx` (`service_id`), KEY `account_id_idx` (`account_id`), CONSTRAINT `service_id` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci",
  };

  const createBeforeInsertTriggerSQL = `
      CREATE TRIGGER IF NOT EXISTS insert_account_id BEFORE INSERT ON transaction FOR EACH ROW
      BEGIN
        SET NEW.account_id = (SELECT id FROM accounts WHERE date = (SELECT MAX(date) FROM accounts));
      END;
    `;

  const createAfterInsertTriggerSQL = `
      CREATE TRIGGER IF NOT EXISTS update_closing_balance AFTER INSERT ON transaction FOR EACH ROW
      BEGIN
      UPDATE accounts AS a
      JOIN
      (SELECT * FROM transaction as t WHERE timestamp = (SELECT MAX(timestamp) FROM transaction)) 
      as max_dates on a.id = max_dates.account_id
      SET a.closing_balance = a.closing_balance + current_balance;
      END;
    `;

  db.query(q.accountTable, (accErr) => {
    if (accErr) {
      console.log("Error Creating Account Table: ", accErr);
      return;
    }

    db.query(q.serviceTable, (serErr) => {
      if (serErr) {
        console.log("Error Creating Service Table: ", serErr);
        return;
      }

      db.query(q.transactionTable, (trErr) => {
        if (trErr) {
          console.log("Error Creating Transaction Table: ", trErr);
          return;
        }

        db.query(createBeforeInsertTriggerSQL, (triggerErr) => {
          if (triggerErr) {
            console.log("Error Creating trigger before insert.", triggerErr);
            return;
          }

          db.query(createAfterInsertTriggerSQL, (triggerErr) => {
            if (triggerErr) {
              console.log("Error Creating trigger after insert.", triggerErr);
              return;
            }
            console.log("DB Created");
          });
        });
      });
    });
  });
};

export default createSchema;
