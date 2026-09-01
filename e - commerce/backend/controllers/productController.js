let Product;
try {
    Product = require("../models/Product");
} catch (e) {
    try {
        Product = require("../models/product");
    } catch (e2) {
        console.error("Could not load Product model:", e2);
    }
}

const sampleProducts = [
    { _id: "64b123456789012345678901", name: "HP Laptop", price: 52000, image: "https://m.media-amazon.com/images/I/71an9eiBxpL._SX679_.jpg", category: "Electronics" },
    { _id: "64b123456789012345678902", name: "Samsung Galaxy Phone", price: 22000, image: "https://m.media-amazon.com/images/I/81ZSn2rk9WL._SX679_.jpg", category: "Electronics" },
    { _id: "64b123456789012345678903", name: "Sony Headphones", price: 3500, image: "https://m.media-amazon.com/images/I/61CGHv6kmWL._SX679_.jpg", category: "Electronics" },
    { _id: "64b123456789012345678904", name: "Apple Watch", price: 45000, image: "https://m.media-amazon.com/images/I/71Swqqe7XAL._SX679_.jpg", category: "Fashion" },
    { _id: "64b123456789012345678905", name: "Dell Monitor", price: 12000, image: "https://tse2.mm.bing.net/th/id/OIP.wqNcJRp9rIs6-eHreAY8agHaGH?rs=1&pid=ImgDetMain&o=7&rm=3", category: "Electronics" },
    { _id: "64b123456789012345678906", name: "Gaming Keyboard", price: 2500, image: "https://th.bing.com/th/id/OIP.uWcrMZ-jCYrHZ85flan5NgHaEK?w=260&h=180&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3", category: "Electronics" },
    { _id: "64b123456789012345678907", name: "Logitech Mouse", price: 1500, image: "https://m.media-amazon.com/images/I/61mpMH5TzkL._SX679_.jpg", category: "Electronics" },
    { _id: "64b123456789012345678908", name: "Canon DSLR Camera", price: 65000, image: "https://wallpaperaccess.com/full/1970266.jpg", category: "Electronics" },
    { _id: "64b123456789012345678909", name: "Bluetooth Speaker", price: 3000, image: "https://m.media-amazon.com/images/I/81yxqCbl5WL._AC_.jpg", category: "Electronics" },
    { _id: "64b123456789012345678910", name: "Smart TV", price: 42000, image: "https://st2.depositphotos.com/1000128/5298/i/950/depositphotos_52982327-stock-photo-smart-tv.jpg", category: "Home & Kitchen" },
    { _id: "64b123456789012345678911", name: "Tablet", price: 18000, image: "https://m.media-amazon.com/images/I/71Q1Iu4suSL._SX679_.jpg", category: "Electronics" },
    { _id: "64b123456789012345678912", name: "Power Bank", price: 1200, image: "https://tse1.mm.bing.net/th/id/OIP.RvrVVgm5vRSOgGT9stzLeAHaGk?rs=1&pid=ImgDetMain&o=7&rm=3", category: "Electronics" },
    { _id: "64b123456789012345678913", name: "External Hard Drive", price: 5500, image: "https://m.media-amazon.com/images/I/71jG+e7roXL._SX679_.jpg", category: "Electronics" },
    { _id: "64b123456789012345678914", name: "Wireless Earbuds", price: 4000, image: "https://m.media-amazon.com/images/I/61SUj2aKoEL._SX679_.jpg", category: "Electronics" },
    { _id: "64b123456789012345678915", name: "Gaming Chair", price: 15000, image: "https://img.freepik.com/premium-photo/image-comfortable-beautiful-gaming-chair_800563-4856.jpg", category: "Sports" },
    { _id: "64b123456789012345678916", name: "Mechanical Keyboard", price: 4800, image: "https://th.bing.com/th/id/OIP.uWcrMZ-jCYrHZ85flan5NgHaEK?w=260&h=180&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3", category: "Electronics" },
    { _id: "64b123456789012345678917", name: "iPad", price: 55000, image: "https://m.media-amazon.com/images/I/71S8U9VzLTL._SX679_.jpg", category: "Electronics" },
    { _id: "64b123456789012345678918", name: "Printer", price: 9000, image: "https://m.media-amazon.com/images/I/61LtuGzXeaL._SX679_.jpg", category: "Home & Kitchen" },
    { _id: "64b123456789012345678919", name: "Webcam", price: 2500, image: "https://www.bing.com/th/id/OIP.OBp10dCojYdw6-F09BpeUQHaHa?w=190&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.4&pid=3.1&rm=2", category: "Electronics" },
    { _id: "64b123456789012345678920", name: "Router", price: 3500, image: "https://tse2.mm.bing.net/th/id/OIP.fReazS-Nx00yoWIM5QQ_FwHaE9?rs=1&pid=ImgDetMain&o=7&rm=3", category: "Electronics" },
    { _id: "64b123456789012345678921", name: "Best Science Fiction Novel", price: 450, image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500", category: "Books" },
    { _id: "64b123456789012345678922", name: "Men's Designer Sunglasses", price: 2999, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500", category: "Fashion" },
    { _id: "64b123456789012345678923", name: "Smart Grooming Kit", price: 3500, image: "https://images.unsplash.com/photo-1621607512214-68297480165e?w=500", category: "Beauty" }
];

// GET all products
exports.getProducts = async (req, res) => {
    try {
        if (!Product) {
            return res.json(sampleProducts);
        }
        let products = await Product.find().exec();
        if (!products || products.length === 0) {
            try {
                await Product.insertMany(sampleProducts);
                products = await Product.find().exec();
            } catch (seedErr) {
                console.log("Auto-seed error:", seedErr);
                products = sampleProducts;
            }
        }
        return res.json(products);
    } catch (err) {
        console.error("Database query error in getProducts:", err);
        return res.json(sampleProducts);
    }
};

// POST product
exports.createProduct = async (req, res) => {
    try {
        if (!Product) return res.status(500).json({ error: "Product model missing" });
        const product = new Product(req.body);
        await product.save();
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: "Failed to create product" });
    }
};

// DELETE product
exports.deleteProduct = async (req, res) => {
    try {
        if (!Product) return res.status(500).json({ error: "Product model missing" });
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete product" });
    }
};