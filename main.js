    document.addEventListener('DOMContentLoaded', () => {

    /* ================================================================
       1. SIDEBAR NAVIGATION
       ================================================================ */
  
    const burger          = document.getElementById('burger');
    const sidebar         = document.getElementById('sidebar');
    const sidebarOverlay  = document.getElementById('sidebar-overlay');
    const sidebarClose    = document.getElementById('sidebar-close');
  
    function openSidebar() {
      sidebar.classList.add('open');
      sidebarOverlay.classList.add('open');
      sidebar.setAttribute('aria-hidden', 'false');
      burger.classList.add('open');
      burger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  
    function closeSidebar() {
      sidebar.classList.remove('open');
      sidebarOverlay.classList.remove('open');
      sidebar.setAttribute('aria-hidden', 'true');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  
    burger.addEventListener('click', () => {
      sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
    });
  
    sidebarClose.addEventListener('click', closeSidebar);
    sidebarOverlay.addEventListener('click', closeSidebar);
  
    // ESC-Taste schließt Sidebar
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeSidebar();
    });
  
    // Sidebar-Links schließen nach Klick
    document.querySelectorAll('.sidebar-link-main, .sidebar-link-sub')
      .forEach(link => link.addEventListener('click', closeSidebar));
  
  
    /* ================================================================
       2. NAVIGATIONS-SCROLL-EFFEKT  (Hintergrund beim Scrollen)
       ================================================================ */
  
    const navEl = document.getElementById('nav');
  
    function updateNav() {
      navEl.classList.toggle('scrolled', window.scrollY > 50);
    }
  
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  
  
    /* ================================================================
       3. TIMELINE
       ================================================================ */
  
    const tlSection  = document.getElementById('tl-section');
    const tlFill     = document.getElementById('tl-fill');
    const tlEntries  = document.getElementById('tl-entries');
    const tlCards    = document.querySelectorAll('.tl-card');
    const tlTrack    = document.querySelector('.tl-track');
  
    function buildTimelineDots() {
      if (!tlTrack || !tlEntries) return;
  
      const entriesH = tlEntries.offsetHeight;
      tlTrack.style.height = entriesH + 'px';
  
      tlDotsWrap.innerHTML = '';
  
      tlCards.forEach((card) => {
        const cardTop    = card.offsetTop;
        const cardMid    = cardTop + card.offsetHeight / 2;
  
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
  
    // Timeline-Fortschrittsbalken aktualisieren
    function updateTimeline() {
      if (!tlSection || !tlFill) return;
  
      const sectionRect = tlSection.getBoundingClientRect();
      const sectionH    = tlSection.offsetHeight;
      const viewH       = window.innerHeight;
  
      const scrolled    = viewH - sectionRect.top;
      const total       = sectionH + viewH;
      const ratio       = Math.min(Math.max(scrolled / total, 0), 1);
  
      tlFill.style.height = (ratio * 100) + '%';
  
      const dots = document.querySelectorAll('.tl-dot');
      const trackH = tlTrack ? tlTrack.offsetHeight : 1;
      const fillPx = (ratio * trackH);
  
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
  
    window.addEventListener('scroll',  updateTimeline, { passive: true });
    window.addEventListener('resize', () => {
      buildTimelineDots();
      updateTimeline();
    });
  
    // ---- EmailJS Konfiguration
    const EMAILJS_PUBLIC_KEY  = '06H9FmKshm9bn70Us';    // z.B. "abc123xyz"
    const EMAILJS_SERVICE_ID  = 'service_vu1n7hi';    // z.B. "service_abc"
    const EMAILJS_TEMPLATE_ID = 'WebsiteMail';   // z.B. "template_xyz"
    // ------------------------------------------------
  
    const emailjsScript = document.createElement('script');
    emailjsScript.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    emailjsScript.onload = () => {
      if (window.emailjs) {
        emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
      }
    };
    document.head.appendChild(emailjsScript);
  
    const contactForm = document.getElementById('contact-form');
    const cfSuccess   = document.getElementById('cf-success');
    const cfError     = document.getElementById('cf-error');
  
    if (contactForm) {
      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
  
        const submitBtn = contactForm.querySelector('.cf-submit');
        submitBtn.disabled    = true;
        submitBtn.textContent = 'Wird gesendet...';
        cfSuccess.style.display = 'none';
        cfError.style.display   = 'none';
  
        const name    = document.getElementById('cf-name').value.trim();
        const email   = document.getElementById('cf-email').value.trim();
        const message = document.getElementById('cf-msg').value.trim();
  
        // Fehlermeldung falls EmailJS noch nicht konfiguriert
        if (EMAILJS_PUBLIC_KEY === 'DEIN_PUBLIC_KEY') {
          console.warn('[EmailJS] Bitte Public Key, Service ID und Template ID in main.js eintragen.');
          // Fallback: mailto öffnen
          const subject = encodeURIComponent('Kontaktanfrage von ' + name);
          const body    = encodeURIComponent('Name: ' + name + '\nE-Mail: ' + email + '\n\n' + message);
          window.open('mailto:mail@nicoegerer.de?subject=' + subject + '&body=' + body);
          cfSuccess.style.display = 'block';
          contactForm.reset();
          submitBtn.disabled    = false;
          submitBtn.textContent = 'Absenden';
          return;
        }
  
        try {
          await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            {
              from_name:  name,
              from_email: email,
              message:    message,
              to_email:   'mail@nicoegerer.de',
            }
          );
  
          cfSuccess.style.display = 'block';
          contactForm.reset();
  
        } catch (err) {
          console.error('[EmailJS] Fehler:', err);
          cfError.style.display = 'block';
  
        } finally {
          submitBtn.disabled    = false;
          submitBtn.textContent = 'Absenden';
        }
      });
    }
  
  });