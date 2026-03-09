
let productContainer = document.getElementById("products");
let cartContainer = document.getElementById("cart");
let totalElement = document.getElementById("total");
let cartCountElement = document.getElementById("cart-count");

let products = [];

// 🔹 Load Products (Public Route)
fetch("http://localhost:5000/api/products")
    .then(res => res.json())
    .then(data => {
        products = data;
        displayProducts();
    });


// 🔹 Load Cart (Protected)
function loadCart() {

    fetch("http://localhost:5000/api/cart", {
        headers: {
            "Authorization": localStorage.getItem("token")
        }
    })
    .then(res => res.json())
    .then(data => renderCart(data));
}


// 🔹 Display Products
function displayProducts() {

    productContainer.innerHTML = "";

    products.forEach(product => {

        productContainer.innerHTML += `
            <div class="product-card">

                <div onclick="openProduct('${product._id}')" style="cursor:pointer">

                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>

                    <div class="rating">
                        ★★★★☆ (1,200)
                    </div>

                    <p class="price">₹${product.price}</p>

                </div>

                <button onclick="addToCart('${product._id}')">
                    Add to Cart
                </button>

            </div>
            `;
    });
}


// 🔹 Add To Cart (Protected)
function addToCart(id) {

    fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        },
        body: JSON.stringify({ productId: id })
    })
    .then(res => res.json())
    .then(data => renderCart(data));
}


// 🔹 Update Quantity (+ / −)
function updateQuantity(id, action) {

    fetch("http://localhost:5000/api/cart/update", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        },
        body: JSON.stringify({ productId: id, action })
    })
    .then(res => res.json())
    .then(data => renderCart(data));
}


// 🔹 Remove Item
function removeFromCart(id) {

    fetch("http://localhost:5000/api/cart/remove", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        },
        body: JSON.stringify({ productId: id })
    })
    .then(res => res.json())
    .then(data => renderCart(data));
}


// 🔹 Checkout
function checkout() {

    fetch("http://localhost:5000/api/orders/checkout", {
        method: "POST",
        headers: {
            "Authorization": localStorage.getItem("token")
        }
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        loadCart();
    });
}


// 🔹 Render Cart
function renderCart(cart) {

    cartContainer.innerHTML = "";
    let total = 0;
    let totalItems = 0;

    if (!cart.items) return;

    cart.items.forEach(item => {

        const product = item.product;
        if (!product) return;

        total += product.price * item.quantity;
        totalItems += item.quantity;

        cartContainer.innerHTML += `
            <li>
                <strong>${product.name}</strong><br>
                ₹${product.price}
                <br><br>
                <button onclick="updateQuantity('${product._id}', 'decrease')">−</button>
                ${item.quantity}
                <button onclick="updateQuantity('${product._id}', 'increase')">+</button>
            </li>
        `;
    });

    totalElement.innerText = "Total: ₹" + total;
    cartCountElement.innerText = `(${totalItems})`;
}

function openProduct(id) {

    window.location.href = `product.html?id=${id}`;

}

// 🔹 Initial Load
loadCart();