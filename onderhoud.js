// ========================================
// Onderhoud page - Tabs + Slider
// ========================================

// --- TABS ---
document.querySelectorAll('.oh-tabs').forEach(tabsContainer => {
    const buttons = tabsContainer.querySelectorAll('.oh-tab-btn');
    const panels = tabsContainer.querySelectorAll('.oh-tab-panel');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all buttons and panels within this container
            buttons.forEach(b => b.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            // Activate clicked button
            btn.classList.add('active');

            // Find and activate corresponding panel
            const tabId = btn.getAttribute('data-tab');
            const panel = tabsContainer.querySelector('#tab-' + tabId);
            if (panel) {
                panel.classList.add('active');
            }
        });
    });
});

// --- PHOTO SLIDER ---
(function() {
    const track = document.querySelector('.oh-slider-track');
    if (!track) return;

    const slides = track.querySelectorAll('.oh-slide');
    const dots = document.querySelectorAll('.oh-dot');
    const prevBtn = document.querySelector('.oh-arrow-prev');
    const nextBtn = document.querySelector('.oh-arrow-next');

    let currentIndex = 0;
    const slidesPerView = () => window.innerWidth <= 480 ? 1 : window.innerWidth <= 768 ? 2 : 3;
    const maxIndex = () => Math.max(0, slides.length - slidesPerView());

    function updateSlider() {
        const perView = slidesPerView();
        const slideWidth = 100 / perView;
        const gap = 12;

        // Calculate offset
        const offset = currentIndex * (track.clientWidth / perView + gap / perView);
        track.style.transform = `translateX(-${offset}px)`;
        track.style.transition = 'transform 0.4s ease';

        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });

        // Update arrows
        if (prevBtn) prevBtn.disabled = currentIndex === 0;
        if (nextBtn) nextBtn.disabled = currentIndex >= maxIndex();
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentIndex < maxIndex()) {
                currentIndex++;
                updateSlider();
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const slideIndex = parseInt(dot.getAttribute('data-slide'));
            if (slideIndex <= maxIndex()) {
                currentIndex = slideIndex;
                updateSlider();
            }
        });
    });

    // Handle resize
    window.addEventListener('resize', () => {
        if (currentIndex > maxIndex()) {
            currentIndex = maxIndex();
        }
        updateSlider();
    });

    updateSlider();
})();
