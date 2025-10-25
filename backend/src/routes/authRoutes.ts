import express = require("express");
const {login,register} = require("../controllers/userController")
const router= express.Router();

router.route("/").post();
router.route("/").post();

module.exports = router;
