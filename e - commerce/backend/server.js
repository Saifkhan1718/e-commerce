const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, "../frontend")));

// Environment configurations
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://saif:ZKIIjap7nCWwinU7@saif.amdq2i8.mongodb.net/ecommerce?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

// Database Connection
mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 3000 })
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch((err) => console.error("MongoDB Connection Error:", err.message));

// API Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

const cartRoutes = require("./routes/cartRoutes");
app.use("/api/cart", cartRoutes);

const orderRoutes = require("./routes/orderRoutes");
app.use("/api/orders", orderRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Saif Store Backend API is running" });
});

// Fallback to index.html for SPA routing
app.get('/{*splat}', (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
