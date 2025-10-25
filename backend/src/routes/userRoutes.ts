import express = require("express");
const router = express.Router();
const {getUser,createUser,deleteUser,updateUser} = require("../controllers/userController")
router.route("/").post(createUser).get(getUser);
router.route("/id").get(deleteUser).put(updateUser).get(getUser);