const express = require("express");
const router = express.Router();
const controller = require("./provider.controller");
const auth = require("../../middleware/auth.middleware");


router.post("/create", auth, controller.createProvider);

module.exports = router;