const Product = require("../models/Product");

// GET all products
exports.getProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
};

// POST product
exports.createProduct = async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
};

// DELETE product
exports.deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
};