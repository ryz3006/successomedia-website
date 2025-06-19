// script.js

document.addEventListener('DOMContentLoaded', () => {

    // --- Animate on Scroll functionality ---
    // This is a more performant way to handle animations on scroll.
    // It uses the Intersection Observer API to detect when an element
    // enters the viewport.

    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // When the element is in view
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Unobserve after it has been animated
                // observer.unobserve(entry.target);
            } else {
                // Optional: Remove class if you want animation to repeat every time it scrolls in/out
                 entry.target.classList.remove('is-visible');
            }
        });
    }, {
        root: null, // observes intersections relative to the viewport
        threshold: 0.1 // Triggers when 10% of the element is visible
    });

    // Attach the observer to each element with the .animate-on-scroll class
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Also observe the services grid container to stagger its children
    const servicesGrid = document.querySelector('.services-grid');
    if(servicesGrid) {
        observer.observe(servicesGrid);
    }

});
