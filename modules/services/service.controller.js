const service = require("./service.service");


//Create Service (Provider only)
exports.createService = async (req, res, next) => {
    try {
        if (!req.user || req.user.role !== "provider") {
            throw Object.assign(new Error("Unauthorized"), { statusCode: 401 });
        }

        const provider_id = req.user.id;
        const owner_id = req.user.owner_id;

        const result = await service.createService({
            ...req.body,
            provider_id,
            owner_id
        });

        res.status(201).json({
            success: true,
            data: result
        });

    } catch (err) {
        next(err);
    }
};



//Get All Services (Provider)
exports.getAllServices = async (req, res, next) => {
    try {
        if (!req.user || req.user.role !== "provider") {
            throw Object.assign(new Error("Unauthorized"), { statusCode: 401 });
        }

        const provider_id = req.user.id;

        const services = await service.getAllServices(provider_id);

        res.status(200).json({
            success: true,
            data: services
        });

    } catch (err) {
        next(err);
    }
};



//Get Service by ID (Provider)
exports.getServiceById = async (req, res, next) => {
    try {
        if (!req.user || req.user.role !== "provider") {
            throw Object.assign(new Error("Unauthorized"), { statusCode: 401 });
        }

        const provider_id = req.user.id;
        const { id } = req.params;

        const result = await service.getServiceById(id, provider_id);

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (err) {
        next(err);
    }
};



//Update Service (Provider)
exports.updateService = async (req, res, next) => {
    try {
        if (!req.user || req.user.role !== "provider") {
            throw Object.assign(new Error("Unauthorized"), { statusCode: 401 });
        }

        const provider_id = req.user.id;
        const { id } = req.params;

        const result = await service.updateService(id, provider_id, req.body);

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (err) {
        next(err);
    }
};



//Delete Service (Provider)
exports.deleteService = async (req, res, next) => {
    try {
        if (!req.user || req.user.role !== "provider") {
            throw Object.assign(new Error("Unauthorized"), { statusCode: 401 });
        }

        const provider_id = req.user.id;
        const { id } = req.params;

        const result = await service.deleteService(id, provider_id);

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (err) {
        next(err);
    }
};



// Owner: Get all services of their providers
exports.getAllServicesForOwner = async (req, res, next) => {
    try {
        if (!req.user || req.user.role !== "owner") {
            throw Object.assign(new Error("Unauthorized"), { statusCode: 401 });
        }

        const owner_id = req.user.id;

        const services = await service.getAllServicesByOwner(owner_id);

        res.status(200).json({
            success: true,
            data: services
        });

    } catch (err) {
        next(err);
    }
};