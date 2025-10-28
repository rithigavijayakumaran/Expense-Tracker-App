import express from "express";
const router = express.Router();
import { createCategory,getAllCategory, getTransactionsByCategory} from '../controllers/categoryController';
import { validateToken } from "../middlewares/validateTokenHandler";

router.route("/").post(createCategory).get(getAllCategory);
router.route("/:id/transactions").get(validateToken,getTransactionsByCategory);
export default router;
