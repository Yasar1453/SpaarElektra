// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        if (!data.naam || !data.email || !data.bericht) {
            alert('Vul alstublieft alle verplichte velden in (Naam, E-mail en Bericht).');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Voer een geldig e-mailadres in.');
            return;
        }

        console.log('Form data:', data);
        alert('Bedankt voor uw bericht! We nemen zo spoedig mogelijk contact met u op.');
        contactForm.reset();
    });
}

// Animate vestiging cards on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(20px)';
            setTimeout(() => {
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.ct-vestiging-card').forEach(card => {
    observer.observe(card);
});
