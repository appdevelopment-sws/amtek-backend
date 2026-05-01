const service = require("./owner.service");

//Register
exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const owner = await service.registerOwner({
            name,
            email,
            password
        });

        res.status(201).json({
            success: true,
            data: owner
        });

    } catch (err) {
        next(err);
    }
};

//Login
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const result = await service.loginOwner({ email, password });

        res.json({
            success: true,
            data: result
        });

    } catch (err) {
        next(err);
    }
};