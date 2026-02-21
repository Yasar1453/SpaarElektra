// Image Slider Functionality
const sliderTrack = document.querySelector('.slider-track');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');

if (sliderTrack && prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        sliderTrack.scrollBy({
            left: -320,
            behavior: 'smooth'
        });
    });

    nextBtn.addEventListener('click', () => {
        sliderTrack.scrollBy({
            left: 320,
            behavior: 'smooth'
        });
    });
}

// FAQ Accordion Functionality
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        // Close all other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });

        // Toggle current item
        item.classList.toggle('active');
    });
});

// Contact Form Handling
const contactForm = document.querySelector('.solution-contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Here you would normally send the data to a server
        console.log('Form submitted:', data);

        // Show success message (you can customize this)
        alert('Bedankt voor uw bericht! We nemen zo snel mogelijk contact met u op.');

        // Reset form
        contactForm.reset();
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Search button functionality
const searchBtn = document.querySelector('.search-btn');
if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        alert('Zoekfunctie komt binnenkort beschikbaar!');
    });
}

// Photo Gallery Slider Functionality - Nieuwe verbeterde versie
const gallerySliderTrack = document.querySelector('.photo-gallery-slider .slider-track');
const galleryPrevBtn = document.querySelector('.gallery-prev');
const galleryNextBtn = document.querySelector('.gallery-next');

if (gallerySliderTrack && galleryPrevBtn && galleryNextBtn) {
    let currentSlideIndex = 0;
    const slides = gallerySliderTrack.querySelectorAll('.photo-slide');
    const totalSlides = slides.length;

    function updateSlidePosition() {
        // Elke slide is 500px breed + 25px gap = 525px per slide
        const slideWidth = 525;
        const offset = -(currentSlideIndex * slideWidth);
        gallerySliderTrack.style.transform = `translateX(${offset}px)`;

        // Update button states
        galleryPrevBtn.style.opacity = currentSlideIndex === 0 ? '0.5' : '1';
        galleryPrevBtn.style.cursor = currentSlideIndex === 0 ? 'not-allowed' : 'pointer';

        galleryNextBtn.style.opacity = currentSlideIndex >= totalSlides - 1 ? '0.5' : '1';
        galleryNextBtn.style.cursor = currentSlideIndex >= totalSlides - 1 ? 'not-allowed' : 'pointer';
    }

    // Previous button
    galleryPrevBtn.addEventListener('click', () => {
        if (currentSlideIndex > 0) {
            currentSlideIndex--;
            updateSlidePosition();
        }
    });

    // Next button
    galleryNextBtn.addEventListener('click', () => {
        if (currentSlideIndex < totalSlides - 1) {
            currentSlideIndex++;
            updateSlidePosition();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && currentSlideIndex > 0) {
            currentSlideIndex--;
            updateSlidePosition();
        } else if (e.key === 'ArrowRight' && currentSlideIndex < totalSlides - 1) {
            currentSlideIndex++;
            updateSlidePosition();
        }
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    gallerySliderTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    gallerySliderTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50 && currentSlideIndex < totalSlides - 1) {
            // Swipe left - next
            currentSlideIndex++;
            updateSlidePosition();
        }
        if (touchEndX > touchStartX + 50 && currentSlideIndex > 0) {
            // Swipe right - previous
            currentSlideIndex--;
            updateSlidePosition();
        }
    }

    // Initialiseer positie
    updateSlidePosition();
}

// Team Members Slider Functionality
const teamMembersSlider = document.querySelector('.team-members-slider');
const teamMembersLeftArrow = document.querySelector('.team-members-arrow.left');
const teamMembersRightArrow = document.querySelector('.team-members-arrow.right');

if (teamMembersSlider && teamMembersLeftArrow && teamMembersRightArrow) {
    let teamScrollPosition = 0;
    const teamCards = teamMembersSlider.querySelectorAll('.team-member-item');

    if (teamCards.length > 0) {
        const teamCardWidth = teamCards[0].offsetWidth;
        const teamGap = 30;
        const teamScrollAmount = teamCardWidth + teamGap;

        teamMembersLeftArrow.addEventListener('click', () => {
            teamScrollPosition = Math.max(0, teamScrollPosition - teamScrollAmount);
            teamMembersSlider.style.transform = `translateX(-${teamScrollPosition}px)`;
        });

        teamMembersRightArrow.addEventListener('click', () => {
            const maxScroll = teamMembersSlider.scrollWidth - teamMembersSlider.parentElement.offsetWidth;
            teamScrollPosition = Math.min(maxScroll, teamScrollPosition + teamScrollAmount);
            teamMembersSlider.style.transform = `translateX(-${teamScrollPosition}px)`;
        });
    }
}
