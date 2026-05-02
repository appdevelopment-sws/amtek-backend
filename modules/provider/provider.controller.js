const service = require("./provider.service");

//Create Provider
exports.createProvider = async (req, res, next) => {
    try {
        const { name, phone, email, password } = req.body;

        if (!req.user || !req.user.id) {
            const err = new Error("Unauthorized");
            err.statusCode = 401;
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