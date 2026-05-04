const bcrypt = require("bcrypt");
const repo = require("./provider.repository");
const jwt = require("jsonwebtoken");

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
        throw Object.assign(new Error("Invalid email or password"), { statusCode: 401 });
    }

    const isMatch = await bcrypt.compare(password, provider.password);

    if (!isMatch) {
        throw Object.assign(new Error("Invalid email or password"), { statusCode: 401 });
    }

    // 🔥 CREATE JWT TOKEN
    const token = jwt.sign(
        {
            id: provider.id,
            role: "provider",
            owner_id: provider.owner_id
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    // 🔥 RETURN TOKEN + PROVIDER
    return {
        token,
        provider: {
            id: provider.id,
            name: provider.name,
            email: provider.email
        }
    };
};

// Get all providers (only owner's)
exports.getAllProviders = async (owner_id) => {
    return await repo.getAllProviders(owner_id);
};


// Get provider by ID
exports.getProviderById = async (id, owner_id) => {
    const provider = await repo.getProviderById(id, owner_id);

    if (!provider) {
        const err = new Error("Provider not found");
        err.statusCode = 404;
        throw err;
    }

    return provider;
};


// Update provider
exports.updateProvider = async (id, owner_id, data) => {
    const updated = await repo.updateProvider(id, owner_id, data);

    if (!updated) {
        const err = new Error("Provider not found or not authorized");
        err.statusCode = 404;
        throw err;
    }

    return { message: "Provider updated successfully" };
};


// Delete provider
exports.deleteProvider = async (id, owner_id) => {
    const deleted = await repo.deleteProvider(id, owner_id);

    if (!deleted) {
        const err = new Error("Provider not found or not authorized");
        err.statusCode = 404;
        throw err;
    }

    return { message: "Provider deleted successfully" };
};