require("dotenv").config();
const bcrypt = require("bcrypt");
const db = require("../config/db");

const runSeeder = async () => {
    try {
        console.log("🌱 Seeding started...");

        // 🔹 Clear existing data (order matters because of FK)
        await db.query("DELETE FROM services");
        await db.query("DELETE FROM customers");
        await db.query("DELETE FROM providers");
        await db.query("DELETE FROM owners");

        // 🔹 Create Owner
        const ownerPassword = await bcrypt.hash("123456", 12);

        const [ownerResult] = await db.query(
            "INSERT INTO owners (name, email, password) VALUES (?, ?, ?)",
            ["Sahil Kumar", "owner@example.com", ownerPassword]
        );

        const owner_id = ownerResult.insertId;

        // 🔹 Create Provider
        const providerPassword = await bcrypt.hash("123456", 12);

        const [providerResult] = await db.query(
            "INSERT INTO providers (owner_id, name, phone, email, password) VALUES (?, ?, ?, ?, ?)",
            [owner_id, "Rahul Provider", "9876543210", "provider@example.com", providerPassword]
        );

        const provider_id = providerResult.insertId;

        // 🔹 Create Customer
        const [customerResult] = await db.query(
            `INSERT INTO customers 
            (provider_id, owner_id, name, phone, email, address, complaint_description, call_date)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                provider_id,
                owner_id,
                "Test Customer",
                "9999999999",
                "customer@example.com",
                "Patna",
                "Machine not working",
                "2026-05-05"
            ]
        );

        const customer_id = customerResult.insertId;

        // 🔹 Create Service
        await db.query(
            `INSERT INTO services 
            (provider_id, owner_id, customer_id, service_date, complaint, status)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                provider_id,
                owner_id,
                customer_id,
                "2026-05-05",
                "AC not cooling",
                "pending"
            ]
        );

        console.log("✅ Seeding completed successfully!");
        process.exit();

    } catch (err) {
        console.error("❌ Seeder error:", err);
        process.exit(1);
    }
};

runSeeder();