const db = require("../../config/db");

exports.getDashboardStats = async () => {

    const query = `
        SELECT
            (SELECT COUNT(*) FROM owners) AS totalOwners,
            (SELECT COUNT(*) FROM providers) AS totalProviders,
            (SELECT COUNT(*) FROM customers) AS totalCustomers,
            (SELECT COUNT(*) FROM services) AS totalServices
    `;

    const [rows] = await db.query(query);

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