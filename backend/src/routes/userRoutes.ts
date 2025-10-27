import express = require("express");
const router = express.Router();
import {validateToken } from "../middlewares/validateTokenHandler"
const {
  getUserProfile,
  registerUser,
  loginUser,
  deleteUser,
  updateUser,
} = require("../controllers/userController");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/profile").get(validateToken,getUserProfile);
router.route("/:id").delete(deleteUser).put(validateToken,updateUser);
export default router;
