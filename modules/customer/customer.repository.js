const db = require("../../config/db");

// Create customer
const createCustomer = async (data) => {
    const {
        provider_id,
        owner_id,
        name,
        phone,
        email,
        address,
        complaint_description,
        spare_parts_required,
        model_serial_no,
        manufactured_year,
        maker,
        call_details,
        call_date
    } = data;

    const [result] = await db.query(
        `INSERT INTO customers 
        (provider_id, owner_id, name, phone, email, address, complaint_description, spare_parts_required, model_serial_no, manufactured_year, maker, call_details, call_date)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            provider_id,
            owner_id,
            name,
            phone,
            email,
            address,
            complaint_description,
            spare_parts_required,
            model_serial_no,
            manufactured_year,
            maker,
            call_details,
            call_date
        ]
    );

    return result.insertId;
};


// Get all customers (provider-based)
const getAllCustomers = async (provider_id) => {
    const [rows] = await db.query(
        "SELECT * FROM customers WHERE provider_id = ?",
        [provider_id]
    );
    return rows;
};


// Get customer by ID
const getCustomerById = async (id, provider_id) => {
    const [rows] = await db.query(
        "SELECT * FROM customers WHERE id = ? AND provider_id = ?",
        [id, provider_id]
    );
    return rows[0] || null;
};


// Update customer
const updateCustomer = async (id, provider_id, data) => {
    let fields = [];
    let values = [];

    Object.keys(data).forEach((key) => {
        fields.push(`${key} = ?`);
        values.push(data[key]);
    });

    if (fields.length === 0) return 0;

    values.push(id, provider_id);

    const [result] = await db.query(
        `UPDATE customers SET ${fields.join(", ")} WHERE id = ? AND provider_id = ?`,
        values
    );

    return result.affectedRows;
};


// Delete customer
const deleteCustomer = async (id, provider_id) => {
    const [result] = await db.query(
        "DELETE FROM customers WHERE id = ? AND provider_id = ?",
        [id, provider_id]
    );

    return result.affectedRows;
};


// Get all customers by owner (owner sees all their providers' customers)
const getAllCustomersByOwner = async (owner_id) => {
    const [rows] = await db.query(
        "SELECT * FROM customers WHERE owner_id = ?",
        [owner_id]
    );
    return rows;
};


module.exports = {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
    getAllCustomersByOwner
};