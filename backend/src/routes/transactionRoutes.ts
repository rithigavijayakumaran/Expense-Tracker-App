import express = require("express");
const {
  createTransaction,
  updateTransaction,
  getAllTransactions,
  getTransactionsById,
  deleteTransaction,
} = require("../controllers/transactionController");
const router = express.Router();
router.route("/")
  .post(createTransaction)
  .get(getAllTransactions);

router
  .route("/:id")
  .put(updateTransaction)
  .delete(deleteTransaction)
  .get(getTransactionsById);

module.exports = router;
