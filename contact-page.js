// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        if (!data.naam || !data.email) {
            alert('Vul alstublieft alle verplichte velden in (Naam en E-mailadres).');
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
