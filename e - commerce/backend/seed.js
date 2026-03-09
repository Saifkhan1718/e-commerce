const mongoose = require("mongoose");
const Product = require("./models/Product");

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce")
    .then(() => console.log("MongoDB Connected"));

const products = [
    { name: "HP Laptop", price: 52000, image: "https://m.media-amazon.com/images/I/71an9eiBxpL._SX679_.jpg" },
    { name: "Samsung Galaxy Phone", price: 22000, image: "https://m.media-amazon.com/images/I/81ZSn2rk9WL._SX679_.jpg" },
    { name: "Sony Headphones", price: 3500, image: "https://m.media-amazon.com/images/I/61CGHv6kmWL._SX679_.jpg" },
    { name: "Apple Watch", price: 45000, image: "https://m.media-amazon.com/images/I/71Swqqe7XAL._SX679_.jpg" },
    { name: "Dell Monitor", price: 12000, image: "https://tse2.mm.bing.net/th/id/OIP.wqNcJRp9rIs6-eHreAY8agHaGH?rs=1&pid=ImgDetMain&o=7&rm=3" },
    { name: "Gaming Keyboard", price: 2500, image: "https://th.bing.com/th/id/OIP.uWcrMZ-jCYrHZ85flan5NgHaEK?w=260&h=180&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3" },
    { name: "Logitech Mouse", price: 1500, image: "https://m.media-amazon.com/images/I/61mpMH5TzkL._SX679_.jpg" },
    { name: "Canon DSLR Camera", price: 65000, image: "https://wallpaperaccess.com/full/1970266.jpg" },
    { name: "Bluetooth Speaker", price: 3000, image: "https://m.media-amazon.com/images/I/81yxqCbl5WL._AC_.jpg" },
    { name: "Smart TV", price: 42000, image: "https://st2.depositphotos.com/1000128/5298/i/950/depositphotos_52982327-stock-photo-smart-tv.jpg" },
    { name: "Tablet", price: 18000, image: "https://m.media-amazon.com/images/I/71Q1Iu4suSL._SX679_.jpg" },
    { name: "Power Bank", price: 1200, image: "https://tse1.mm.bing.net/th/id/OIP.RvrVVgm5vRSOgGT9stzLeAHaGk?rs=1&pid=ImgDetMain&o=7&rm=3" },
    { name: "External Hard Drive", price: 5500, image: "https://m.media-amazon.com/images/I/71jG+e7roXL._SX679_.jpg" },
    { name: "Wireless Earbuds", price: 4000, image: "https://m.media-amazon.com/images/I/61SUj2aKoEL._SX679_.jpg" },
    { name: "Gaming Chair", price: 15000, image: "https://img.freepik.com/premium-photo/image-comfortable-beautiful-gaming-chair_800563-4856.jpg" },
    { name: "Mechanical Keyboard", price: 4800, image: "https://th.bing.com/th/id/OIP.uWcrMZ-jCYrHZ85flan5NgHaEK?w=260&h=180&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3" },
    { name: "iPad", price: 55000, image: "https://m.media-amazon.com/images/I/71S8U9VzLTL._SX679_.jpg" },
    { name: "Printer", price: 9000, image: "https://m.media-amazon.com/images/I/61LtuGzXeaL._SX679_.jpg" },
    { name: "Webcam", price: 2500, image: "https://www.bing.com/th/id/OIP.OBp10dCojYdw6-F09BpeUQHaHa?w=190&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.4&pid=3.1&rm=2" },
    { name: "Router", price: 3500, image: "https://tse2.mm.bing.net/th/id/OIP.fReazS-Nx00yoWIM5QQ_FwHaE9?rs=1&pid=ImgDetMain&o=7&rm=3" }
];

const seedProducts = async () => {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("Products Seeded Successfully!");
    process.exit();
};

seedProducts();