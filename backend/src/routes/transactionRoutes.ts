import express = require("express");
import {
  createTransaction,
  updateTransaction,
  getAllTransactions,
  getTransactionsById,
  deleteTransaction,
} from "../controllers/transactionController";
import { validateToken } from "../middlewares/validateTokenHandler";

const router = express.Router();
router.use(validateToken)
router.route("/")
  .post(createTransaction)
  .get(getAllTransactions);

router
  .route("/:id")
  .put(updateTransaction)
  .delete(deleteTransaction)
  .get(getTransactionsById);

export default router;
