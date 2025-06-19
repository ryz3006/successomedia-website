// script.js

document.addEventListener('DOMContentLoaded', () => {

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

    // --- Smooth Scrolling for all anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });


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

        if(slides.length > 0){ // Ensure there are slides before adding listeners
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
    }
});
