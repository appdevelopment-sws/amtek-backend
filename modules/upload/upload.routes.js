const express = require("express");
const router = express.Router();
const uploadController = require("./upload.controller");
const upload = require("./upload.middleware");

/**
 * @swagger
 * tags:
 *   name: Upload
 *   description: File upload APIs
 */

/**
 * @swagger
 * /upload/signature/{serviceId}:
 *   post:
 *     summary: Upload a signature image and link it to a service
 *     tags: [Upload]
 *     parameters:
 *       - in: path
 *         name: serviceId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the service to attach the signature to
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               signature:
 *                 type: string
 *                 format: binary
 *                 description: Signature image file
 *     responses:
 *       200:
 *         description: Signature uploaded successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Signature uploaded and saved to service successfully"
 *               data:
 *                 serviceId: "1"
 *                 fileName: "signature-123.png"
 *                 fileUrl: "http://localhost:5000/uploads/signature-123.png"
 *       400:
 *         description: No file uploaded or missing serviceId
 *       500:
 *         description: Internal server error
 */
router.post("/signature/:serviceId", upload.single("signature"), uploadController.uploadSignature);

module.exports = router;
