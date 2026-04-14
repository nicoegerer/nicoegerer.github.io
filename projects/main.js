/* projects/main.js — filter functionality */
document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards      = document.querySelectorAll('.project-card');
  
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
  
        const filter = btn.dataset.filter;
        cards.forEach(card => {
          if (filter === 'all') {
            card.classList.remove('hidden');
          } else {
            const cats = (card.dataset.category || '').split(' ');
            card.classList.toggle('hidden', !cats.includes(filter));
          }
        });
      });
    });
  });