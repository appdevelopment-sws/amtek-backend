const { runMigrations } = require("./config/migrate");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const basicAuth = require("express-basic-auth");



app.set("trust proxy", 1);


// app.use(helmet());
app.use(cors()); // Security disabled - allow all origins

app.use(express.json());

//Rate limiter 
// Security disabled: rate limiting commented out
// app.use(rateLimit({ ... }));

//Routes
const ownerRoutes = require("./modules/owner/owner.routes");
const providerRoutes = require("./modules/provider/provider.routes");
const customerRoutes = require("./modules/customer/customer.routes");
const servicesRoutes = require("./modules/services/service.routes");
const dashboardRoutes = require("./modules/dashboard/dashboard.routes");
const uploadRoutes = require("./modules/upload/upload.routes");


// Serve static files from the uploads directory
app.use("/uploads", express.static("uploads"));

app.use("/api/owner", ownerRoutes);
app.use("/api/provider", providerRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/service", servicesRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/upload", uploadRoutes);


//swagger documentation
// Security disabled: basic auth removed for easy access
// if (process.env.NODE_ENV === "production") {
//     app.use("/api-docs", basicAuth(...));
// }

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
        explorer: true,
        customSiteTitle: "Provider API Docs"
    })
);

app.get("/", (req, res) => {
    res.send("Backend running 🚀");
});


app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});


app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await runMigrations(); // 🔥 THIS LINE

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

startServer();
