const bcrypt = require("bcrypt");
const repo = require("./owner.repository");
const jwt = require("jsonwebtoken");

//Register Owner
exports.registerOwner = async ({ name, email, password }) => {
    const exists = await repo.findByEmail(email);

    if (exists) {
        const err = new Error("Owner already exists");
        err.statusCode = 400;
        throw err;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const ownerId = await repo.createOwner({
        name,
        email,
        password: hashedPassword
    });

    return {
        id: ownerId,
        name,
        email
    };
};

//Login Owner
exports.loginOwner = async ({ email, password }) => {
    const owner = await repo.findFullByEmail(email);

    if (!owner) {
        const err = new Error("Invalid email or password");
        err.statusCode = 401;
        throw err;
    }

    const isMatch = await bcrypt.compare(password, owner.password);

    if (!isMatch) {
        const err = new Error("Invalid email or password");
        err.statusCode = 401;
        throw err;
    }

    const token = jwt.sign(
        {
            id: owner.id,
            role: "owner"
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h"
        }
    );

    return {
        token,
        owner: {
            id: owner.id,
            name: owner.name,
            email: owner.email,
            password: owner.password
        }
    };
};

// Update owner
exports.updateOwner = async (id, { name, email }) => {

    // Check if another owner already uses this email
    const existingOwner = await repo.findByEmail(email);

    if (existingOwner && existingOwner.id !== Number(id)) {
        const err = new Error("Email already in use");
        err.statusCode = 400;
        throw err;
    }

    const updated = await repo.updateOwner(id, {
        name,
        email
    });

    if (!updated) {
        const err = new Error("Owner not found");
        err.statusCode = 404;
        throw err;
    }

    return {
        id,
        name,
        email
    };
};