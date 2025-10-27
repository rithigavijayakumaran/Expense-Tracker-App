import express = require("express");
const router = express.Router();

const {
  getUser,
  registerUser,
  loginUser,
  deleteUser,
  updateUser,
} = require("../controllers/userController");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/:id").delete(deleteUser).put(updateUser).get(getUser);

export default router;
