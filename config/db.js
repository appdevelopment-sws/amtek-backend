require("dotenv").config(); // ✅ load env FIRST

const mysql = require("mysql2"); // ✅ ONLY ONCE

// 🔹 Create pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// 🔹 Promise wrapper
const db = pool.promise();

// 🔥 Test DB connection immediately
(async () => {
    try {
        const connection = await db.getConnection();
        console.log("✅ MySQL Database connected");
        connection.release();
    } catch (err) {
        console.error("❌ MySQL connection failed:", err.message);
        process.exit(1);
    }
})();

// 🔹 Optional: log pool errors
pool.on("error", (err) => {
    console.error("❌ MySQL Pool Error:", err.message);
});

module.exports = db;