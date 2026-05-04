const express = require("express");
const router = express.Router();

const controller = require("./customer.controller");
const auth = require("../../middleware/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Customer
 *   description: Customer / Audit management APIs
 */


/**
 * @swagger
 * /customer/create:
 *   post:
 *     summary: Create customer (Provider only)
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "Rahul"
 *             phone: "9876543210"
 *             email: "rahul@example.com"
 *             address: "Delhi"
 *             complaint_description: "Not working"
 *             spare_parts_required: "Motor"
 *             model_serial_no: "ABC123"
 *             manufactured_year: 2020
 *             maker: "Samsung"
 *             call_details: "Visited customer"
 *             call_date: "2026-05-05"
 *     responses:
 *       201:
 *         description: Customer created successfully
 */
router.post("/create", auth, controller.createCustomer);


/**
 * @swagger
 * /customer:
 *   get:
 *     summary: Get all customers (Provider)
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of customers
 */
router.get("/", auth, controller.getAllCustomers);


/**
 * @swagger
 * /customer/owner/all:
 *   get:
 *     summary: Get all customers for owner
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all customers for owner
 */
router.get("/owner/all", auth, controller.getAllCustomersForOwner);


/**
 * @swagger
 * /customer/{id}:
 *   get:
 *     summary: Get customer by ID
 *     tags: [Customer]
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
 *         description: Customer details
 */
router.get("/:id", auth, controller.getCustomerById);


/**
 * @swagger
 * /customer/{id}:
 *   put:
 *     summary: Update customer
 *     tags: [Customer]
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
 *         description: Customer updated
 */
router.put("/:id", auth, controller.updateCustomer);


/**
 * @swagger
 * /customer/{id}:
 *   delete:
 *     summary: Delete customer
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Customer deleted
 */
router.delete("/:id", auth, controller.deleteCustomer);


module.exports = router;