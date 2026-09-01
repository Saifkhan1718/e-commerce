// Dynamic API Base URL Configuration
// Automatically detects local vs production runtime environment

const isLocalhost = Boolean(
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname === "[::1]"
);

// If running locally, connect to local Express server on port 5000.
// When deployed on Vercel, fallback to Render backend API endpoint (or window override).
const API_BASE_URL = isLocalhost
    ? "http://localhost:5000"
    : (window.API_BASE_URL || "https://e-commerce-mbcx.onrender.com");

console.log(`[Config] API Base URL set to: ${API_BASE_URL}`);
