const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Floating Particles
const particles = Array.from({ length: 50 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2 + 0.5,
    speedX: (Math.random() - 0.5) * 0.4,
    speedY: (Math.random() - 0.5) * 0.4,
    opacity: Math.random() * 0.5 + 0.2
}));

// Wave Config
let step = 0;
const waveLines = [
    { amplitude: 35, frequency: 0.008, speed: 0.015, color: 'rgba(245, 158, 11, 0.08)', offset: 0 },
    { amplitude: 50, frequency: 0.005, speed: 0.012, color: 'rgba(217, 119, 6, 0.06)', offset: 100 },
    { amplitude: 25, frequency: 0.010, speed: 0.020, color: 'rgba(245, 158, 11, 0.04)', offset: 250 }
];

function drawBackground() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Draw Glowing Animated Waves
    step += 1;
    waveLines.forEach(wave => {
        ctx.beginPath();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = wave.color;

        for (let x = 0; x < canvas.width; x += 5) {
            const y = Math.sin(x * wave.frequency + step * wave.speed) * wave.amplitude + (canvas.height / 2) + wave.offset - 100;
            if (x === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
    });

    // 2. Draw Floating Particles
    particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.fillStyle = `rgba(245, 158, 11, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    });

    requestAnimationFrame(drawBackground);
}

drawBackground();

// Contact Form Submission + WhatsApp Redirection Logic
const contactForm = document.querySelector('.contact-form-card form');
const popover = document.getElementById('successPopover');

// Change this to your WhatsApp number (Country code with phone number, no '+' or spaces)
const whatsappNumber = "923242779181";

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Default form submit reload rokne ke liye

        // Form Inputs Values Get Karein
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Message Format Design
        const formattedText = `*New Portfolio Message*%0A%0A` +
            `*Name:* ${encodeURIComponent(name)}%0A` +
            `*Email:* ${encodeURIComponent(email)}%0A` +
            `*Message:* ${encodeURIComponent(message)}`;

        // WhatsApp Direct Chat API URL
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${formattedText}`;

        // 1. Animated Popover Active Karein
        popover.classList.add('active');

        // 2. New Tab Me WhatsApp Open Karein
        window.open(whatsappUrl, '_blank');

        // 3. Form Clean Karein
        contactForm.reset();
    });
}

// Popover Close Function
function closePopover() {
    popover.classList.remove('active');
}
// Portfolio Category Filtering System
const filterBtns = document.querySelectorAll('.filter-btn');
const workCards = document.querySelectorAll('.work-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Active Class Switch
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        // Cards Filtering Logic
        workCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');

            if (cardCategory === filterValue) {
                card.classList.remove('hide');
            } else {
                card.classList.add('hide');
            }
        });
    });
});