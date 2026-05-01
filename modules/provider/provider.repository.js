const db = require("../../config/db");

//Check if provider exists
const findByEmail = async (email) => {
    const [rows] = await db.query(
        "SELECT id FROM providers WHERE email = ?",
        [email]
    );
    return rows[0] || null;
};

//Get full provider
const findFullByEmail = async (email) => {
    const [rows] = await db.query(
        "SELECT id, name, email, password FROM providers WHERE email = ?",
        [email]
    );
    return rows[0] || null;
};

//Create provider
const createProvider = async ({ owner_id, name, phone, email, password }) => {
    const [result] = await db.query(
        "INSERT INTO providers (owner_id, name, phone, email, password) VALUES (?, ?, ?, ?, ?)",
        [owner_id, name, phone, email, password]
    );

    return result.insertId;
};

module.exports = {
    findByEmail,
    findFullByEmail,
    createProvider
};