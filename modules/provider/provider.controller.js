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