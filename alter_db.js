const db = require("./config/db");

(async () => {
    try {
        console.log("Adding signature_url column to services table...");
        await db.query(`ALTER TABLE services ADD COLUMN signature_url VARCHAR(255)`);
        console.log("Column added successfully!");
    } catch (err) {
        if (err.code === 'ER_DUP_FIELDNAME') {
            console.log("Column already exists.");
        } else {
            console.error(err);
        }
    }
    process.exit(0);
})();
