const service = require("./owner.service");

//Register
exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        //Required fields
        if (!name || !email || !password) {
            const err = new Error("Name, email and password are required");
            err.statusCode = 400;
            throw err;
        }

        //Prevent empty name
        if (name.trim() === "") {
            const err = new Error("Name cannot be empty");
            err.statusCode = 400;
            throw err;
        }

        //Email format
        if (!/\S+@\S+\.\S+/.test(email)) {
            const err = new Error("Invalid email format");
            err.statusCode = 400;
            throw err;
        }

        //Password validation
        if (password.length < 6) {
            const err = new Error("Password must be at least 6 characters");
            err.statusCode = 400;
            throw err;
        }

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

        //Required fields
        if (!email || !password) {
            const err = new Error("Email and password are required");
            err.statusCode = 400;
            throw err;
        }

        //Email format
        if (!/\S+@\S+\.\S+/.test(email)) {
            const err = new Error("Invalid email format");
            err.statusCode = 400;
            throw err;
        }

        const result = await service.loginOwner({ email, password });

        res.json({
            success: true,
            data: result
        });

    } catch (err) {
        next(err);
    }
};

// Update owner
exports.updateOwner = async (req, res, next) => {
    try {

        const { id } = req.params;
        const { name, email } = req.body;

        // Required fields
        if (!name || !email) {
            const err = new Error("Name and email are required");
            err.statusCode = 400;
            throw err;
        }

        // Prevent empty name
        if (name.trim() === "") {
            const err = new Error("Name cannot be empty");
            err.statusCode = 400;
            throw err;
        }

        // Email validation
        if (!/\S+@\S+\.\S+/.test(email)) {
            const err = new Error("Invalid email format");
            err.statusCode = 400;
            throw err;
        }

        const updatedOwner = await service.updateOwner(id, {
            name,
            email
        });

        res.status(200).json({
            success: true,
            message: "Owner updated successfully",
            data: updatedOwner
        });

    } catch (err) {
        next(err);
    }
};