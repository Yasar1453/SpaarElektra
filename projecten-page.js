// ========================================
// Projects page carousel
// ========================================
const projRows = document.querySelectorAll('.proj-carousel-row');
const projNext = document.getElementById('projNext');
const projPrev = document.getElementById('projPrev');
const projDotsContainer = document.getElementById('projDots');

function getProjScrollAmount() {
    const firstCard = document.querySelector('.proj-card');
    if (firstCard) return firstCard.offsetWidth + 20;
    return 400;
}

// Create dots
if (projDotsContainer && projRows.length > 0) {
    const firstRow = projRows[0];
    const visibleWidth = firstRow.clientWidth;
    const totalWidth = firstRow.scrollWidth;
    const numDots = Math.max(1, Math.ceil(totalWidth / visibleWidth));

    for (let i = 0; i < numDots; i++) {
        const dot = document.createElement('button');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            projRows.forEach(row => {
                row.scrollTo({ left: i * visibleWidth, behavior: 'smooth' });
            });
        });
        projDotsContainer.appendChild(dot);
    }

    firstRow.addEventListener('scroll', () => {
        const dots = projDotsContainer.querySelectorAll('.dot');
        const scrollPos = firstRow.scrollLeft;
        const activeIndex = Math.round(scrollPos / visibleWidth);
        dots.forEach((d, i) => d.classList.toggle('active', i === activeIndex));
    });
}

if (projNext) {
    projNext.addEventListener('click', () => {
        const scrollAmount = getProjScrollAmount();
        projRows.forEach(row => {
            row.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    });
}

if (projPrev) {
    projPrev.addEventListener('click', () => {
        const scrollAmount = getProjScrollAmount();
        projRows.forEach(row => {
            row.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
    });
}
