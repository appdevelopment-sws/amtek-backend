const service = require("./dashboard.service");

exports.getDashboardStats = async (req, res, next) => {
    try {
        const ownerId = req.user.id;
        const data = await service.getDashboardStats(ownerId);

        return res.status(200).json({
            success: true,
            message: "Dashboard statistics fetched successfully",
            data
        });

    } catch (error) {
        next(error);
    }
};


// Provider dashboard
exports.getProviderDashboardStats = async (req, res, next) => {
    try {

        const providerId = req.user.id;

        const data = await service.getProviderDashboardStats(providerId);

        return res.status(200).json({
            success: true,
            message: "Provider dashboard fetched successfully",
            data
        });

    } catch (error) {
        next(error);
    }
};