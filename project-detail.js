// ========================================
// Project Detail Page - Gallery & Related Sliders
// ========================================
document.addEventListener('DOMContentLoaded', function () {

    // ========================================
    // Image Gallery Slider
    // ========================================
    const galleryTrack = document.querySelector('.pd-gallery-track');
    const galleryNext = document.querySelector('.pd-gallery-btn.next');
    const galleryPrev = document.querySelector('.pd-gallery-btn.prev');
    const galleryDots = document.querySelector('.pd-gallery-dots');

    if (galleryTrack) {
        const slides = galleryTrack.querySelectorAll('.pd-gallery-slide');

        function getSlideScroll() {
            const slide = galleryTrack.querySelector('.pd-gallery-slide');
            if (!slide) return 400;
            const gap = parseInt(getComputedStyle(galleryTrack).gap) || 24;
            return slide.offsetWidth + gap;
        }

        // Create dots
        if (galleryDots && slides.length > 1) {
            const visibleWidth = galleryTrack.clientWidth;
            const totalWidth = galleryTrack.scrollWidth;
            const numDots = Math.max(1, Math.ceil(totalWidth / visibleWidth));
            for (let i = 0; i < numDots; i++) {
                const dot = document.createElement('button');
                dot.classList.add('dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    galleryTrack.scrollTo({ left: i * visibleWidth, behavior: 'smooth' });
                });
                galleryDots.appendChild(dot);
            }

            galleryTrack.addEventListener('scroll', () => {
                const dots = galleryDots.querySelectorAll('.dot');
                const activeIndex = Math.round(galleryTrack.scrollLeft / visibleWidth);
                dots.forEach((d, i) => d.classList.toggle('active', i === activeIndex));
            });
        }

        if (galleryNext) {
            galleryNext.addEventListener('click', () => {
                galleryTrack.scrollBy({ left: getSlideScroll(), behavior: 'smooth' });
            });
        }

        if (galleryPrev) {
            galleryPrev.addEventListener('click', () => {
                galleryTrack.scrollBy({ left: -getSlideScroll(), behavior: 'smooth' });
            });
        }

        // Update button states
        function updateGalleryBtns() {
            if (galleryPrev) galleryPrev.disabled = galleryTrack.scrollLeft <= 5;
            if (galleryNext) galleryNext.disabled = galleryTrack.scrollLeft + galleryTrack.clientWidth >= galleryTrack.scrollWidth - 5;
        }

        galleryTrack.addEventListener('scroll', updateGalleryBtns);
        updateGalleryBtns();

        // Auto-advance
        let galleryAuto = setInterval(() => {
            if (galleryTrack.scrollLeft + galleryTrack.clientWidth >= galleryTrack.scrollWidth - 5) {
                galleryTrack.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                galleryTrack.scrollBy({ left: getSlideScroll(), behavior: 'smooth' });
            }
        }, 5000);

        galleryTrack.addEventListener('mouseenter', () => clearInterval(galleryAuto));
        galleryTrack.addEventListener('mouseleave', () => {
            galleryAuto = setInterval(() => {
                if (galleryTrack.scrollLeft + galleryTrack.clientWidth >= galleryTrack.scrollWidth - 5) {
                    galleryTrack.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    galleryTrack.scrollBy({ left: getSlideScroll(), behavior: 'smooth' });
                }
            }, 5000);
        });
    }

    // ========================================
    // Related Projects Slider
    // ========================================
    const relatedTrack = document.querySelector('.pd-related-track');
    const relatedNext = document.querySelector('.pd-related-btn.next');
    const relatedPrev = document.querySelector('.pd-related-btn.prev');
    const relatedDots = document.querySelector('.pd-related-dots');

    if (relatedTrack) {
        function getRelatedScroll() {
            const card = relatedTrack.querySelector('.pd-related-card');
            if (!card) return 300;
            const gap = parseInt(getComputedStyle(relatedTrack).gap) || 20;
            return card.offsetWidth + gap;
        }

        // Create dots
        if (relatedDots) {
            const visibleWidth = relatedTrack.clientWidth;
            const totalWidth = relatedTrack.scrollWidth;
            const numDots = Math.max(1, Math.ceil(totalWidth / visibleWidth));
            for (let i = 0; i < numDots; i++) {
                const dot = document.createElement('button');
                dot.classList.add('dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    relatedTrack.scrollTo({ left: i * visibleWidth, behavior: 'smooth' });
                });
                relatedDots.appendChild(dot);
            }

            relatedTrack.addEventListener('scroll', () => {
                const dots = relatedDots.querySelectorAll('.dot');
                const activeIndex = Math.round(relatedTrack.scrollLeft / visibleWidth);
                dots.forEach((d, i) => d.classList.toggle('active', i === activeIndex));
            });
        }

        if (relatedNext) {
            relatedNext.addEventListener('click', () => {
                relatedTrack.scrollBy({ left: getRelatedScroll(), behavior: 'smooth' });
            });
        }

        if (relatedPrev) {
            relatedPrev.addEventListener('click', () => {
                relatedTrack.scrollBy({ left: -getRelatedScroll(), behavior: 'smooth' });
            });
        }

        // Update button states
        function updateRelatedBtns() {
            if (relatedPrev) relatedPrev.disabled = relatedTrack.scrollLeft <= 5;
            if (relatedNext) relatedNext.disabled = relatedTrack.scrollLeft + relatedTrack.clientWidth >= relatedTrack.scrollWidth - 5;
        }

        relatedTrack.addEventListener('scroll', updateRelatedBtns);
        updateRelatedBtns();
    }

    // ========================================
    // Scroll animations (subtle fade-in)
    // ========================================
    const animateEls = document.querySelectorAll('.pd-text-block, .pd-gallery, .pd-cta');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05, rootMargin: '50px 0px' });

    animateEls.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // When visible class is added
    const style = document.createElement('style');
    style.textContent = '.pd-text-block.visible, .pd-gallery.visible, .pd-cta.visible { opacity: 1 !important; transform: translateY(0) !important; }';
    document.head.appendChild(style);
});
