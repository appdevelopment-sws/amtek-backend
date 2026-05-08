const repo = require("./customer.repository");


// Create Customer
exports.createCustomer = async (data) => {
    const {
        provider_id,
        owner_id,
        name,
        phone,
        email,
        address,
        call_date
    } = data;

    //Required fields validation
    if (!name || !phone || !address || !call_date) {
        const err = new Error("Name, phone, address and call_date are required");
        err.statusCode = 400;
        throw err;
    }

    //Name validation
    if (name.trim().length < 2) {
        const err = new Error("Name must be at least 2 characters");
        err.statusCode = 400;
        throw err;
    }

    //Phone validation (10 digits)
    if (!/^\d{10}$/.test(phone)) {
        const err = new Error("Phone must be 10 digits");
        err.statusCode = 400;
        throw err;
    }

    //Email validation (optional)
    if (email && !/\S+@\S+\.\S+/.test(email)) {
        const err = new Error("Invalid email format");
        err.statusCode = 400;
        throw err;
    }

    //Date validation
    if (isNaN(Date.parse(call_date))) {
        const err = new Error("Invalid call date");
        err.statusCode = 400;
        throw err;
    }

    const customerId = await repo.createCustomer(data);

    return {
        id: customerId,
        name,
        phone,
        email,
        address
    };
};


// Get All Customers (provider only)
exports.getAllCustomers = async (provider_id) => {
    if (!provider_id) {
        const err = new Error("Unauthorized");
        err.statusCode = 401;
        throw err;
    }

    return await repo.getAllCustomers(provider_id);
};


// Get Customer By ID
exports.getCustomerById = async (id, provider_id) => {
    if (!id || isNaN(id)) {
        const err = new Error("Invalid customer ID");
        err.statusCode = 400;
        throw err;
    }

    const customer = await repo.getCustomerById(id, provider_id);

    if (!customer) {
        const err = new Error("Customer not found");
        err.statusCode = 404;
        throw err;
    }

    return customer;
};


// Update Customer
exports.updateCustomer = async (id, provider_id, data) => {
    if (!id || isNaN(id)) {
        const err = new Error("Invalid customer ID");
        err.statusCode = 400;
        throw err;
    }

    //At least one field required
    if (Object.keys(data).length === 0) {
        const err = new Error("No data provided for update");
        err.statusCode = 400;
        throw err;
    }

    //Field-level validation
    if (data.name !== undefined && data.name.trim() === "") {
        throw Object.assign(new Error("Name cannot be empty"), { statusCode: 400 });
    }

    if (data.phone !== undefined && !/^\d{10}$/.test(data.phone)) {
        throw Object.assign(new Error("Phone must be 10 digits"), { statusCode: 400 });
    }

    if (data.email !== undefined && !/\S+@\S+\.\S+/.test(data.email)) {
        throw Object.assign(new Error("Invalid email format"), { statusCode: 400 });
    }

    if (data.call_date !== undefined && isNaN(Date.parse(data.call_date))) {
        throw Object.assign(new Error("Invalid call date"), { statusCode: 400 });
    }

    const updated = await repo.updateCustomer(id, provider_id, data);

    if (!updated) {
        const err = new Error("Customer not found or not authorized");
        err.statusCode = 404;
        throw err;
    }

    return { message: "Customer updated successfully" };
};


// Delete Customer
exports.deleteCustomer = async (id, provider_id) => {
    if (!id || isNaN(id)) {
        const err = new Error("Invalid customer ID");
        err.statusCode = 400;
        throw err;
    }

    const deleted = await repo.deleteCustomer(id, provider_id);

    if (!deleted) {
        const err = new Error("Customer not found or not authorized");
        err.statusCode = 404;
        throw err;
    }

    return { message: "Customer deleted successfully" };
};


// Get All Customers by Owner (owner can see all their providers' customers)
exports.getAllCustomersByOwner = async (owner_id) => {
    if (!owner_id) {
        const err = new Error("Unauthorized");
        err.statusCode = 401;
        throw err;
    }

    return await repo.getAllCustomersByOwner(owner_id);
};