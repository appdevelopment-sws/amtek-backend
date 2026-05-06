const express = require("express");
const router = express.Router();
const controller = require("./owner.controller");
const auth = require("../../middleware/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Owner
 *   description: Owner authentication APIs
 */


/**
 * @swagger
 * /owner/register:
 *   post:
 *     summary: Register a new owner
 *     tags: [Owner]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "Sahil Kumar"
 *             email: "sahil@example.com"
 *             password: "123456"
 *     responses:
 *       201:
 *         description: Owner registered successfully
 *       400:
 *         description: Owner already exists
 */
router.post("/register", controller.register);



/**
 * @swagger
 * /owner/login:
 *   post:
 *     summary: Owner login
 *     tags: [Owner]
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
 *         content:
 *           application/json:
 *             example:
 *               message: "Login successful"
 *               token: "jwt_token_here"
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.post("/login", controller.login);

/**
 * @swagger
 * /owner/{id}:
 *   put:
 *     summary: Update owner
 *     tags: [Owner]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "Updated Owner"
 *             email: "updated@example.com"
 *
 *     responses:
 *       200:
 *         description: Owner updated successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Owner updated successfully
 *               data:
 *                 id: 1
 *                 name: "Updated Owner"
 *                 email: "updated@example.com"
 *
 *       400:
 *         description: Validation error
 *
 *       401:
 *         description: Unauthorized
 *
 *       404:
 *         description: Owner not found
 *
 *       500:
 *         description: Internal server error
 */
router.put("/:id", auth, controller.updateOwner);

/**
 * @swagger
 * /owner/{id}:
 *   get:
 *     summary: Get owner by ID
 *     tags: [Owner]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *
 *     responses:
 *       200:
 *         description: Owner fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 id: 1
 *                 name: "Sahil Kumar"
 *                 email: "sahil@example.com"
 *                 created_at: "2026-05-06T10:00:00.000Z"
 *
 *       401:
 *         description: Unauthorized
 *
 *       404:
 *         description: Owner not found
 *
 *       500:
 *         description: Internal server error
 */
router.get("/:id", auth, controller.getOwnerById);


module.exports = router;