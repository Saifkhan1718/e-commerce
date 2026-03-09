const jwt = require("jsonwebtoken");

const SECRET = "mysecretkey";

// 🔹 Register (Optional – can keep or ignore)
exports.register = async (req, res) => {
    res.json({ message: "Registration disabled in demo mode" });
};


// 🔹 Login (Allow Anyone)
exports.login = async (req, res) => {

    // Create a fake user ID (valid Mongo ObjectId format)
    const fakeUserId = "64b123456789012345678901";

    // Generate token
    const token = jwt.sign({ id: fakeUserId }, SECRET);

    res.json({
        message: "Login successful",
        token: token
    });
};