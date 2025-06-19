// script.js

document.addEventListener('DOMContentLoaded', () => {
    // REMOVED: All code for the emoji canvas has been deleted.

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
    
    // --- Testimonial Carousel Logic ---
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
