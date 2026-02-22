// ========================================
// Solution Page JS - Supports both old and new (sol-) classes
// ========================================

// --- OLD SLIDER (backwards compat for other solution pages) ---
const sliderTrack = document.querySelector('.slider-track');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');

if (sliderTrack && prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        sliderTrack.scrollBy({ left: -320, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
        sliderTrack.scrollBy({ left: 320, behavior: 'smooth' });
    });
}

// --- OLD FAQ (backwards compat) ---
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        faqItems.forEach(other => {
            if (other !== item && other.classList.contains('active')) {
                other.classList.remove('active');
            }
        });
        item.classList.toggle('active');
    });
});

// --- OLD CONTACT FORM (backwards compat) ---
const oldContactForm = document.querySelector('.solution-contact-form');
if (oldContactForm) {
    oldContactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(oldContactForm);
        console.log('Form submitted:', Object.fromEntries(formData));
        alert('Bedankt voor uw bericht! We nemen zo snel mogelijk contact met u op.');
        oldContactForm.reset();
    });
}

// --- OLD GALLERY SLIDER (backwards compat) ---
const gallerySliderTrack = document.querySelector('.photo-gallery-slider .slider-track');
const galleryPrevBtn = document.querySelector('.gallery-prev');
const galleryNextBtn = document.querySelector('.gallery-next');

if (gallerySliderTrack && galleryPrevBtn && galleryNextBtn) {
    let currentSlideIndex = 0;
    const slides = gallerySliderTrack.querySelectorAll('.photo-slide');
    const totalSlides = slides.length;

    function updateOldSlidePosition() {
        const slideWidth = 525;
        const offset = -(currentSlideIndex * slideWidth);
        gallerySliderTrack.style.transform = `translateX(${offset}px)`;
        galleryPrevBtn.style.opacity = currentSlideIndex === 0 ? '0.5' : '1';
        galleryNextBtn.style.opacity = currentSlideIndex >= totalSlides - 1 ? '0.5' : '1';
    }

    galleryPrevBtn.addEventListener('click', () => {
        if (currentSlideIndex > 0) { currentSlideIndex--; updateOldSlidePosition(); }
    });
    galleryNextBtn.addEventListener('click', () => {
        if (currentSlideIndex < totalSlides - 1) { currentSlideIndex++; updateOldSlidePosition(); }
    });
    updateOldSlidePosition();
}

// ========================================
// NEW: Sol- Gallery Slider
// ========================================
const solGalleryTrack = document.querySelector('.sol-gallery-track');
const solNextBtn = document.querySelector('.sol-gallery-btn.next');
const solPrevBtn = document.querySelector('.sol-gallery-btn.prev');
const solGalleryDotsContainer = document.querySelector('.sol-gallery-dots');

if (solGalleryTrack && solNextBtn && solPrevBtn) {
    const solSlides = solGalleryTrack.querySelectorAll('.sol-gallery-slide');
    const totalSolSlides = solSlides.length;
    let solSlideIndex = 0;

    // Create dots
    if (solGalleryDotsContainer) {
        for (let i = 0; i < totalSolSlides; i++) {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                solSlideIndex = i;
                scrollToSolSlide();
            });
            solGalleryDotsContainer.appendChild(dot);
        }
    }

    function scrollToSolSlide() {
        if (solSlides[solSlideIndex]) {
            solSlides[solSlideIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'start'
            });
        }
        updateSolDots();
    }

    function updateSolDots() {
        if (!solGalleryDotsContainer) return;
        const dots = solGalleryDotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === solSlideIndex);
        });
    }

    solNextBtn.addEventListener('click', () => {
        if (solSlideIndex < totalSolSlides - 1) {
            solSlideIndex++;
            scrollToSolSlide();
        }
    });

    solPrevBtn.addEventListener('click', () => {
        if (solSlideIndex > 0) {
            solSlideIndex--;
            scrollToSolSlide();
        }
    });

    // Touch/swipe support
    let solTouchStartX = 0;
    solGalleryTrack.addEventListener('touchstart', (e) => {
        solTouchStartX = e.changedTouches[0].screenX;
    });
    solGalleryTrack.addEventListener('touchend', (e) => {
        const diff = e.changedTouches[0].screenX - solTouchStartX;
        if (diff < -50 && solSlideIndex < totalSolSlides - 1) {
            solSlideIndex++;
            scrollToSolSlide();
        } else if (diff > 50 && solSlideIndex > 0) {
            solSlideIndex--;
            scrollToSolSlide();
        }
    });
}

// ========================================
// NEW: Sol- Tabs
// ========================================
const solTabBtns = document.querySelectorAll('.sol-tab-btn');
const solTabPanels = document.querySelectorAll('.sol-tab-panel');

if (solTabBtns.length > 0) {
    solTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');

            // Deactivate all
            solTabBtns.forEach(b => b.classList.remove('active'));
            solTabPanels.forEach(p => p.classList.remove('active'));

            // Activate clicked
            btn.classList.add('active');
            const targetPanel = document.getElementById('tab-' + tabId);
            if (targetPanel) targetPanel.classList.add('active');
        });
    });
}

// ========================================
// NEW: Sol- FAQ Accordion
// ========================================
const solFaqItems = document.querySelectorAll('.sol-faq-item');

solFaqItems.forEach(item => {
    const question = item.querySelector('.sol-faq-question');
    question.addEventListener('click', () => {
        // Close all other items
        solFaqItems.forEach(other => {
            if (other !== item && other.classList.contains('active')) {
                other.classList.remove('active');
            }
        });
        item.classList.toggle('active');
    });
});

// ========================================
// NEW: Sol- Contact Form
// ========================================
const solForm = document.querySelector('.sol-form');

if (solForm) {
    solForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(solForm);
        console.log('Form submitted:', Object.fromEntries(formData));
        alert('Bedankt voor uw bericht! We nemen zo snel mogelijk contact met u op.');
        solForm.reset();
    });
}

// ========================================
// Smooth scrolling for anchor links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Search button
const searchBtn = document.querySelector('.search-btn');
if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        alert('Zoekfunctie komt binnenkort beschikbaar!');
    });
}
