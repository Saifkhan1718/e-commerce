// Global State
let allProducts = [];
let cart = { items: [] };
let currentCategory = "All";
let maxPrice = 70000;
let searchQuery = "";

// Initial Setup on load
document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    if (token) {
        navigateTo("shop");
    } else {
        navigateTo("login");
    }
});

// CENTRAL SPA NAVIGATION
function navigateTo(view, params = {}) {
    console.log(`SPA Navigating to: ${view}`, params);

    // 1. Manage Active Class on Views
    const views = ["login-view", "shop-view", "product-view", "cart-view"];
    views.forEach(v => {
        const el = document.getElementById(v);
        if (el) el.classList.remove("active");
    });

    const activeEl = document.getElementById(`${view}-view`);
    if (activeEl) activeEl.classList.add("active");

    // 2. Manage Navbar visibility and Body class
    const navbar = document.getElementById("top-navbar");
    if (view === "login") {
        document.body.classList.add("login-active");
        if (navbar) navbar.style.display = "none";
    } else {
        document.body.classList.remove("login-active");
        if (navbar) navbar.style.display = "flex";
        loadCartCount(); // Keep cart count updated in navbar
    }

    // 3. Trigger View Load Actions
    if (view === "shop") {
        fetchProducts();
    } else if (view === "product" && params.productId) {
        showProductDetails(params.productId);
    } else if (view === "cart") {
        fetchCart();
    }
}

// 🔑 LOGIN LOGIC
function handleLogin() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const messageEl = document.getElementById("message");
    const loader = document.getElementById("loginLoader");
    const btnText = document.querySelector("#loginBtn .btn-text");

    if (!email || !password) {
        if (messageEl) messageEl.innerText = "Please fill in all fields.";
        return;
    }

    // Show Loader
    if (btnText) btnText.style.opacity = "0.5";
    if (loader) loader.style.display = "block";
    if (messageEl) messageEl.innerText = "";

    fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })
    .then(res => {
        if (!res.ok) throw new Error("Credentials check failed.");
        return res.json();
    })
    .then(data => {
        console.log("Login Success:", data);
        localStorage.setItem("token", data.token);
        navigateTo("shop");
    })
    .catch(err => {
        console.error(err);
        if (messageEl) messageEl.innerText = "Login failed. Check your backend/credentials.";
    })
    .finally(() => {
        if (btnText) btnText.style.opacity = "1";
        if (loader) loader.style.display = "none";
    });
}

function logout() {
    localStorage.removeItem("token");
    navigateTo("login");
}

// 📦 PRODUCTS & CATEGORY FILTER LOGIC
function fetchProducts() {
    fetch("http://localhost:5000/api/products")
        .then(res => res.json())
        .then(data => {
            allProducts = data;
            renderProductGrid();
        })
        .catch(err => {
            console.error("Error fetching products:", err);
            document.getElementById("products").innerHTML = `<p>Error loading products. Ensure backend is running.</p>`;
        });
}

function renderProductGrid() {
    const productsContainer = document.getElementById("products");
    if (!productsContainer) return;

    productsContainer.innerHTML = "";

    // Filter Products based on Category, Price, and Search Query
    const filtered = allProducts.filter(p => {
        const matchesCategory = (currentCategory === "All" || p.category === currentCategory);
        const matchesPrice = (p.price <= maxPrice);
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesPrice && matchesSearch;
    });

    if (filtered.length === 0) {
        productsContainer.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #555;">No products found matching the criteria.</p>`;
        return;
    }

    filtered.forEach(product => {
        productsContainer.innerHTML += `
            <div class="product-card">
                <div onclick="navigateTo('product', { productId: '${product._id}' })" style="cursor: pointer;">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <div class="rating">★★★★☆ (1,200)</div>
                    <p class="price">₹${product.price}</p>
                </div>
                <button onclick="handleAddToCart('${product._id}', this)">
                    Add to Cart
                </button>
            </div>
        `;
    });
}

// Sidebar Category Toggles
function filterCategory(category, element) {
    currentCategory = category;
    
    // Toggle active sidebar item style
    const listItems = document.querySelectorAll("#category-list li");
    listItems.forEach(li => li.classList.remove("active"));
    element.classList.add("active");

    // Update Title & Render
    document.getElementById("current-category-title").innerText = `${category} Products`;
    renderProductGrid();
}

// Sidebar Price Toggles
function filterPrice(value) {
    maxPrice = parseInt(value);
    document.getElementById("price-val").innerText = maxPrice;
    renderProductGrid();
}

// Search bar toggle
function handleSearch() {
    searchQuery = document.getElementById("search-input").value;
    renderProductGrid();
}

// 🔍 PRODUCT DETAILS PAGE LOAD
function showProductDetails(productId) {
    console.log("Loading product details for:", productId);
    const product = allProducts.find(p => p._id === productId);

    if (!product) {
        document.getElementById("productName").innerText = "Product Not Found";
        return;
    }

    document.getElementById("productImage").src = product.image;
    document.getElementById("productName").innerText = product.name;
    document.getElementById("productPrice").innerText = "₹" + product.price;

    const addBtn = document.getElementById("addBtn");
    addBtn.className = "cart-btn";
    addBtn.innerText = "Add to Cart";
    addBtn.disabled = false;
    addBtn.onclick = () => handleAddToCart(productId, addBtn);
}

// 🛒 CART MANAGEMENT & ADD TO CARTUX FEEDBACK
function handleAddToCart(productId, btnElement) {
    console.log("Adding product to cart:", productId);

    // Disable button & show Visual Feedback immediately
    const originalText = btnElement.innerText;
    btnElement.innerText = "Added ✓";
    btnElement.classList.add("added-feedback");
    btnElement.disabled = true;

    fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token") || ""
        },
        body: JSON.stringify({ productId })
    })
    .then(res => {
        if (!res.ok) throw new Error("Add failed");
        return res.json();
    })
    .then(cartData => {
        console.log("Added to cart successfully:", cartData);
        updateCartBadge(cartData);
    })
    .catch(err => {
        console.error(err);
        alert("Failed to add product to cart.");
        // Revert button immediately on error
        btnElement.innerText = originalText;
        btnElement.classList.remove("added-feedback");
        btnElement.disabled = false;
    })
    .finally(() => {
        // Revert feedback styling after 1 second
        setTimeout(() => {
            if (btnElement) {
                btnElement.innerText = "Add to Cart";
                btnElement.classList.remove("added-feedback");
                btnElement.disabled = false;
            }
        }, 1000);
    });
}

function loadCartCount() {
    fetch("http://localhost:5000/api/cart", {
        headers: { "Authorization": localStorage.getItem("token") || "" }
    })
    .then(res => res.json())
    .then(cartData => updateCartBadge(cartData))
    .catch(err => console.error("Error loading cart count:", err));
}

function updateCartBadge(cartData) {
    let totalItems = 0;
    if (cartData && cartData.items) {
        cartData.items.forEach(item => totalItems += item.quantity);
    }
    const cartCountEl = document.getElementById("cart-count");
    if (cartCountEl) {
        cartCountEl.innerText = `(${totalItems})`;
    }
}

// 🧺 CART VIEW RENDERING
function fetchCart() {
    const cartItemsList = document.getElementById("cartItems");
    const cartTotalEl = document.getElementById("total");

    if (cartItemsList) cartItemsList.innerHTML = "<li>Loading cart items...</li>";

    fetch("http://localhost:5000/api/cart", {
        headers: { "Authorization": localStorage.getItem("token") || "" }
    })
    .then(res => res.json())
    .then(cartData => {
        cart = cartData;
        renderCartView();
    })
    .catch(err => {
        console.error("Error loading cart view:", err);
        if (cartItemsList) cartItemsList.innerHTML = "<li>Error loading cart items.</li>";
    });
}

function renderCartView() {
    const cartItemsList = document.getElementById("cartItems");
    const cartTotalEl = document.getElementById("total");
    
    if (!cartItemsList) return;
    
    cartItemsList.innerHTML = "";
    let totalAmount = 0;
    let totalCount = 0;

    if (!cart || !cart.items || cart.items.length === 0) {
        cartItemsList.innerHTML = "<li>Your cart is empty.</li>";
        if (cartTotalEl) cartTotalEl.innerText = "Total: ₹0";
        updateCartBadge(null);
        return;
    }

    cart.items.forEach(item => {
        const product = item.product;
        if (!product) return;

        totalAmount += product.price * item.quantity;
        totalCount += item.quantity;

        cartItemsList.innerHTML += `
            <li style="display: flex; justify-content: space-between; align-items: center; padding: 15px 0; border-bottom: 1px solid #ddd;">
                <div>
                    <strong style="font-size: 16px;">${product.name}</strong><br>
                    <span style="color: #B12704; font-weight: bold; font-size: 14px;">₹${product.price}</span>
                </div>
                <div style="display: flex; align-items: center;">
                    <button onclick="updateCartQuantity('${product._id}', 'decrease')" style="width: 30px; padding: 5px; margin: 0 2px; cursor: pointer; background-color: #eee; border-radius: 4px;">−</button>
                    <span style="font-weight: bold; margin: 0 8px; font-size: 14px;">${item.quantity}</span>
                    <button onclick="updateCartQuantity('${product._id}', 'increase')" style="width: 30px; padding: 5px; margin: 0 2px; cursor: pointer; background-color: #eee; border-radius: 4px;">+</button>
                    <button onclick="removeCartItem('${product._id}')" style="background-color: #ff4d4d; color: white; width: auto; padding: 5px 10px; border-radius: 5px; margin-left: 15px; cursor: pointer;">Delete</button>
                </div>
            </li>
        `;
    });

    if (cartTotalEl) cartTotalEl.innerText = "Total: ₹" + totalAmount;
    updateCartBadge(cart);
}

function updateCartQuantity(productId, action) {
    fetch("http://localhost:5000/api/cart/update", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token") || ""
        },
        body: JSON.stringify({ productId, action })
    })
    .then(res => res.json())
    .then(cartData => {
        cart = cartData;
        renderCartView();
    })
    .catch(err => console.error("Error updating cart quantity:", err));
}

function removeCartItem(productId) {
    fetch("http://localhost:5000/api/cart/remove", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token") || ""
        },
        body: JSON.stringify({ productId })
    })
    .then(res => res.json())
    .then(cartData => {
        cart = cartData;
        renderCartView();
    })
    .catch(err => console.error("Error removing cart item:", err));
}

// 💳 CHECKOUT / ORDER PLACEMENT
function handleCheckout() {
    if (!cart || !cart.items || cart.items.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    fetch("http://localhost:5000/api/orders/checkout", {
        method: "POST",
        headers: { "Authorization": localStorage.getItem("token") || "" }
    })
    .then(res => res.json())
    .then(data => {
        alert("🎉 Payment Successful! " + data.message);
        cart = { items: [] };
        navigateTo("shop");
    })
    .catch(err => {
        console.error("Checkout failed:", err);
        alert("Checkout failed. Please try again.");
    });
}
