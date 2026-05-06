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