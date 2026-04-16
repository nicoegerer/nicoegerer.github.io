/* ================================================================
   main.js — Startseiten-spezifisches JavaScript
   
   Nav, Sidebar, Scroll-Reveal, EmailJS-Formular →
   assets/js/components.js (läuft auf allen Seiten)

   Diese Datei enthält nur was exklusiv für die Startseite ist:
   → Timeline mit Dots
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ================================================================
     TIMELINE — Fortschrittsbalken + animierte Dots
     ================================================================ */

  const tlSection  = document.getElementById('tl-section');
  const tlFill     = document.getElementById('tl-fill');
  const tlEntries  = document.getElementById('tl-entries');
  const tlCards    = document.querySelectorAll('.tl-card');
  const tlTrack    = document.querySelector('.tl-track');
  const tlDotsWrap = document.getElementById('tl-dots-wrap');

  function buildTimelineDots() {
    if (!tlTrack || !tlEntries) return;

    const entriesH = tlEntries.offsetHeight;
    tlTrack.style.height = entriesH + 'px';

    tlDotsWrap.innerHTML = '';

    tlCards.forEach((card) => {
      const cardTop = card.offsetTop;
      const cardMid = cardTop + card.offsetHeight / 2;

      const trackRect   = tlTrack.getBoundingClientRect();
      const entriesRect = tlEntries.getBoundingClientRect();
      const relOffset   = entriesRect.top - trackRect.top;

      const dotTop = relOffset + cardMid;

      const dot = document.createElement('div');
      dot.className = 'tl-dot';
      dot.style.top = dotTop + 'px';
      dot.dataset.cardIndex = card.dataset.tl;
      tlDotsWrap.appendChild(dot);
    });
  }

  function updateTimeline() {
    if (!tlSection || !tlFill) return;

    const sectionRect = tlSection.getBoundingClientRect();
    const sectionH    = tlSection.offsetHeight;
    const viewH       = window.innerHeight;

    const scrolled = viewH - sectionRect.top;
    const total    = sectionH + viewH;
    const ratio    = Math.min(Math.max(scrolled / total, 0), 1);

    tlFill.style.height = (ratio * 100) + '%';

    const dots   = document.querySelectorAll('.tl-dot');
    const trackH = tlTrack ? tlTrack.offsetHeight : 1;
    const fillPx = ratio * trackH;

    dots.forEach((dot) => {
      const dotTop = parseFloat(dot.style.top) || 0;
      dot.classList.toggle('active', fillPx >= dotTop);
    });

    tlCards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      if (rect.top < viewH * 0.9) {
        card.classList.add('visible');
      }
    });
  }

  setTimeout(() => {
    buildTimelineDots();
    updateTimeline();
  }, 120);

  window.addEventListener('scroll', updateTimeline, { passive: true });
  window.addEventListener('resize', () => {
    buildTimelineDots();
    updateTimeline();
  });

});
