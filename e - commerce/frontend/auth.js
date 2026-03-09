function login() {

    const btn = document.getElementById("loginBtn");
    const loader = btn.querySelector(".loader");
    const btnText = btn.querySelector(".btn-text");

    btnText.style.opacity = "0.5";
    loader.style.display = "block";

    setTimeout(() => {

        localStorage.setItem("token", "demo-token");

        window.location.href = "index.html";

    }, 1200);
}