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
        "SELECT id, name, email, password, owner_id FROM providers WHERE email = ?",
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


//Get all providers
const getAllProviders = async (owner_id) => {
    const [rows] = await db.query(
        "SELECT id, owner_id, name, phone, email FROM providers WHERE owner_id = ?",
        [owner_id]
    );
    return rows;
};

//Get provider by ID
const getProviderById = async (id, owner_id) => {
    const [rows] = await db.query(
        "SELECT id, owner_id, name, phone, email FROM providers WHERE id = ? AND owner_id = ?",
        [id, owner_id]
    );
    return rows[0] || null;
};


//Update provider
const updateProvider = async (id, owner_id, data) => {
    let fields = [];
    let values = [];

    if (data.name) {
        fields.push("name = ?");
        values.push(data.name);
    }

    if (data.phone) {
        fields.push("phone = ?");
        values.push(data.phone);
    }

    if (data.email) {
        fields.push("email = ?");
        values.push(data.email);
    }

    if (fields.length === 0) return 0;

    values.push(id, owner_id);

    const [result] = await db.query(
        `UPDATE providers SET ${fields.join(", ")} WHERE id = ? AND owner_id = ?`,
        values
    );

    return result.affectedRows;
};


//Delete provider
const deleteProvider = async (id, owner_id) => {
    const [result] = await db.query(
        "DELETE FROM providers WHERE id = ? AND owner_id = ?",
        [id, owner_id]
    );

    return result.affectedRows;
};

module.exports = {
    findByEmail,
    findFullByEmail,
    createProvider,

    // new exports
    getAllProviders,
    getProviderById,
    updateProvider,
    deleteProvider
};