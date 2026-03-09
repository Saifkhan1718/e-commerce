const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch(`http://localhost:5000/api/products`)
.then(res => res.json())
.then(products => {

    const product = products.find(p => p._id === id);

    document.getElementById("productImage").src = product.image;
    document.getElementById("productName").innerText = product.name;
    document.getElementById("productPrice").innerText = "₹" + product.price;

    document.getElementById("addBtn").onclick = () => addToCart(id);

});

function addToCart(id){

fetch("http://localhost:5000/api/cart/add",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({productId:id})
})
.then(res=>res.json())
.then(()=>alert("Added to cart"));

}