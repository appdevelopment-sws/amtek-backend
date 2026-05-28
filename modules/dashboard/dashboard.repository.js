const db = require("../../config/db");

exports.getDashboardStats = async (ownerId) => {

    const query = `
        SELECT
            (SELECT COUNT(*) FROM providers WHERE owner_id = ?) AS totalProviders,
            (SELECT COUNT(*) FROM customers WHERE owner_id = ?) AS totalCustomers,
            (SELECT COUNT(*) FROM services WHERE owner_id = ?) AS totalServices
    `;

    const [rows] = await db.query(query, [ownerId, ownerId, ownerId]);

    return rows[0];
};

// Provider dashboard stats
exports.getProviderDashboardStats = async (providerId) => {

    const query = `
        SELECT
            (SELECT COUNT(*) FROM services WHERE provider_id = ?) AS totalServices,
            (SELECT COUNT(*) FROM customers WHERE provider_id = ?) AS totalCustomers
    `;

    const [rows] = await db.query(query, [
        providerId,
        providerId
    ]);

    return rows[0];
};