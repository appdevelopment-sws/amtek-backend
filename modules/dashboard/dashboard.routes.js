const express = require("express");
const router = express.Router();

const controller = require("./dashboard.controller");
const auth = require("../../middleware/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Dashboard statistics APIs
 */


/**
 * @swagger
 * /dashboard/stats:
 *   get:
 *     summary: Get dashboard statistics
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Dashboard statistics fetched successfully
 *               data:
 *                 totalOwners: 5
 *                 totalProviders: 12
 *                 totalCustomers: 100
 *                 totalServices: 40
 *
 *       401:
 *         description: Unauthorized
 *
 *       404:
 *         description: Route not found
 *
 *       500:
 *         description: Internal server error
 */
router.get(
    "/stats",
    auth,
    controller.getDashboardStats
);

module.exports = router;

/**
 * @swagger
 * /dashboard/provider/stats:
 *   get:
 *     summary: Get provider dashboard statistics
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Provider dashboard fetched successfully
 */
router.get(
    "/provider/stats",
    auth,
    controller.getProviderDashboardStats
);