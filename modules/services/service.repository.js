const db = require("../../config/db");


// 🔹 Create Service
const createService = async (data) => {
    const {
        provider_id,
        owner_id,
        customer_id,
        service_date,
        manufacturer,
        model,
        serial_no,
        manufactured_year,
        complaint,
        resolution,
        spares_replaced,
        recommendation,
        call_date,
        attended_on,
        completed_on,
        service_type,
        status,
        customer_feedback,
        technician_name
    } = data;

    const [result] = await db.query(
        `INSERT INTO services (
            provider_id, owner_id, customer_id,
            service_date,
            manufacturer, model, serial_no, manufactured_year,
            complaint, resolution, spares_replaced, recommendation,
            call_date, attended_on, completed_on,
            service_type, status,
            customer_feedback, technician_name
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            provider_id,
            owner_id,
            customer_id,
            service_date,
            manufacturer,
            model,
            serial_no,
            manufactured_year,
            complaint,
            resolution,
            spares_replaced,
            recommendation,
            call_date,
            attended_on,
            completed_on,
            service_type,
            status,
            customer_feedback,
            technician_name
        ]
    );

    return result.insertId;
};



//Get All Services (Provider only)
const getAllServices = async (provider_id) => {
    const [rows] = await db.query(
        `SELECT * FROM services WHERE provider_id = ? ORDER BY created_at DESC`,
        [provider_id]
    );
    return rows;
};



//Get Service By ID (Provider secured)
const getServiceById = async (id, provider_id) => {
    const [rows] = await db.query(
        `SELECT * FROM services WHERE id = ? AND provider_id = ?`,
        [id, provider_id]
    );
    return rows[0] || null;
};



//Update Service (Dynamic update)
const updateService = async (id, provider_id, data) => {
    let fields = [];
    let values = [];

    Object.keys(data).forEach((key) => {
        fields.push(`${key} = ?`);
        values.push(data[key]);
    });

    if (fields.length === 0) return 0;

    values.push(id, provider_id);

    const [result] = await db.query(
        `UPDATE services SET ${fields.join(", ")} WHERE id = ? AND provider_id = ?`,
        values
    );

    return result.affectedRows;
};



//Delete Service
const deleteService = async (id, provider_id) => {
    const [result] = await db.query(
        `DELETE FROM services WHERE id = ? AND provider_id = ?`,
        [id, provider_id]
    );

    return result.affectedRows;
};



//Owner: Get all services of their providers
const getAllServicesByOwner = async (owner_id) => {
    const [rows] = await db.query(
        `SELECT * FROM services WHERE owner_id = ? ORDER BY created_at DESC`,
        [owner_id]
    );
    return rows;
};


module.exports = {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService,
    getAllServicesByOwner
};