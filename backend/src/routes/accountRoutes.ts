import express = require("express");
const router = express.Router();

router.route("/").post().get();
router.route("/:id").put().delete()

module.exports= router;