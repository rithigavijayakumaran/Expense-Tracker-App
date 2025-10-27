import express = require("express");
const router = express.Router();
import {createAccount,updateAccount,deleteAccount,getAccount} from "../controllers/accountController"

router.route("/").post(createAccount).get(getAccount);
router.route("/:id").put(updateAccount).delete(deleteAccount);

export default router;