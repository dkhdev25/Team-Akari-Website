// Team Akari
// npx vite serve
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    for (const p of particles) {
        p.x = Math.random() * canvas.width;
        p.y = Math.random() * canvas.height;
    }
}

const particles = [];
const particleCount = 1000;

for(let i = 0; i < particleCount; i++){
    const depth = Math.random();

    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,

        radius: Math.random() * 0.8 + 0.2,

        depth: depth,

        alpha: depth * 0.35,

        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,

        offset: Math.random() * 1000,

        color: "255, 255, 255"
    });
}


window.addEventListener("resize", resize);
resize();

function render(){
    const time = performance.now() * 0.001;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(const p of particles){
        p.x += p.vx * p.depth;
        p.y += p.vy * p.depth;

        p.x += Math.sin(time + p.offset) * 0.05;
        p.y += Math.cos(time + p.offset) * 0.05;

        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;

        if (p.y < -20) p.y = canvas.height + 20;
        if (p.y > canvas.height + 20) p.y = -20;

        const screenY = p.y;
        const screenX = p.x;

        if (screenY < -50 || screenY > canvas.height + 50)
            continue;

        ctx.beginPath();

        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;

        ctx.shadowBlur = 5;
        ctx.shadowColor = "rgba(255,255,255,0.25)";

        ctx.arc(screenX, screenY, p.radius, 0, Math.PI * 2);

        ctx.fill();
    }
    
    requestAnimationFrame(render);
}

render();