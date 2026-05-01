const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // check header exists
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - No token"
            });
        }

        // extract token
        const token = authHeader.split(" ")[1];

        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // attach user to request
        req.user = decoded;

        next();

    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized - Invalid token"
        });
    }
};