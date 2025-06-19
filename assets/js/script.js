// script.js

document.addEventListener('DOMContentLoaded', () => {

    // --- Flying Emoji Background Logic ---
    const canvas = document.getElementById('emoji-canvas');
    const ctx = canvas.getContext('2d');
    const homeSection = document.getElementById('home');

    // Array of youthful emojis.
    const emojiPool = [
        '🚀', '✨', '🔥', '�', '📈', '🎯', '🎬', '📣', '🌟', '💎', '🎉', '😀', 
        '😎', '👻', '🤖', '😈', '🤯', '👋', '👌', '👏', '🕵️‍♀️', '👓', '👑', 
        '🚵🏻', '🏂🏻', '🧙🏼‍♂️', '🚗', '🚤', '❤️', '💔', '☮️', '💗', '💘', '🇮🇳', 
        '🫴', '🥹', '🍃', '🌎'
    ];
    
    // Array of beautiful pastel colors
    const pastelColors = [
        '#6a7d97', '#758aa1', '#8098ab', '#8babac', '#96bcb6', 
        '#a1cdc1', '#addecb', '#baeed5', '#c5fedf', '#d1ffe9',
        '#7d6a97', '#8a75a1', '#9880ab', '#a68bab', '#b496b6'
    ];

    let particles = [];
    let currentEmojis = [];

    // Function to set up the canvas and animation
    function setupAnimation() {
        // 1. Set a random background color
        const randomColor = pastelColors[Math.floor(Math.random() * pastelColors.length)];
        homeSection.style.backgroundColor = randomColor;

        // 2. Set canvas dimensions
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // 3. Pick 5 unique random emojis for this session
        currentEmojis = [];
        const emojiPoolCopy = [...emojiPool];
        for(let i=0; i<5; i++){
            if(emojiPoolCopy.length === 0) break; // Stop if we run out of emojis
            const randomIndex = Math.floor(Math.random() * emojiPoolCopy.length);
            currentEmojis.push(emojiPoolCopy.splice(randomIndex, 1)[0]);
        }
        
        // 4. Create emoji particles
        particles = [];
        const particleCount = 25; // How many emojis on screen
        for (let i = 0; i < particleCount; i++) {
            particles.push(createParticle());
        }
    }

    // Factory function to create a single emoji particle
    function createParticle() {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 20 + 20; // Random size between 20px and 40px
        const speedX = Math.random() * 1 - 0.5; // Slow horizontal drift
        const speedY = Math.random() * 1 + 0.5; // Slow downward movement
        const emoji = currentEmojis[Math.floor(Math.random() * currentEmojis.length)];

        return { x, y, size, speedX, speedY, emoji };
    }

    // The main animation loop
    function animate() {
        // Clear the canvas for the next frame
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw each particle
        particles.forEach(p => {
            // Update position
            p.x += p.speedX;
            p.y += p.speedY;

            // Reset particle if it goes off screen
            if (p.y > canvas.height + p.size) {
                p.y = -p.size; // Reset to the top
                p.x = Math.random() * canvas.width; // Give it a new horizontal position
            }
            if (p.x > canvas.width + p.size) {
                 p.x = -p.size; // Wrap around horizontally
            }
            if (p.x < -p.size) {
                p.x = canvas.width + p.size; // Wrap around horizontally
            }

            // Draw the emoji
            ctx.font = `${p.size}px Arial`;
            ctx.fillText(p.emoji, p.x, p.y);
        });

        // Request the next frame
        requestAnimationFrame(animate);
    }
    
    // --- Initialize and handle resizing ---
    setupAnimation();
    animate();

    window.addEventListener('resize', () => {
        // Re-setup the canvas on window resize to keep it sharp
        setupAnimation();
    });


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
    }, {
        root: null, 
        threshold: 0.1
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    const servicesGrid = document.querySelector('.services-grid');
    if(servicesGrid) {
        observer.observe(servicesGrid);
    }

    // --- Scroll Arrow Click Handler ---
    const scrollArrowLink = document.querySelector('.scroll-indicator a');
    if(scrollArrowLink) {
        scrollArrowLink.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor jump
            const nextSection = document.querySelector('#about');
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // --- Contact Modal Logic ---
    const contactBoy = document.getElementById('contact-boy-container');
    const modalOverlay = document.getElementById('contact-modal-overlay');
    const modalCloseButton = document.getElementById('modal-close-button');

    // Function to open the modal
    function openModal() {
        if (modalOverlay) modalOverlay.classList.add('show');
    }

    // Function to close the modal
    function closeModal() {
        if (modalOverlay) modalOverlay.classList.remove('show');
    }

    // Event listeners
    if (contactBoy) {
        contactBoy.addEventListener('click', openModal);
    }

    if (modalCloseButton) {
        modalCloseButton.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
        // Close modal if user clicks on the overlay background
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

});
