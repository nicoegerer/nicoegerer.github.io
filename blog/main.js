/* blog/main.js — search + category filter */
document.addEventListener('DOMContentLoaded', () => {
    const cards      = document.querySelectorAll('.blog-card');
    const catBtns    = document.querySelectorAll('.cat-btn');
    const searchInput= document.getElementById('blog-search');
    const noResults  = document.getElementById('blog-no-results');
  
    let activeCat = 'all';
  
    function filterCards() {
      const query = searchInput.value.toLowerCase().trim();
      let visible = 0;
      cards.forEach(card => {
        const cats  = (card.dataset.cat || '').split(' ');
        const title = (card.dataset.title || '').toLowerCase();
        const text  = card.textContent.toLowerCase();
        const catOk = activeCat === 'all' || cats.includes(activeCat);
        const qOk   = !query || text.includes(query) || title.includes(query);
        const show  = catOk && qOk;
        card.classList.toggle('hidden', !show);
        if (show) visible++;
      });
      noResults.style.display = visible === 0 ? 'block' : 'none';
    }
  
    catBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        catBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeCat = btn.dataset.cat;
        filterCards();
      });
    });
  
    searchInput.addEventListener('input', filterCards);
  });