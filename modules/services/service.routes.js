const express = require("express");
const router = express.Router();

const controller = require("./service.controller");
const auth = require("../../middleware/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Service
 *   description: Service management APIs
 */


/**
 * @swagger
 * /service/create:
 *   post:
 *     summary: Create service (Provider only)
 *     tags: [Service]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             customer_id: 1
 *             service_date: "2026-05-05"
 *             manufacturer: "LG"
 *             model: "AC123"
 *             serial_no: "SN001"
 *             manufactured_year: 2022
 *             complaint: "Not cooling"
 *             resolution: "Gas refilled"
 *             spares_replaced: "Valve"
 *             recommendation: "Regular servicing"
 *             call_date: "2026-05-04"
 *             attended_on: "2026-05-05"
 *             completed_on: "2026-05-05"
 *             service_type: "paid"
 *             status: "completed"
 *             customer_feedback: "Good service"
 *             technician_name: "Ravi"
 *     responses:
 *       201:
 *         description: Service created successfully
 */
router.post("/create", auth, controller.createService);


/**
 * @swagger
 * /service:
 *   get:
 *     summary: Get all services (Provider)
 *     tags: [Service]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of services
 */
router.get("/", auth, controller.getAllServices);


/**
 * @swagger
 * /service/owner/all:
 *   get:
 *     summary: Get all services for owner
 *     tags: [Service]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all services
 */
router.get("/owner/all", auth, controller.getAllServicesForOwner);


/**
 * @swagger
 * /service/{id}:
 *   get:
 *     summary: Get service by ID
 *     tags: [Service]
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
 *         description: Service details
 */
router.get("/:id", auth, controller.getServiceById);


/**
 * @swagger
 * /service/{id}:
 *   put:
 *     summary: Update service
 *     tags: [Service]
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
 *             status: "completed"
 *             technician_name: "Updated Tech"
 *     responses:
 *       200:
 *         description: Service updated
 */
router.put("/:id", auth, controller.updateService);


/**
 * @swagger
 * /service/{id}:
 *   delete:
 *     summary: Delete service
 *     tags: [Service]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Service deleted
 */
router.delete("/:id", auth, controller.deleteService);


module.exports = router;