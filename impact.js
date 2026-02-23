// ========================================
// Impact page - Carousels
// ========================================

function initCarousel(trackId, dotsId, nextSelector, prevSelector) {
    const track = document.getElementById(trackId);
    if (!track) return;

    const cards = track.querySelectorAll('.imp-card');
    const dotsContainer = document.getElementById(dotsId);
    const dots = dotsContainer ? dotsContainer.querySelectorAll('.imp-dot') : [];
    const nextBtn = document.querySelector(nextSelector);
    const prevBtn = document.querySelector(prevSelector);

    let currentIndex = 0;
    const cardsPerView = () => window.innerWidth <= 480 ? 1 : window.innerWidth <= 768 ? 2 : 3;
    const maxIndex = () => Math.max(0, cards.length - cardsPerView());

    function update() {
        const perView = cardsPerView();
        const gap = 16;
        const cardWidth = (track.clientWidth - (perView - 1) * gap) / perView;
        const offset = currentIndex * (cardWidth + gap);
        track.style.transform = `translateX(-${offset}px)`;

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });

        if (prevBtn) prevBtn.disabled = currentIndex === 0;
        if (nextBtn) nextBtn.disabled = currentIndex >= maxIndex();
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentIndex < maxIndex()) {
                currentIndex++;
                update();
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                update();
            }
        });
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const idx = parseInt(dot.getAttribute('data-slide'));
            if (idx <= maxIndex()) {
                currentIndex = idx;
                update();
            }
        });
    });

    window.addEventListener('resize', () => {
        if (currentIndex > maxIndex()) currentIndex = maxIndex();
        update();
    });

    update();
}

// Initialize both carousels
initCarousel('impCarousel1', 'impDots1', '.imp-arrow-next', '.imp-arrow-prev');
initCarousel('impCarousel2', 'impDots2', '.imp-arrow-next2', '.imp-arrow-prev2');
