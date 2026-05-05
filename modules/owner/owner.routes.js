const express = require("express");
const router = express.Router();
const controller = require("./owner.controller");

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

module.exports = router;