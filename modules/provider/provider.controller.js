const service = require("./provider.service");

//Create Provider
exports.createProvider = async (req, res, next) => {
    try {
        const { name, phone, email, password } = req.body;

        // 🔐 Auth check
        if (!req.user || !req.user.id) {
            const err = new Error("Unauthorized");
            err.statusCode = 401;
            throw err;
        }

        // ✅ Required fields
        if (!name || !email || !password) {
            const err = new Error("Name, email and password are required");
            err.statusCode = 400;
            throw err;
        }

        // ✅ Email format
        if (!/\S+@\S+\.\S+/.test(email)) {
            const err = new Error("Invalid email format");
            err.statusCode = 400;
            throw err;
        }

        // ✅ Phone validation (optional but good)
        if (phone && !/^\d{10}$/.test(phone)) {
            const err = new Error("Phone must be 10 digits");
            err.statusCode = 400;
            throw err;
        }

        // ✅ Password validation
        if (password.length < 6) {
            const err = new Error("Password must be at least 6 characters");
            err.statusCode = 400;
            throw err;
        }

        const owner_id = req.user.id;

        const provider = await service.createProvider({
            owner_id,
            name,
            phone,
            email,
            password
        });

        res.status(201).json({
            success: true,
            data: provider
        });

    } catch (err) {
        next(err);
    }
};

exports.loginProvider = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            const err = new Error("Email and password are required");
            err.statusCode = 400;
            throw err;
        }

        const result = await service.loginProvider({ email, password });

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (err) {
        next(err);
    }
};

exports.getAllProviders = async (req, res, next) => {
    try {
        const owner_id = req.user.id;

        const providers = await service.getAllProviders(owner_id);

        res.status(200).json({
            success: true,
            data: providers
        });

    } catch (err) {
        next(err);
    }
};

exports.getProviderById = async (req, res, next) => {
    try {
        const owner_id = req.user.id;
        const { id } = req.params;

        const provider = await service.getProviderById(id, owner_id);

        res.status(200).json({
            success: true,
            data: provider
        });

    } catch (err) {
        next(err);
    }
};

exports.updateProvider = async (req, res, next) => {
    try {
        const owner_id = req.user.id;
        const { id } = req.params;
        const { name, phone, email } = req.body;

        // ✅ ID validation
        if (!id || isNaN(id)) {
            const err = new Error("Invalid provider ID");
            err.statusCode = 400;
            throw err;
        }

        // ❗ At least one field must be provided (not empty)
        if (
            name === undefined &&
            phone === undefined &&
            email === undefined
        ) {
            const err = new Error("At least one field is required to update");
            err.statusCode = 400;
            throw err;
        }

        // ❗ Prevent empty values
        if (name !== undefined && name.trim() === "") {
            const err = new Error("Name cannot be empty");
            err.statusCode = 400;
            throw err;
        }

        // ✅ Email validation
        if (email !== undefined && !/\S+@\S+\.\S+/.test(email)) {
            const err = new Error("Invalid email format");
            err.statusCode = 400;
            throw err;
        }

        // ✅ Phone validation
        if (phone !== undefined && !/^\d{10}$/.test(phone)) {
            const err = new Error("Phone must be 10 digits");
            err.statusCode = 400;
            throw err;
        }

        const updated = await service.updateProvider(id, owner_id, req.body);

        res.status(200).json({
            success: true,
            data: updated
        });

    } catch (err) {
        next(err);
    }
};

exports.deleteProvider = async (req, res, next) => {
    try {
        const owner_id = req.user.id;
        const { id } = req.params;

        const deleted = await service.deleteProvider(id, owner_id);

        res.status(200).json({
            success: true,
            data: deleted
        });

    } catch (err) {
        next(err);
    }
};