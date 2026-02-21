document.addEventListener('DOMContentLoaded', function () {
  const jobsList = document.getElementById('jobs-list');
  const search = document.getElementById('job-search');
  const filter = document.getElementById('filter-type');

  // Toggle details
  if (jobsList) {
    jobsList.addEventListener('click', (e) => {
      const btn = e.target.closest('.details-btn');
      if (!btn) return;
      const card = btn.closest('.job-card');
      card.classList.toggle('open');
      btn.textContent = card.classList.contains('open') ? 'Sluit' : 'Bekijk vacature';
    });
  }

  // Simple filter & search
  function applyFilters() {
    const q = search.value.trim().toLowerCase();
    const type = filter.value;
    const cards = jobsList.querySelectorAll('.job-card');
    cards.forEach(card => {
      const title = card.dataset.title.toLowerCase();
      const location = card.dataset.location.toLowerCase();
      const matchesQuery = !q || title.includes(q) || location.includes(q);
      const matchesType = (type === 'all') || (card.dataset.type === type);
      card.style.display = (matchesQuery && matchesType) ? '' : 'none';
    });
  }

  if (search && filter) {
    search.addEventListener('input', applyFilters);
    filter.addEventListener('change', applyFilters);
  }

  // Team Slider
  const teamSlider = document.querySelector('.team-slider');
  const teamLeftArrow = document.querySelector('.team-nav-arrow.left');
  const teamRightArrow = document.querySelector('.team-nav-arrow.right');

  if (teamSlider && teamLeftArrow && teamRightArrow) {
    let teamScrollPosition = 0;
    const teamCardWidth = teamSlider.querySelector('.team-member-card').offsetWidth;
    const teamGap = 30;
    const teamScrollAmount = teamCardWidth + teamGap;

    teamLeftArrow.addEventListener('click', () => {
      teamScrollPosition = Math.max(0, teamScrollPosition - teamScrollAmount);
      teamSlider.style.transform = `translateX(-${teamScrollPosition}px)`;
    });

    teamRightArrow.addEventListener('click', () => {
      const maxScroll = teamSlider.scrollWidth - teamSlider.parentElement.offsetWidth;
      teamScrollPosition = Math.min(maxScroll, teamScrollPosition + teamScrollAmount);
      teamSlider.style.transform = `translateX(-${teamScrollPosition}px)`;
    });
  }
});
