// npx vite serve
// npm run deploy

const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    for (const p of particles) {
        p.x = Math.random() * canvas.width;
        p.y = Math.random() * canvas.height;
    }
}

const particles = [];
const particleCount = 1000;

let particleColor;
let particleShadow;

function updateParticleColors() {
    const styles = getComputedStyle(document.body);

    particleColor = styles
        .getPropertyValue("--particle-color")
        .trim();

    particleShadow = styles
        .getPropertyValue("--particle-shadow")
        .trim();
}

for (let i = 0; i < particleCount; i++){
    const depth = Math.random();

    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,

        radius: Math.random() * 0.8 + 0.2,

        depth,

        alpha: depth * 0.35,

        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,

        offset: Math.random() * 1000,
    });
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function render(){
    const time = performance.now() * 0.001;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const p of particles){
        p.x += p.vx * p.depth;
        p.y += p.vy * p.depth;

        p.x += Math.sin(time + p.offset) * 0.05;
        p.y += Math.cos(time + p.offset) * 0.05;

        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;

        if (p.y < -20) p.y = canvas.height + 20;
        if (p.y > canvas.height + 20) p.y = -20;

        if (p.y < -50 || p.y > canvas.height + 50) {
            continue;
        }

        ctx.beginPath();

        ctx.fillStyle = `rgba(${particleColor}, ${p.alpha})`;

        ctx.shadowBlur = 5;
        ctx.shadowColor = particleShadow;

        const size = document.body.classList.contains("light-mode")
            ? p.radius * 1.4
            : p.radius;

        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);

        ctx.fill();
    }
    
    requestAnimationFrame(render);
}

render();

const themeToggleBtn = document.getElementById("theme-toggle");

function updateThemeUI(showMoon) {
    if (!themeToggleBtn) return;

    themeToggleBtn.innerHTML =
        `<i data-lucide="${showMoon ? "moon" : "sun"}"></i>`;

    if (window.lucide) {
        lucide.createIcons();
    }
}

const isLight = localStorage.getItem("theme") === "light";

if (isLight) {
    document.body.classList.add("light-mode");
}

updateParticleColors();
updateThemeUI(isLight);

if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
        const isLight = document.body.classList.toggle("light-mode");

        localStorage.setItem("theme", isLight ? "light" : "dark");

        updateParticleColors();
        updateThemeUI(isLight);
    });
}