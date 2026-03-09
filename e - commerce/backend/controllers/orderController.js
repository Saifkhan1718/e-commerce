const Order = require("../models/Order");
const Cart = require("../models/Cart");

exports.checkout = async (req, res) => {

    let cart = await Cart.findOne().populate("items.product");

    if (!cart || cart.items.length === 0) {
        return res.json({ message: "Cart is empty" });
    }

    let total = 0;

    cart.items.forEach(item => {
        total += item.product.price * item.quantity;
    });

    const order = new Order({
        items: cart.items,
        totalAmount: total
    });

    await order.save();

    // Clear cart
    cart.items = [];
    await cart.save();

    res.json({ message: "Order placed successfully!", order });
};