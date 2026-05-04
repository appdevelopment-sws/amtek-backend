const swaggerJsdoc = require("swagger-jsdoc");

const isProduction = process.env.NODE_ENV === "production";

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: " API Documentation",
        version: "1.0.0",
        description: "API documentation for Amtek Application"
    },

    servers: [
        {
            url: process.env.BASE_URL || "http://localhost:5000/api",
            description: isProduction ? "Production Server" : "Development Server"
        }
    ],

    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        },

        schemas: {
            Owner: {
                type: "object",
                properties: {
                    id: { type: "integer", example: 1 },
                    name: { type: "string", example: "Sahil Kumar" },
                    email: { type: "string", example: "sahil@example.com" }
                }
            },

            Provider: {
                type: "object",
                properties: {
                    id: { type: "integer", example: 1 },
                    owner_id: { type: "integer", example: 1 },
                    name: { type: "string", example: "Rahul Kumar" },
                    phone: { type: "string", example: "9876543210" },
                    email: { type: "string", example: "rahul@example.com" }
                }
            },

            SuccessResponse: {
                type: "object",
                properties: {
                    success: { type: "boolean", example: true },
                    data: { type: "object" }
                }
            },

            ErrorResponse: {
                type: "object",
                properties: {
                    success: { type: "boolean", example: false },
                    message: { type: "string", example: "Error message" }
                }
            }
        }
    },

    security: [
        {
            bearerAuth: []
        }
    ]
};

const options = {
    definition: swaggerDefinition,
    apis: ["./modules/**/*.js"] // adjust if your folder structure differs
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;