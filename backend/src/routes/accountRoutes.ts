import express = require("express");
const router = express.Router();
import {createAccount,updateAccount,deleteAccount,getAccount, getAllAccountsOfUser} from "../controllers/accountController"
import { validateToken } from "../middlewares/validateTokenHandler";

router.use(validateToken);
router.route("/").post(createAccount).get(getAllAccountsOfUser);
router.route("/:id").put(updateAccount).delete(deleteAccount).get(getAccount);

export default router;