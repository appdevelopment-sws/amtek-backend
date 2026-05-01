module.exports = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.validateAsync(req.body);
            next();
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }
    };
};