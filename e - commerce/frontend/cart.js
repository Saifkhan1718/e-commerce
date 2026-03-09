let cartList = document.getElementById("cartItems");
let totalElement = document.getElementById("total");

fetch("http://localhost:5000/api/cart")
.then(res=>res.json())
.then(cart=>{

let total = 0;

cart.items.forEach(item=>{

const product = item.product;

total += product.price * item.quantity;

cartList.innerHTML += `
<li>
${product.name} - ₹${product.price} × ${item.quantity}
</li>
`;

});

totalElement.innerText = "Total: ₹" + total;

});

function checkout(){

alert("🎉 Payment Successful! Your order has been placed.");

}