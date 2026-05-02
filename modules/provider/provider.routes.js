const express = require("express");
const router = express.Router();
const controller = require("./provider.controller");
const auth = require("../../middleware/auth.middleware");


router.post("/create", auth, controller.createProvider);
router.post("/login", controller.loginProvider);
router.get("/", auth, controller.getAllProviders);
router.get("/:id", auth, controller.getProviderById);
router.put("/:id", auth, controller.updateProvider);
router.delete("/:id", auth, controller.deleteProvider);

module.exports = router;