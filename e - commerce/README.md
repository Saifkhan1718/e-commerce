# 🛒 Saif Store - E-Commerce Web Application

A modern, full-stack E-Commerce web application built with Vanilla JavaScript, HTML5 Canvas particles, CSS3 glassmorphism design system, Node.js, Express API, and MongoDB Cloud Database.

---

## 🌐 Live Application Links

- 🚀 **Live Web App (Vercel)**: [https://e-commerce-alpha-amber-87.vercel.app/](https://e-commerce-alpha-amber-87.vercel.app/)
- ⚙️ **Live Backend API (Render)**: [https://e-commerce-mbcx.onrender.com/](https://e-commerce-mbcx.onrender.com/)
- 🟢 **API Health Check**: [https://e-commerce-mbcx.onrender.com/api/health](https://e-commerce-mbcx.onrender.com/api/health)

---

## ✨ Key Features

- **Interactive Canvas UI**: Animated particle background canvas on the login screen (`particles.js`).
- **Dynamic Navigation**: Seamless view switching between Login, Shop, Product Details, and Cart View.
- **Real-Time Product Discovery**: Filter products dynamically by categories (*Electronics, Fashion, Home & Kitchen, Books, Sports, Beauty*), price range slider, and search query.
- **Cart Management**: Add items to cart, modify item quantities (`+` / `-`), delete items, and calculate total order price in real time with synchronized top navbar badge.
- **Payment & Checkout Simulation**: Process simulated payments and clear cart contents upon order confirmation.
- **Resilient Backend**: Automatic sample product fallback and database auto-seeding to ensure 100% uptime.

---

## 🛠️ Tech Stack & Architecture

### Frontend (`/frontend`)
- **Language & Logic**: Vanilla JavaScript (ES6+ Modules, Fetch API).
- **Styling**: Custom Vanilla CSS3 (Dark Glassmorphism UI, Responsive Flex/Grid Layouts).
- **Animations**: HTML5 Canvas Particle Engine (`particles.js`).
- **Deployment**: **Vercel** Static Hosting.

### Backend (`/backend`)
- **Runtime**: Node.js (v24).
- **Framework**: Express.js (v5).
- **Authentication**: JSON Web Tokens (`jsonwebtoken`).
- **Database**: MongoDB Atlas (Cloud Database via Mongoose ORM).
- **Deployment**: **Render** Node.js Web Service.

---

## 📡 API Endpoints Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Backend server health status check |
| `POST` | `/api/auth/login` | Authenticate user & return JWT token |
| `GET` | `/api/products` | Fetch product catalogue (supports auto-seed) |
| `GET` | `/api/cart` | Retrieve user shopping cart items |
| `POST` | `/api/cart/add` | Add product item to cart |
| `POST` | `/api/cart/update` | Increase / decrease cart item quantity |
| `POST` | `/api/cart/remove` | Delete item from shopping cart |
| `POST` | `/api/orders/checkout` | Process simulated checkout & place order |

---

## 🚀 Local Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Saifkhan1718/e-commerce.git
   cd e-commerce/backend
   ```

2. **Install backend dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file inside `backend/` or export environment variables:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/ecommerce
   ```

4. **Seed Database & Start Server**:
   ```bash
   node seed.js
   node server.js
   ```

5. **Open Frontend**:
   Open `frontend/index.html` in your browser or run via Live Server.

---

## 📄 License
Distributed under the ISC License.
