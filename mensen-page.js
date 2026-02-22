// ========================================
// Mensen Page - Team Slider & Faces Carousel
// ========================================
document.addEventListener('DOMContentLoaded', function () {

    // ========================================
    // Team Slider
    // ========================================
    const teamTrack = document.querySelector('.mp-team-track');
    const teamNext = document.querySelector('.mp-team-next');
    const teamPrev = document.querySelector('.mp-team-prev');
    const teamDots = document.querySelector('.mp-team-dots');

    if (teamTrack) {
        function getTeamScroll() {
            var card = teamTrack.querySelector('.mp-team-card');
            if (!card) return 344;
            var gap = parseInt(getComputedStyle(teamTrack).gap) || 24;
            return card.offsetWidth + gap;
        }

        // Create dots - one per card, each click scrolls 1 card
        if (teamDots) {
            var cards = teamTrack.querySelectorAll('.mp-team-card');
            var numDots = cards.length;
            for (var i = 0; i < numDots; i++) {
                var dot = document.createElement('button');
                dot.classList.add('dot');
                if (i === 0) dot.classList.add('active');
                (function (idx) {
                    dot.addEventListener('click', function () {
                        var scrollAmount = idx * getTeamScroll();
                        teamTrack.scrollTo({ left: scrollAmount, behavior: 'smooth' });
                    });
                })(i);
                teamDots.appendChild(dot);
            }

            teamTrack.addEventListener('scroll', function () {
                var dots = teamDots.querySelectorAll('.dot');
                var cardWidth = getTeamScroll();
                var activeIdx = Math.round(teamTrack.scrollLeft / cardWidth);
                dots.forEach(function (d, j) {
                    d.classList.toggle('active', j === activeIdx);
                });
            });
        }

        if (teamNext) {
            teamNext.addEventListener('click', function () {
                teamTrack.scrollBy({ left: getTeamScroll(), behavior: 'smooth' });
            });
        }

        if (teamPrev) {
            teamPrev.addEventListener('click', function () {
                teamTrack.scrollBy({ left: -getTeamScroll(), behavior: 'smooth' });
            });
        }

        // Update button states
        function updateTeamBtns() {
            if (teamPrev) teamPrev.disabled = teamTrack.scrollLeft <= 5;
            if (teamNext) teamNext.disabled = teamTrack.scrollLeft + teamTrack.clientWidth >= teamTrack.scrollWidth - 5;
        }

        teamTrack.addEventListener('scroll', updateTeamBtns);
        updateTeamBtns();

        // Touch / swipe support
        var teamStartX = 0;
        var teamScrollStart = 0;

        teamTrack.addEventListener('touchstart', function (e) {
            teamStartX = e.touches[0].clientX;
            teamScrollStart = teamTrack.scrollLeft;
        }, { passive: true });

        teamTrack.addEventListener('touchmove', function (e) {
            var dx = teamStartX - e.touches[0].clientX;
            teamTrack.scrollLeft = teamScrollStart + dx;
        }, { passive: true });
    }

    // ========================================
    // Faces Carousel (two-row, synchronized)
    // ========================================
    var facesRow1 = document.querySelector('.mp-faces-row-1');
    var facesRow2 = document.querySelector('.mp-faces-row-2');
    var facesNext = document.querySelector('.mp-faces-next');
    var facesPrev = document.querySelector('.mp-faces-prev');

    if (facesRow1) {
        function getFaceScroll() {
            var card = facesRow1.querySelector('.mp-face-card');
            if (!card) return 236;
            var gap = parseInt(getComputedStyle(facesRow1).gap) || 16;
            return card.offsetWidth + gap;
        }

        if (facesNext) {
            facesNext.addEventListener('click', function () {
                var amount = getFaceScroll();
                facesRow1.scrollBy({ left: amount, behavior: 'smooth' });
                if (facesRow2) facesRow2.scrollBy({ left: amount, behavior: 'smooth' });
            });
        }

        if (facesPrev) {
            facesPrev.addEventListener('click', function () {
                var amount = -getFaceScroll();
                facesRow1.scrollBy({ left: amount, behavior: 'smooth' });
                if (facesRow2) facesRow2.scrollBy({ left: amount, behavior: 'smooth' });
            });
        }

        // Touch / swipe support for faces rows
        [facesRow1, facesRow2].forEach(function (row) {
            if (!row) return;
            var startX = 0;
            var scrollStart = 0;

            row.addEventListener('touchstart', function (e) {
                startX = e.touches[0].clientX;
                scrollStart = row.scrollLeft;
            }, { passive: true });

            row.addEventListener('touchmove', function (e) {
                var dx = startX - e.touches[0].clientX;
                row.scrollLeft = scrollStart + dx;
                // Sync the other row
                var otherRow = row === facesRow1 ? facesRow2 : facesRow1;
                if (otherRow) otherRow.scrollLeft = scrollStart + dx;
            }, { passive: true });
        });
    }

    // ========================================
    // Scroll animations (subtle fade-in)
    // ========================================
    var animateEls = document.querySelectorAll('.mp-text, .mp-imgtext, .mp-faces, .mp-cta');
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('mp-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05, rootMargin: '50px 0px' });

    animateEls.forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    var style = document.createElement('style');
    style.textContent = '.mp-visible { opacity: 1 !important; transform: translateY(0) !important; }';
    document.head.appendChild(style);
});
