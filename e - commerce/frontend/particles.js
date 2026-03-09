const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 100; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3,
        speedX: (Math.random() - 0.5),
        speedY: (Math.random() - 0.5)
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 🔹 Draw moving particles
    particles.forEach(p => {
        ctx.fillStyle = "#00ffff";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
    });

    // ✨ Glitter sparkles near moon area
    for (let i = 0; i < 3; i++) {

        if (Math.random() < 0.3) {

            let sparkleX = canvas.width - 160 + Math.random() * 120;
            let sparkleY = 60 + Math.random() * 120;

            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.arc(sparkleX, sparkleY, 1.5, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    requestAnimationFrame(animate);
}

animate();

animate();