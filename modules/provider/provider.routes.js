const express = require("express");
const router = express.Router();
const controller = require("./provider.controller");
const auth = require("../../middleware/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Providers
 *   description: Provider management APIs
 */


/**
 * @swagger
 * /provider/create:
 *   post:
 *     summary: Create a provider
 *     tags: [Providers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "Sahil"
 *             phone: "9876543210"
 *             email: "sahil@example.com"
 *             password: "123456"
 *     responses:
 *       201:
 *         description: Provider created successfully
 */
router.post("/create", auth, controller.createProvider);


/**
 * @swagger
 * /provider/login:
 *   post:
 *     summary: Provider login
 *     tags: [Providers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             email: "sahil@example.com"
 *             password: "123456"
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", controller.loginProvider);


/**
 * @swagger
 * /provider:
 *   get:
 *     summary: Get all providers (owner specific)
 *     tags: [Providers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of providers
 */
router.get("/", auth, controller.getAllProviders);


/**
 * @swagger
 * /provider/{id}:
 *   get:
 *     summary: Get provider by ID
 *     tags: [Providers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Provider details
 */
router.get("/:id", auth, controller.getProviderById);


/**
 * @swagger
 * /provider/{id}:
 *   put:
 *     summary: Update provider
 *     tags: [Providers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             name: "Updated Name"
 *             phone: "9999999999"
 *     responses:
 *       200:
 *         description: Provider updated
 */
router.put("/:id", auth, controller.updateProvider);


/**
 * @swagger
 * /provider/{id}:
 *   delete:
 *     summary: Delete provider
 *     tags: [Providers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Provider deleted
 */
router.delete("/:id", auth, controller.deleteProvider);

module.exports = router;