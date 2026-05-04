const service = require("./customer.service");


// Create Customer (Provider only)
exports.createCustomer = async (req, res, next) => {
    try {
        // 🔐 Provider auth check
        if (!req.user || !req.user.id || req.user.role !== "provider") {
            const err = new Error("Unauthorized");
            err.statusCode = 401;
            throw err;
        }

        const provider_id = req.user.id;
        const owner_id = req.user.owner_id; // must come from token

        const customer = await service.createCustomer({
            ...req.body,
            provider_id,
            owner_id
        });

        res.status(201).json({
            success: true,
            data: customer
        });

    } catch (err) {
        next(err);
    }
};



// Get All Customers (Provider)
exports.getAllCustomers = async (req, res, next) => {
    try {
        if (!req.user || req.user.role !== "provider") {
            throw Object.assign(new Error("Unauthorized"), { statusCode: 401 });
        }

        const provider_id = req.user.id;

        const customers = await service.getAllCustomers(provider_id);

        res.status(200).json({
            success: true,
            data: customers
        });

    } catch (err) {
        next(err);
    }
};



// Get Customer by ID (Provider)
exports.getCustomerById = async (req, res, next) => {
    try {
        if (!req.user || req.user.role !== "provider") {
            throw Object.assign(new Error("Unauthorized"), { statusCode: 401 });
        }

        const provider_id = req.user.id;
        const { id } = req.params;

        const customer = await service.getCustomerById(id, provider_id);

        res.status(200).json({
            success: true,
            data: customer
        });

    } catch (err) {
        next(err);
    }
};



// Update Customer (Provider)
exports.updateCustomer = async (req, res, next) => {
    try {
        if (!req.user || req.user.role !== "provider") {
            throw Object.assign(new Error("Unauthorized"), { statusCode: 401 });
        }

        const provider_id = req.user.id;
        const { id } = req.params;

        const updated = await service.updateCustomer(id, provider_id, req.body);

        res.status(200).json({
            success: true,
            data: updated
        });

    } catch (err) {
        next(err);
    }
};



// Delete Customer (Provider)
exports.deleteCustomer = async (req, res, next) => {
    try {
        if (!req.user || req.user.role !== "provider") {
            throw Object.assign(new Error("Unauthorized"), { statusCode: 401 });
        }

        const provider_id = req.user.id;
        const { id } = req.params;

        const deleted = await service.deleteCustomer(id, provider_id);

        res.status(200).json({
            success: true,
            data: deleted
        });

    } catch (err) {
        next(err);
    }
};



// 🔥 Owner can view all customers of their providers
exports.getAllCustomersForOwner = async (req, res, next) => {
    try {
        if (!req.user || req.user.role !== "owner") {
            throw Object.assign(new Error("Unauthorized"), { statusCode: 401 });
        }

        const owner_id = req.user.id;

        // ⚠️ we will add this repo function later
        const customers = await service.getAllCustomersByOwner(owner_id);

        res.status(200).json({
            success: true,
            data: customers
        });

    } catch (err) {
        next(err);
    }
};