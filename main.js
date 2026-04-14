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
  
    // ================================================================
    //  EMAILJS — Kontaktformular
    // ================================================================
    
    const EMAILJS_PUBLIC_KEY      = '06H9FmKshm9bn70Us';
    const EMAILJS_SERVICE_ID      = 'service_gp9s55y';
    const EMAILJS_TEMPLATE_NOTIFY = 'template_qrftc8c';   // Kontakt
    const EMAILJS_TEMPLATE_REPLY  = 'template_2juygdo';   // Auto-Reply an Besucher
    
    let emailjsReady = false;
    
    (function loadEmailJS() {
      const script  = document.createElement('script');
      script.src    = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
      script.async  = true;
      script.onload = () => {
        emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
        emailjsReady = true;
      };
      script.onerror = () => console.error('[EmailJS] Script konnte nicht geladen werden.');
      document.head.appendChild(script);
    })();
    
    const contactForm = document.getElementById('contact-form');
    const cfSuccess   = document.getElementById('cf-success');
    const cfError     = document.getElementById('cf-error');
    
    if (contactForm) {
      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
    
        const submitBtn       = contactForm.querySelector('.cf-submit');
        submitBtn.disabled    = true;
        submitBtn.textContent = 'Wird gesendet…';
        cfSuccess.style.display = 'none';
        cfError.style.display   = 'none';
    
        // Warten bis EmailJS bereit ist (max. 8 s)
        const waitForEmailJS = () => new Promise((resolve, reject) => {
          if (emailjsReady) return resolve();
          let elapsed = 0;
          const interval = setInterval(() => {
            elapsed += 100;
            if (emailjsReady) { clearInterval(interval); resolve(); }
            if (elapsed >= 8000) { clearInterval(interval); reject(new Error('EmailJS timeout')); }
          }, 100);
        });
    
        const nameVal    = document.getElementById('cf-name').value.trim();
        const emailVal   = document.getElementById('cf-email').value.trim();
        const messageVal = document.getElementById('cf-msg').value.trim();
        const initials   = nameVal.split(' ').map(n => n[0] ?? '').join('').toUpperCase().slice(0, 2);
        const timestamp  = new Date().toLocaleString('de-DE', {
          day: '2-digit', month: '2-digit', year: 'numeric',
          hour: '2-digit', minute: '2-digit'
        });
    
        const templateParams = {
          from_name:  nameVal,
          from_email: emailVal,
          reply_to:   emailVal,
          to_name:    'Nico',
          initials,
          message:    messageVal,
          time:       timestamp,
        };
    
        try {
          await waitForEmailJS();
    
          // 1) Benachrichtig senden
          await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_NOTIFY, templateParams);
    
          // 2) Auto-Reply an den Besucher
          await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_REPLY,{
            from_name: nameVal,
            message: messageVal,
            email: emailVal,
            });
    
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