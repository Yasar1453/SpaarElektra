// Project Detail Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Gallery Slider (horizontal scroll showing ~2.5 images)
    const galleryTrack = document.querySelector('.gallery-track');
    const gallerySlides = galleryTrack ? Array.from(galleryTrack.querySelectorAll('.gallery-slide')) : [];
    const prevBtn = document.querySelector('.gallery-btn.prev');
    const nextBtn = document.querySelector('.gallery-btn.next');
    const dots = Array.from(document.querySelectorAll('.gallery-dots .dot'));

    function getGap() {
        if (!galleryTrack) return 20;
        const style = window.getComputedStyle(galleryTrack);
        return parseInt(style.gap) || parseInt(style.columnGap) || 20;
    }

    function getScrollAmount() {
        if (!gallerySlides.length) return 300;
        const w = gallerySlides[0].getBoundingClientRect().width;
        return Math.round(w + getGap());
    }

    function updateDotsOnScroll() {
        if (!galleryTrack || !dots.length) return;
        const amount = getScrollAmount();
        const index = Math.round(galleryTrack.scrollLeft / amount);
        dots.forEach(d => d.classList.remove('active'));
        if (dots[index]) dots[index].classList.add('active');
    }

    function nextGallery() {
        if (!galleryTrack) return;
        galleryTrack.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    }

    function prevGallery() {
        if (!galleryTrack) return;
        galleryTrack.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    }

    if (nextBtn) nextBtn.addEventListener('click', nextGallery);
    if (prevBtn) prevBtn.addEventListener('click', prevGallery);

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            if (!galleryTrack) return;
            galleryTrack.scrollLeft = i * getScrollAmount();
            updateDotsOnScroll();
        });
    });

    // Auto-advance
    let galleryAuto = null;
    function startGalleryAuto() { stopGalleryAuto(); galleryAuto = setInterval(nextGallery, 5000); }
    function stopGalleryAuto() { if (galleryAuto) { clearInterval(galleryAuto); galleryAuto = null; } }
    if (galleryTrack) {
        galleryTrack.addEventListener('scroll', () => { window.requestAnimationFrame(updateDotsOnScroll); });
        galleryTrack.addEventListener('mouseenter', stopGalleryAuto);
        galleryTrack.addEventListener('mouseleave', startGalleryAuto);
        galleryTrack.addEventListener('focusin', stopGalleryAuto);
        galleryTrack.addEventListener('focusout', startGalleryAuto);
        galleryTrack.setAttribute('tabindex', '0');
        galleryTrack.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') { e.preventDefault(); nextGallery(); }
            if (e.key === 'ArrowLeft') { e.preventDefault(); prevGallery(); }
        });
        startGalleryAuto();
        // initial dots state
        updateDotsOnScroll();
        // update on resize
        window.addEventListener('resize', () => { window.requestAnimationFrame(updateDotsOnScroll); });
    }

    // Smooth scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe content sections
    const sections = document.querySelectorAll('.content-section, .project-quote, .project-cta, .related-projects');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Related projects slider (horizontal scroll) - controls and auto-scroll
    const rpTrack = document.querySelector('.rp-track');
    const rpPrev = document.querySelector('.rp-btn.prev');
    const rpNext = document.querySelector('.rp-btn.next');

    if (rpTrack) {
        let autoTimer = null;

        // Compute scroll amount based on first card width (including gap)
        function getScrollAmount() {
            const card = rpTrack.querySelector('.related-project-card');
            if (!card) return 320;
            const style = window.getComputedStyle(rpTrack);
            const gap = parseInt(style.getPropertyValue('column-gap')) || 20;
            const cardWidth = card.getBoundingClientRect().width;
            return Math.round(cardWidth + gap);
        }

        function scrollNext() {
            rpTrack.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        }

        function scrollPrev() {
            rpTrack.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        }

        if (rpNext) rpNext.addEventListener('click', () => { scrollNext(); resetAuto(); });
        if (rpPrev) rpPrev.addEventListener('click', () => { scrollPrev(); resetAuto(); });

        // Auto-advance every 4.5s
        function startAuto() {
            stopAuto();
            autoTimer = setInterval(() => { scrollNext(); }, 4500);
        }

        function stopAuto() {
            if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
        }

        function resetAuto() { stopAuto(); startAuto(); }

        // Pause on hover / focus
        rpTrack.addEventListener('mouseenter', stopAuto);
        rpTrack.addEventListener('mouseleave', startAuto);
        rpTrack.addEventListener('focusin', stopAuto);
        rpTrack.addEventListener('focusout', startAuto);

        // Make track keyboard-scrollable with arrow keys when focused
        rpTrack.setAttribute('tabindex', '0');
        rpTrack.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') { e.preventDefault(); scrollNext(); resetAuto(); }
            if (e.key === 'ArrowLeft') { e.preventDefault(); scrollPrev(); resetAuto(); }
        });

        startAuto();
    }
});
