const service = require("./dashboard.service");

exports.getDashboardStats = async (req, res, next) => {
    try {

        const data = await service.getDashboardStats();

        return res.status(200).json({
            success: true,
            message: "Dashboard statistics fetched successfully",
            data
        });

    } catch (error) {
        next(error);
    }
};