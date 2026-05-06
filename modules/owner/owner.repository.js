const db = require("../../config/db");

//Check if owner exists
const findByEmail = async (email) => {
    const [rows] = await db.query(
        "SELECT id FROM owners WHERE email = ?",
        [email]
    );
    return rows[0] || null;
};

//Get full owner 
const findFullByEmail = async (email) => {
    const [rows] = await db.query(
        "SELECT id, name, email, password FROM owners WHERE email = ?",
        [email]
    );
    return rows[0] || null;
};

//Create new owner
const createOwner = async ({ name, email, password }) => {
    const [result] = await db.query(
        "INSERT INTO owners (name, email, password) VALUES (?, ?, ?)",
        [name, email, password]
    );
    return result.insertId;
};


const updateOwner = async (id, { name, email }) => {
    const [result] = await db.query(
        `UPDATE owners SET name = ?, email = ? WHERE id = ?`,
        [name, email, id]
    );
    return result.affectedRows;
};



module.exports = {
    findByEmail,
    findFullByEmail,
    createOwner,
    updateOwner
};