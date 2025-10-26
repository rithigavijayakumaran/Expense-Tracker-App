import express = require("express");
const router = express.Router();

const {
  getUser,
  createUser,
  deleteUser,
  updateUser,
} = require("../controllers/userController");

router.route("/").post(createUser);
router.route("/:id").delete(deleteUser).put(updateUser).get(getUser);

module.exports = router;
