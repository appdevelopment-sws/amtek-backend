const db = require("../../config/db");

exports.uploadSignature = async (req, res, next) => {
    try {
        const { serviceId } = req.params;

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded. Please upload a signature."
            });
        }

        if (!serviceId) {
            return res.status(400).json({
                success: false,
                message: "Service ID is required."
            });
        }

        // Construct file URL
        const protocol = req.protocol;
        const host = req.get("host");
        const fileUrl = `${protocol}://${host}/uploads/${req.file.filename}`;

        // Update the services table with the signature URL
        await db.query(`UPDATE services SET signature_url = ? WHERE id = ?`, [fileUrl, serviceId]);

        return res.status(200).json({
            success: true,
            message: "Signature uploaded and saved to service successfully",
            data: {
                serviceId,
                fileName: req.file.filename,
                fileUrl: fileUrl
            }
        });
    } catch (error) {
        next(error);
    }
};
