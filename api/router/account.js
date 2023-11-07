import express from "express";
import {
  balanceUpdate,
  prevDayBalance,
  checkNewUser,
  newUserBalance,
} from "../controllers/accounts.controller.js";
const router = express.Router();

router.get("/balance", prevDayBalance);

//New day Opening Blance create & Current day opening balance update
router.post("/", balanceUpdate);

//Creating new user Opening Balance for the new User
router.post("/new_user", newUserBalance);

//Check for new user
router.get("/check", checkNewUser);

export default router;
