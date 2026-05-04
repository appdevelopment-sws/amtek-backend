const repo = require("./service.repository");


//Create Service
exports.createService = async (data) => {
    const {
        provider_id,
        owner_id,
        customer_id,
        service_date,
        complaint
    } = data;

    //Required validation
    if (!customer_id || !service_date || !complaint) {
        throw Object.assign(
            new Error("customer_id, service_date and complaint are required"),
            { statusCode: 400 }
        );
    }

    //ID validation
    if (isNaN(customer_id)) {
        throw Object.assign(new Error("Invalid customer ID"), { statusCode: 400 });
    }

    //Date validation
    if (isNaN(Date.parse(service_date))) {
        throw Object.assign(new Error("Invalid service date"), { statusCode: 400 });
    }

    //Optional date validations
    ["call_date", "attended_on", "completed_on"].forEach((field) => {
        if (data[field] && isNaN(Date.parse(data[field]))) {
            throw Object.assign(
                new Error(`Invalid ${field}`),
                { statusCode: 400 }
            );
        }
    });

    //Enum validation
    if (data.service_type && !["paid", "warranty"].includes(data.service_type)) {
        throw Object.assign(
            new Error("Invalid service type"),
            { statusCode: 400 }
        );
    }

    if (data.status && !["pending", "in_progress", "completed"].includes(data.status)) {
        throw Object.assign(
            new Error("Invalid status"),
            { statusCode: 400 }
        );
    }

    const serviceId = await repo.createService(data);

    return {
        id: serviceId,
        message: "Service created successfully"
    };
};



//Get All Services (Provider)
exports.getAllServices = async (provider_id) => {
    if (!provider_id) {
        throw Object.assign(new Error("Unauthorized"), { statusCode: 401 });
    }

    return await repo.getAllServices(provider_id);
};



//Get Service By ID
exports.getServiceById = async (id, provider_id) => {
    if (!id || isNaN(id)) {
        throw Object.assign(new Error("Invalid service ID"), { statusCode: 400 });
    }

    const service = await repo.getServiceById(id, provider_id);

    if (!service) {
        throw Object.assign(
            new Error("Service not found or not authorized"),
            { statusCode: 404 }
        );
    }

    return service;
};



//Update Service
exports.updateService = async (id, provider_id, data) => {
    if (!id || isNaN(id)) {
        throw Object.assign(new Error("Invalid service ID"), { statusCode: 400 });
    }

    if (Object.keys(data).length === 0) {
        throw Object.assign(
            new Error("No data provided for update"),
            { statusCode: 400 }
        );
    }

    //Field validations
    if (data.customer_id && isNaN(data.customer_id)) {
        throw Object.assign(new Error("Invalid customer ID"), { statusCode: 400 });
    }

    if (data.service_date && isNaN(Date.parse(data.service_date))) {
        throw Object.assign(new Error("Invalid service date"), { statusCode: 400 });
    }

    ["call_date", "attended_on", "completed_on"].forEach((field) => {
        if (data[field] && isNaN(Date.parse(data[field]))) {
            throw Object.assign(
                new Error(`Invalid ${field}`),
                { statusCode: 400 }
            );
        }
    });

    if (data.service_type && !["paid", "warranty"].includes(data.service_type)) {
        throw Object.assign(new Error("Invalid service type"), { statusCode: 400 });
    }

    if (data.status && !["pending", "in_progress", "completed"].includes(data.status)) {
        throw Object.assign(new Error("Invalid status"), { statusCode: 400 });
    }

    const updated = await repo.updateService(id, provider_id, data);

    if (!updated) {
        throw Object.assign(
            new Error("Service not found or not authorized"),
            { statusCode: 404 }
        );
    }

    return { message: "Service updated successfully" };
};



//Delete Service
exports.deleteService = async (id, provider_id) => {
    if (!id || isNaN(id)) {
        throw Object.assign(new Error("Invalid service ID"), { statusCode: 400 });
    }

    const deleted = await repo.deleteService(id, provider_id);

    if (!deleted) {
        throw Object.assign(
            new Error("Service not found or not authorized"),
            { statusCode: 404 }
        );
    }

    return { message: "Service deleted successfully" };
};



//Owner: Get all services
exports.getAllServicesByOwner = async (owner_id) => {
    if (!owner_id) {
        throw Object.assign(new Error("Unauthorized"), { statusCode: 401 });
    }

    return await repo.getAllServicesByOwner(owner_id);
};