// script.js

document.addEventListener('DOMContentLoaded', () => {

    // --- Flying Emoji Background Logic ---
    const canvas = document.getElementById('emoji-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        const homeSection = document.getElementById('home');
        const emojiPool = ['🚀', '✨', '🔥', '💡', '📈', '🎯', '🎬', '📣', '🌟', '💎', '🎉', '😀', '😎', '👻', '🤖', '😈', '🤯', '👋', '👌', '👏', '🕵️‍♀️', '👓', '👑', '🚵🏻', '🏂🏻', '🧙🏼‍♂️', '🚗', '🚤', '❤️', '💔', '☮️', '💗', '💘', '🇮🇳', '🫴', '🥹', '🍃', '🌎'];
        const pastelColors = ['#6a7d97', '#758aa1', '#8098ab', '#8babac', '#96bcb6', '#a1cdc1', '#addecb', '#baeed5', '#c5fedf', '#d1ffe9', '#7d6a97', '#8a75a1', '#9880ab', '#a68bab', '#b496b6'];
        let particles = [];
        let currentEmojis = [];

        function setupAnimation() {
            homeSection.style.backgroundColor = pastelColors[Math.floor(Math.random() * pastelColors.length)];
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            currentEmojis = [];
            const emojiPoolCopy = [...emojiPool];
            for (let i = 0; i < 5; i++) {
                if (emojiPoolCopy.length === 0) break;
                const randomIndex = Math.floor(Math.random() * emojiPoolCopy.length);
                currentEmojis.push(emojiPoolCopy.splice(randomIndex, 1)[0]);
            }
            particles = [];
            const particleCount = 25;
            for (let i = 0; i < particleCount; i++) {
                particles.push(createParticle());
            }
        }

        function createParticle() {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const size = Math.random() * 20 + 20;
            const speedX = Math.random() * 1 - 0.5;
            const speedY = Math.random() * 1 + 0.5;
            const emoji = currentEmojis[Math.floor(Math.random() * currentEmojis.length)];
            return { x, y, size, speedX, speedY, emoji };
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.x += p.speedX;
                p.y += p.speedY;
                if (p.y > canvas.height + p.size) {
                    p.y = -p.size;
                    p.x = Math.random() * canvas.width;
                }
                if (p.x > canvas.width + p.size) { p.x = -p.size; }
                if (p.x < -p.size) { p.x = canvas.width + p.size; }
                ctx.font = `${p.size}px Arial`;
                ctx.fillText(p.emoji, p.x, p.y);
            });
            requestAnimationFrame(animate);
        }
        setupAnimation();
        animate();
        window.addEventListener('resize', setupAnimation);
    }

    // --- Animate on Scroll functionality ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                entry.target.classList.remove('is-visible');
            }
        });
    }, { root: null, threshold: 0.1 });
    animatedElements.forEach(element => { observer.observe(element); });
    const servicesGrid = document.querySelector('.services-grid');
    if (servicesGrid) { observer.observe(servicesGrid); }
    const timeline = document.querySelector('.timeline');
    if (timeline) { observer.observe(timeline); }

    // --- Click Handlers ---
    const scrollArrowLink = document.querySelector('.scroll-indicator a');
    if (scrollArrowLink) {
        scrollArrowLink.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // UPDATED: Logo click handler
    const logoLink = document.getElementById('logo-link');
    if(logoLink){
        logoLink.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // --- Contact Modal Logic ---
    const contactBoy = document.getElementById('contact-boy-container');
    const modalOverlay = document.getElementById('contact-modal-overlay');
    const modalCloseButton = document.getElementById('modal-close-button');
    function openModal() { if (modalOverlay) modalOverlay.classList.add('show'); }
    function closeModal() { if (modalOverlay) modalOverlay.classList.remove('show'); }
    if (contactBoy) { contactBoy.addEventListener('click', openModal); }
    if (modalCloseButton) { modalCloseButton.addEventListener('click', closeModal); }
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) { closeModal(); }
        });
    }
    
    // --- NEW: Testimonial Carousel Logic ---
    const track = document.querySelector('.testimonial-track');
    if (track) {
        const slides = Array.from(track.children);
        const nextButton = document.getElementById('nextBtn');
        const prevButton = document.getElementById('prevBtn');
        let currentIndex = 0;

        const updateSlidePosition = () => {
            track.style.transform = 'translateX(' + (-100 * currentIndex) + '%)';
        };

        nextButton.addEventListener('click', e => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlidePosition();
        });

        prevButton.addEventListener('click', e => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlidePosition();
        });
    }
});
