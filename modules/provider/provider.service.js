const bcrypt = require("bcrypt");
const repo = require("./provider.repository");

// Create Provider 
exports.createProvider = async ({ owner_id, name, phone, email, password }) => {
    const exists = await repo.findByEmail(email);

    if (exists) {
        const err = new Error("Provider already exists");
        err.statusCode = 400;
        throw err;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const providerId = await repo.createProvider({
        owner_id,
        name,
        phone,
        email,
        password: hashedPassword
    });

    return {
        id: providerId,
        name,
        email
    };
};

//Provider Login 
exports.loginProvider = async ({ email, password }) => {
    const provider = await repo.findFullByEmail(email);

    if (!provider) {
        const err = new Error("Invalid email or password");
        err.statusCode = 401;
        throw err;
    }

    const isMatch = await bcrypt.compare(password, provider.password);

    if (!isMatch) {
        const err = new Error("Invalid email or password");
        err.statusCode = 401;
        throw err;
    }

    return {
        provider: {
            id: provider.id,
            name: provider.name,
            email: provider.email
        }
    };
};