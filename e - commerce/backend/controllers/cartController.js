const Cart = require("../models/Cart");

// 🔹 GET CART
exports.getCart = async (req, res) => {

    let cart = await Cart.findOne().populate("items.product");

    if (!cart) {
        cart = new Cart({ items: [] });
        await cart.save();
        cart = await Cart.findOne().populate("items.product");
    }

    // ✅ Remove broken (null) products automatically
    cart.items = cart.items.filter(item => item.product !== null);
    await cart.save();

    res.json(cart);
};



// 🔹 ADD TO CART
exports.addToCart = async (req, res) => {

    const { productId } = req.body;

    let cart = await Cart.findOne();

    if (!cart) {
        cart = new Cart({ items: [] });
    }

    const itemIndex = cart.items.findIndex(
        item => item.product.toString() === productId
    );

    if (itemIndex > -1) {
        cart.items[itemIndex].quantity += 1;
    } else {
        cart.items.push({ product: productId, quantity: 1 });
    }

    await cart.save();

    // Fetch populated version
    cart = await Cart.findOne().populate("items.product");

    // ✅ Clean null products
    cart.items = cart.items.filter(item => item.product !== null);
    await cart.save();

    res.json(cart);
};



// 🔹 UPDATE QUANTITY (+ / −)
exports.updateQuantity = async (req, res) => {

    const { productId, action } = req.body;

    let cart = await Cart.findOne();

    if (!cart) return res.json({ items: [] });

    const itemIndex = cart.items.findIndex(
        item => item.product.toString() === productId
    );

    if (itemIndex > -1) {

        if (action === "increase") {
            cart.items[itemIndex].quantity += 1;
        }

        if (action === "decrease") {
            cart.items[itemIndex].quantity -= 1;

            if (cart.items[itemIndex].quantity <= 0) {
                cart.items.splice(itemIndex, 1);
            }
        }
    }

    await cart.save();

    cart = await Cart.findOne().populate("items.product");

    // ✅ Remove null products
    cart.items = cart.items.filter(item => item.product !== null);
    await cart.save();

    res.json(cart);
};



// 🔹 REMOVE ITEM COMPLETELY
exports.removeFromCart = async (req, res) => {

    const { productId } = req.body;

    let cart = await Cart.findOne();

    if (!cart) return res.json({ items: [] });

    cart.items = cart.items.filter(
        item => item.product.toString() !== productId
    );

    await cart.save();

    cart = await Cart.findOne().populate("items.product");

    res.json(cart);
};