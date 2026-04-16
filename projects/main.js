/* projects/main.js — Kategorie-Filter */
document.addEventListener('DOMContentLoaded', () => {
  const btns  = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.proj-card');

  btns.forEach(btn => btn.addEventListener('click', () => {
    btns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    cards.forEach(c => {
      const cats = (c.dataset.cat || '').split(' ');
      c.classList.toggle('hidden', f !== 'all' && !cats.includes(f));
    });
  }));
});
