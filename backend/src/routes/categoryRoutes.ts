import express from "express";
const router = express.Router();
import { createCategory,getAllCategory, getTransactionsByCategory} from '../controllers/categoryController';


router.route("/").post(createCategory).get(getAllCategory);
router.route("/:id/transactions").get(getTransactionsByCategory);
exports.module =router;