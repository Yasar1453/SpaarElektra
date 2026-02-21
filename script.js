// ========================================
// Header scroll effect
// ========================================
const header = document.querySelector('.header');
const isHomepage = document.querySelector('.hero') !== null;
if (header) {
    if (isHomepage) {
        // Alleen op de homepage: transparant → wit bij scrollen
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    } else {
        // Op alle andere pagina's: altijd wit
        header.classList.add('scrolled');
    }
}

// ========================================
// Hero slider
// ========================================
const heroSlides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
    heroSlides.forEach(slide => slide.classList.remove('active'));
    heroSlides[index].classList.add('active');
    const dots = document.querySelectorAll('.slider-dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % heroSlides.length;
    showSlide(currentSlide);
}

function startSlideshow() {
    slideInterval = setInterval(nextSlide, 5000);
}

function stopSlideshow() {
    clearInterval(slideInterval);
}

if (heroSlides.length > 1) {
    const dotsContainer = document.querySelector('.slider-dots');
    if (dotsContainer) {
        heroSlides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('slider-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                stopSlideshow();
                currentSlide = index;
                showSlide(index);
                startSlideshow();
            });
            dotsContainer.appendChild(dot);
        });
    }
    startSlideshow();

    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', stopSlideshow);
        heroSection.addEventListener('mouseleave', startSlideshow);
    }
}

// Scroll indicator
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const nextSection = document.querySelector('.projects') || document.querySelector('.experience-section');
        if (nextSection) nextSection.scrollIntoView({ behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        scrollIndicator.style.opacity = window.pageYOffset > 100 ? '0' : '1';
        scrollIndicator.style.pointerEvents = window.pageYOffset > 100 ? 'none' : 'all';
    });
}

// ========================================
// Helper: get card scroll amount dynamically
// ========================================
function getCardScrollAmount() {
    const firstCard = document.querySelector('.project-card');
    if (firstCard) {
        return firstCard.offsetWidth + 20; // card width + gap
    }
    return 400;
}

function getServiceScrollAmount() {
    const firstSlide = document.querySelector('.service-slide');
    if (firstSlide) {
        return firstSlide.offsetWidth + 24; // slide width + gap
    }
    return 370;
}

// ========================================
// Projects carousel scrolling
// ========================================
const carouselRows = document.querySelectorAll('.carousel-row');
const carouselNext = document.querySelector('.carousel-arrow.next');
const carouselPrev = document.querySelector('.carousel-arrow.prev');
const carouselDotsContainer = document.getElementById('carouselDots');

// Create carousel dots
if (carouselDotsContainer && carouselRows.length > 0) {
    const firstRow = carouselRows[0];
    const visibleWidth = firstRow.clientWidth;
    const totalWidth = firstRow.scrollWidth;
    const numDots = Math.max(1, Math.ceil(totalWidth / visibleWidth));

    for (let i = 0; i < numDots; i++) {
        const dot = document.createElement('button');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            carouselRows.forEach(row => {
                row.scrollTo({ left: i * visibleWidth, behavior: 'smooth' });
            });
        });
        carouselDotsContainer.appendChild(dot);
    }

    // Update dots on scroll
    if (firstRow) {
        firstRow.addEventListener('scroll', () => {
            const dots = carouselDotsContainer.querySelectorAll('.dot');
            const scrollPos = firstRow.scrollLeft;
            const activeIndex = Math.round(scrollPos / visibleWidth);
            dots.forEach((d, i) => d.classList.toggle('active', i === activeIndex));
        });
    }
}

if (carouselNext) {
    carouselNext.addEventListener('click', () => {
        const scrollAmount = getCardScrollAmount();
        carouselRows.forEach(row => {
            row.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    });
}

if (carouselPrev) {
    carouselPrev.addEventListener('click', () => {
        const scrollAmount = getCardScrollAmount();
        carouselRows.forEach(row => {
            row.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
    });
}

// Filter buttons
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// ========================================
// Services slider
// ========================================
const servicesSlider = document.getElementById('servicesSlider');
const servicesNext = document.querySelector('.services-nav-btn.next');
const servicesPrev = document.querySelector('.services-nav-btn.prev');
const servicesDotsContainer = document.getElementById('servicesDots');

// Create services dots
if (servicesDotsContainer && servicesSlider) {
    const visibleWidth = servicesSlider.clientWidth;
    const totalWidth = servicesSlider.scrollWidth;
    const numDots = Math.max(1, Math.ceil(totalWidth / visibleWidth));

    for (let i = 0; i < numDots; i++) {
        const dot = document.createElement('button');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            servicesSlider.scrollTo({ left: i * visibleWidth, behavior: 'smooth' });
        });
        servicesDotsContainer.appendChild(dot);
    }

    servicesSlider.addEventListener('scroll', () => {
        const dots = servicesDotsContainer.querySelectorAll('.dot');
        const scrollPos = servicesSlider.scrollLeft;
        const activeIndex = Math.round(scrollPos / visibleWidth);
        dots.forEach((d, i) => d.classList.toggle('active', i === activeIndex));
    });
}

if (servicesNext && servicesSlider) {
    servicesNext.addEventListener('click', () => {
        servicesSlider.scrollBy({ left: getServiceScrollAmount(), behavior: 'smooth' });
    });
}

if (servicesPrev && servicesSlider) {
    servicesPrev.addEventListener('click', () => {
        servicesSlider.scrollBy({ left: -getServiceScrollAmount(), behavior: 'smooth' });
    });
}

// ========================================
// Scroll animations (subtle fade-in)
// ========================================
const observerOptions = {
    threshold: 0.05,
    rootMargin: '100px 0px 0px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .service-slide').forEach(el => {
    el.classList.add('animate-in');
    observer.observe(el);
});

// ========================================
// Mobile menu toggle
// ========================================
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
if (mobileMenuBtn && header) {
    mobileMenuBtn.addEventListener('click', () => {
        header.classList.toggle('menu-open');
        document.body.style.overflow = header.classList.contains('menu-open') ? 'hidden' : '';
    });

    // Close menu when clicking a nav link
    document.querySelectorAll('.header.menu-open .nav-item a, .header .nav-item a').forEach(link => {
        link.addEventListener('click', () => {
            if (header.classList.contains('menu-open')) {
                header.classList.remove('menu-open');
                document.body.style.overflow = '';
            }
        });
    });
}

// ========================================
// Search button
// ========================================
const searchBtn = document.querySelector('.search-btn');
if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        alert('Zoekfunctie komt binnenkort beschikbaar!');
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
