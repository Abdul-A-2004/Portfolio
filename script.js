 document.addEventListener('DOMContentLoaded', () => {
        const navToggle = document.getElementById('nav-toggle');
        const navLinks = document.getElementById('nav-links');

        // --- Mobile Menu Toggle ---
 navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

        
        // Close mobile nav when a link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('open')) {
                    navLinks.classList.remove('open');
                }
            });
        });

        // --- Contact Form Interaction ---
        const showFormBtn = document.getElementById('show-form-btn');
        const contactCard = document.getElementById('contact-card');
        const contactFormContainer = document.getElementById('contact-form-container');

        if (showFormBtn && contactCard && contactFormContainer) {
            showFormBtn.addEventListener('click', () => {
                contactCard.classList.add('hidden');
                // Use a timeout to allow the card to transition out before the form appears
                setTimeout(() => {
                    contactFormContainer.classList.add('visible');
                }, 250); // This delay should be slightly less than the CSS transition time for the card
            });
        }

        // --- Dynamic Header, Active Nav & Scroll Animations ---
        const sections = document.querySelectorAll('section[id]');
        const allNavLinks = document.querySelectorAll('.nav-links a');
        const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const section = entry.target;
                
                if (entry.isIntersecting) {
                    // Handle Nav link and Title update
                    const id = section.getAttribute('id');
                    const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);

                    allNavLinks.forEach(link => link.classList.remove('active'));
                    if (activeLink) {
                        activeLink.classList.add('active');
                        const sectionTitleText = activeLink.textContent;
                        document.title = `Portfolio | ${sectionTitleText}`;
                    } else if (id === 'about') {
                         document.title = `Portfolio | About Me`;
                    }
                    
                    // Animate section title
                    const sectionTitle = section.querySelector('.section-title');
                    if (sectionTitle) {
                       sectionTitle.classList.add('animate-title');
                    }
                    
                    // Animate elements within the section
                    const elementsInside = section.querySelectorAll('.animate-on-scroll');
                    elementsInside.forEach(el => el.classList.add('is-visible'));

                } else {
                    const sectionTitle = section.querySelector('.section-title');
                    if (sectionTitle) {
                       sectionTitle.classList.remove('animate-title');
                    }
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
    });