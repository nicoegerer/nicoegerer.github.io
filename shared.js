/* ================================================================
   shared.js — common functionality for all subpages
   ================================================================ */

   document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------------
       1. SIDEBAR NAVIGATION
       ---------------------------------------------------------------- */
    const burger         = document.getElementById('burger');
    const sidebar        = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const sidebarClose   = document.getElementById('sidebar-close');
  
    function openSidebar() {
      sidebar.classList.add('open');
      sidebarOverlay.classList.add('open');
      sidebar.setAttribute('aria-hidden', 'false');
      burger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
    function closeSidebar() {
      sidebar.classList.remove('open');
      sidebarOverlay.classList.remove('open');
      sidebar.setAttribute('aria-hidden', 'true');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  
    burger.addEventListener('click', () =>
      sidebar.classList.contains('open') ? closeSidebar() : openSidebar()
    );
    sidebarClose.addEventListener('click', closeSidebar);
    sidebarOverlay.addEventListener('click', closeSidebar);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSidebar(); });
    document.querySelectorAll('.sidebar-link-main, .sidebar-link-sub')
      .forEach(l => l.addEventListener('click', closeSidebar));
  
    /* ----------------------------------------------------------------
       2. NAV SCROLL EFFECT
       ---------------------------------------------------------------- */
    const navEl = document.getElementById('nav');
    function updateNav() { navEl.classList.toggle('scrolled', window.scrollY > 50); }
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  
    /* ----------------------------------------------------------------
       3. SCROLL REVEAL
       ---------------------------------------------------------------- */
    const revealEls = document.querySelectorAll('.reveal');
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          revealObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => revealObs.observe(el));
  
    /* ----------------------------------------------------------------
       4. TIMELINE (if present)
       ---------------------------------------------------------------- */
    const tlSection = document.getElementById('tl-section');
    const tlFill    = document.getElementById('tl-fill');
    const tlCards   = document.querySelectorAll('.tl-card');
  
    function updateTimeline() {
      if (!tlSection || !tlFill) return;
      const sectionRect = tlSection.getBoundingClientRect();
      const sectionH    = tlSection.offsetHeight;
      const viewH       = window.innerHeight;
      const scrolled    = viewH - sectionRect.top;
      const total       = sectionH + viewH;
      const ratio       = Math.min(Math.max(scrolled / total, 0), 1);
      tlFill.style.height = (ratio * 100) + '%';
      tlCards.forEach(card => {
        if (card.getBoundingClientRect().top < viewH * 0.88) card.classList.add('visible');
      });
    }
    window.addEventListener('scroll', updateTimeline, { passive: true });
    setTimeout(updateTimeline, 100);
  
    /* ----------------------------------------------------------------
       5. CONTACT FORM (EmailJS — same config as main site)
       ---------------------------------------------------------------- */
    const EMAILJS_PUBLIC_KEY      = '06H9FmKshm9bn70Us';
    const EMAILJS_SERVICE_ID      = 'service_gp9s55y';
    const EMAILJS_TEMPLATE_NOTIFY = 'template_qrftc8c';
    const EMAILJS_TEMPLATE_REPLY  = 'template_2juygdo';
  
    let emailjsReady = false;
    (function loadEmailJS() {
      const s = document.createElement('script');
      s.src   = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
      s.async = true;
      s.onload = () => { emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY }); emailjsReady = true; };
      document.head.appendChild(s);
    })();
  
    const contactForm = document.getElementById('contact-form');
    const cfSuccess   = document.getElementById('cf-success');
    const cfError     = document.getElementById('cf-error');
  
    if (contactForm) {
      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('.cf-submit');
        btn.disabled = true;
        btn.textContent = 'Wird gesendet…';
        cfSuccess.style.display = 'none';
        cfError.style.display   = 'none';
  
        const waitForEmailJS = () => new Promise((resolve, reject) => {
          if (emailjsReady) return resolve();
          let elapsed = 0;
          const iv = setInterval(() => {
            elapsed += 100;
            if (emailjsReady) { clearInterval(iv); resolve(); }
            if (elapsed >= 8000) { clearInterval(iv); reject(new Error('timeout')); }
          }, 100);
        });
  
        const nameVal    = document.getElementById('cf-name').value.trim();
        const emailVal   = document.getElementById('cf-email').value.trim();
        const messageVal = document.getElementById('cf-msg').value.trim();
        const initials   = nameVal.split(' ').map(n => n[0] ?? '').join('').toUpperCase().slice(0,2);
        const timestamp  = new Date().toLocaleString('de-DE', {
          day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit'
        });
  
        const params = { from_name: nameVal, from_email: emailVal, reply_to: emailVal,
                         to_name: 'Nico', initials, message: messageVal, time: timestamp };
        try {
          await waitForEmailJS();
          await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_NOTIFY, params);
          await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_REPLY,
            { from_name: nameVal, message: messageVal, email: emailVal });
          cfSuccess.style.display = 'block';
          contactForm.reset();
        } catch(err) {
          cfError.style.display = 'block';
        } finally {
          btn.disabled = false;
          btn.textContent = 'Absenden';
        }
      });
    }
  
  });