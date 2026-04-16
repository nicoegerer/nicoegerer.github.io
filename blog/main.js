/* blog/main.js — Suche + Kategorie-Filter */
document.addEventListener('DOMContentLoaded', () => {
  const cards    = document.querySelectorAll('.blog-card');
  const featured = document.querySelector('.blog-featured');
  const catBtns  = document.querySelectorAll('.cat-btn');
  const search   = document.getElementById('blog-search');
  const noRes    = document.getElementById('blog-no-results');
  let activeCat  = 'all';

  function filter() {
    const q = search.value.toLowerCase().trim();

    // Featured
    if (featured) {
      const fCat   = (featured.dataset.cat || '').split(' ');
      const fTitle = (featured.dataset.title || '').toLowerCase();
      const fOk = (activeCat === 'all' || fCat.includes(activeCat)) && (!q || fTitle.includes(q));
      featured.classList.toggle('hidden', !fOk);
    }

    let vis = 0;
    cards.forEach(c => {
      const cats  = (c.dataset.cat || '').split(' ');
      const title = (c.dataset.title || '').toLowerCase();
      const body  = c.textContent.toLowerCase();
      const show  = (activeCat === 'all' || cats.includes(activeCat)) && (!q || body.includes(q) || title.includes(q));
      c.classList.toggle('hidden', !show);
      if (show) vis++;
    });
    noRes.style.display = vis === 0 ? 'block' : 'none';
  }

  catBtns.forEach(btn => btn.addEventListener('click', () => {
    catBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeCat = btn.dataset.cat;
    filter();
  }));

  search.addEventListener('input', filter);
});
