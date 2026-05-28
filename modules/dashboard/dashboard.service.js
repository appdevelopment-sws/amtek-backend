const repository = require("./dashboard.repository");

exports.getDashboardStats = async (ownerId) => {

    const stats = await repository.getDashboardStats(ownerId);

    return {
        totalProviders: Number(stats.totalProviders || 0),
        totalCustomers: Number(stats.totalCustomers || 0),
        totalServices: Number(stats.totalServices || 0),
    };
};

exports.getProviderDashboardStats = async (providerId) => {

    const stats = await repository.getProviderDashboardStats(providerId);

    return {
        totalServices: Number(stats.totalServices || 0),
        totalCustomers: Number(stats.totalCustomers || 0)
    };
};