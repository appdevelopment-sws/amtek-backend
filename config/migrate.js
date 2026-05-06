const db = require("../config/db");

// Run Database Migrations
const runMigrations = async () => {
    try {
        console.log("🔄 Running migrations...");



        // OWNERS TABLE
        await db.query(`
            CREATE TABLE IF NOT EXISTS owners (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(150) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                is_active TINYINT(1) DEFAULT 1,
                reset_token VARCHAR(255),
                reset_token_expiry DATETIME,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
                    ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        console.log("✅ Owners table ready");



        // PROVIDERS TABLE
        await db.query(`
            CREATE TABLE IF NOT EXISTS providers (
                id INT AUTO_INCREMENT PRIMARY KEY,
                owner_id INT NOT NULL,
                name VARCHAR(100) NOT NULL,
                phone VARCHAR(15) NOT NULL,
                email VARCHAR(150) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                is_active TINYINT(1) DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
                    ON UPDATE CURRENT_TIMESTAMP,

                CONSTRAINT fk_provider_owner
                    FOREIGN KEY (owner_id)
                    REFERENCES owners(id)
                    ON DELETE CASCADE
            )
        `);

        console.log("✅ Providers table ready");


        // CUSTOMERS TABLE
        await db.query(`
            CREATE TABLE IF NOT EXISTS customers (
                id INT AUTO_INCREMENT PRIMARY KEY,
                provider_id INT NOT NULL,
                owner_id INT NOT NULL,
                name VARCHAR(255) NOT NULL,
                phone VARCHAR(15) NOT NULL,
                email VARCHAR(255),
                address TEXT NOT NULL,
                complaint_description TEXT,
                spare_parts_required TEXT,
                model_serial_no VARCHAR(255),
                manufactured_year INT,
                maker VARCHAR(255),
                call_details TEXT,
                call_date DATE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

                CONSTRAINT fk_customer_provider
                    FOREIGN KEY (provider_id)
                    REFERENCES providers(id)
                    ON DELETE CASCADE,

                CONSTRAINT fk_customer_owner
                    FOREIGN KEY (owner_id)
                    REFERENCES owners(id)
                    ON DELETE CASCADE
            )
        `);

        console.log("✅ Customers table ready");



        // SERVICE RECORDS TABLE
        await db.query(`
            CREATE TABLE IF NOT EXISTS service_records (
                id INT AUTO_INCREMENT PRIMARY KEY,
                provider_id INT NOT NULL,
                owner_id INT NOT NULL,
                customer_id INT NOT NULL,

                service_date DATE,
                manufacturer VARCHAR(255),
                model VARCHAR(255),
                serial_no VARCHAR(255),
                manufactured_year INT,

                complaint TEXT,
                resolution TEXT,
                spares_replaced TEXT,
                recommendation TEXT,

                call_date DATE,
                attended_on DATE,
                completed_on DATE,

                service_type ENUM('paid', 'warranty') DEFAULT 'paid',
                status ENUM(
                    'pending',
                    'in_progress',
                    'completed'
                ) DEFAULT 'pending',

                customer_feedback TEXT,
                technician_name VARCHAR(255),

                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

                CONSTRAINT fk_service_provider
                    FOREIGN KEY (provider_id)
                    REFERENCES providers(id)
                    ON DELETE CASCADE,

                CONSTRAINT fk_service_owner
                    FOREIGN KEY (owner_id)
                    REFERENCES owners(id)
                    ON DELETE CASCADE,

                CONSTRAINT fk_service_customer
                    FOREIGN KEY (customer_id)
                    REFERENCES customers(id)
                    ON DELETE CASCADE
            )
        `);

        console.log("✅ Service records table ready");

        console.log("🎉 All migrations completed successfully");

    } catch (err) {
        console.error("❌ Migration failed:", err);
        throw err;
    }
};

module.exports = { runMigrations };