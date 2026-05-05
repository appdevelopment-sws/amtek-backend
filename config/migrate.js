const db = require("../config/db"); // adjust path if needed

//Migration function
const runMigrations = async () => {
    try {
        console.log("🔄 Running migrations...");

        // Example: create tables if not exist

        // Owner table
        await db.query(`
            CREATE TABLE IF NOT EXISTS owners (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100),
                email VARCHAR(100) UNIQUE,
                password VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Provider table
        await db.query(`
            CREATE TABLE IF NOT EXISTS providers (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100),
                service VARCHAR(100),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        console.log("✅ Migrations completed");
    } catch (err) {
        console.error("❌ Migration failed:", err);
        throw err;
    }
};


module.exports = { runMigrations };