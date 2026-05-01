require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();

app.set("trust proxy", 1);


app.use(helmet());
app.use(cors({
    origin: "*",
}));

app.use(express.json());

// 🚦 Rate limiter (production ready)
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        success: false,
        message: "Too many requests, try again later"
    }
}));

//Routes
const ownerRoutes = require("./modules/owner/owner.routes");
const providerRoutes = require("./modules/provider/provider.routes");

app.use("/api/owner", ownerRoutes);
app.use("/api/provider", providerRoutes);


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
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});

// 🚀 Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});