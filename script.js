document.addEventListener('DOMContentLoaded', function () {
    initNavbar();
    initProjectFilters();
    initContactForm();
});

function initNavbar() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => navMenu.classList.remove('active'));
    });

    // Highlight the link of the section currently in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
            });
        });
    }, { rootMargin: '-45% 0px -50% 0px' });

    document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
}

function initProjectFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            buttons.forEach(b => b.classList.toggle('active', b === button));
            cards.forEach(card => {
                card.hidden = filter !== 'all' && !card.dataset.category.split(' ').includes(filter);
            });
        });
    });
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (typeof emailjs === 'undefined') {
            status.textContent = 'Could not load the mail service. Please email me directly.';
            return;
        }

        emailjs.init('LlIJQHQvwNLXvVKAQ');
        status.textContent = 'Sending...';

        emailjs.sendForm('service_e4lylir', 'template_4rtv2al', form).then(
            () => {
                status.textContent = 'Message sent successfully!';
                form.reset();
            },
            (error) => {
                status.textContent = 'Failed to send message: ' + (error.text || 'unknown error');
            }
        );
    });
}
