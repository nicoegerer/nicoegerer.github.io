/* ================================================================
   assets/js/components.js
   Single source of truth for NAV + FOOTER + SIDEBAR.
   Included on EVERY page. Edit here → changes everywhere.
   ================================================================ */

/* ---------- SVG ICONS (inline, no external file deps) ---------- */
const SVG_GITHUB = `<svg width="22" height="25" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M23.7223 38.5V33.1976C23.7889 32.3167 23.6744 31.431 23.3863 30.5996C23.0981 29.7682 22.643 29.01 22.0512 28.3756C27.6334 27.7289 33.5 25.5304 33.5 15.4429C33.4995 12.8634 32.5448 10.3829 30.8333 8.51467C31.6437 6.25793 31.5864 3.76348 30.6733 1.5495C30.6733 1.5495 28.5756 0.902868 23.7223 4.28384C19.6476 3.13619 15.3525 3.13619 11.2779 4.28384C6.42456 0.902868 4.32679 1.5495 4.32679 1.5495C3.41367 3.76348 3.35638 6.25793 4.16679 8.51467C2.44257 10.3967 1.48684 12.8997 1.50014 15.4983C1.50014 25.5119 7.36676 27.7105 12.949 28.431C12.3641 29.0591 11.913 29.8081 11.6251 30.6294C11.3372 31.4506 11.2188 32.3258 11.2779 33.1976V38.5" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const SVG_LINKEDIN = `<svg width="22" height="22" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0 2.865C0 1.2825 1.315 0 2.9375 0H37.0625C38.685 0 40 1.2825 40 2.865V37.135C40 38.7175 38.685 40 37.0625 40H2.9375C1.315 40 0 38.7175 0 37.135V2.865ZM12.3575 33.485V15.4225H6.355V33.485H12.3575ZM9.3575 12.955C11.45 12.955 12.7525 11.57 12.7525 9.835C12.715 8.0625 11.4525 6.715 9.3975 6.715C7.3425 6.715 6 8.065 6 9.835C6 11.57 7.3025 12.955 9.3175 12.955H9.3575ZM21.6275 33.485V23.3975C21.6275 22.8575 21.6675 22.3175 21.8275 21.9325C22.26 20.855 23.2475 19.7375 24.9075 19.7375C27.08 19.7375 27.9475 21.3925 27.9475 23.8225V33.485H33.95V23.125C33.95 17.575 30.99 14.995 27.04 14.995C23.855 14.995 22.4275 16.745 21.6275 17.9775V18.04H21.5875L21.6275 17.9775V15.4225H15.6275C15.7025 17.1175 15.6275 33.485 15.6275 33.485H21.6275Z" fill="white"/>
</svg>`;

/* ---------- NAV LINKS config — edit here to change all pages --- */
const NAV_LINKS = [
  { label: 'Home',          href: '/',         main: true  },
  { label: 'Über Mich',     href: '/about',    main: true  },
  { label: 'Projekte',      href: '/projects', main: true  },
  { label: 'JumpJump',      href: '/JumpJump', main: false },
  { label: 'Erfahrung',     href: '/work',     main: true  },
  { label: 'Kontakt',       href: '/contact',  main: true  },
  { label: 'Meine Profile', href: '/profiles', main: true  },
  { label: 'GitHub',        href: 'https://github.com/nicoegerer', main: false, external: true },
  { label: 'LinkedIn',      href: 'https://www.linkedin.com/in/nico-egerer/', main: false, external: true },
];

const FOOTER_COLS = [
  { main: { label: 'Startseite', href: '/' } },
  { main: { label: 'Über Mich',  href: '/about'  }, subs: [{ label: 'Lebenslauf', href: '/CV' }] },
  { main: { label: 'Projekte',   href: '/projects' } },
  { main: { label: 'Kontakt',    href: '/contact'  } },
  {
    main: { label: 'Meine Profile', href: '/profiles' },
    subs: [
      { label: 'GitHub',   href: 'https://github.com/nicoegerer', external: true },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nico-egerer/', external: true },
    ]
  },
];

/* ---------- Determine active path ----------------------------- */
function getActivePath() {
  const p = window.location.pathname.replace(/\/$/, '') || '/';
  return p;
}

/* ---------- Build and inject NAV ------------------------------ */
function injectNav() {
  const active = getActivePath();

  const sidebarLinksHTML = NAV_LINKS.map(l => {
    const cls   = l.main ? 'sidebar-link-main' : 'sidebar-link-sub';
    const ext   = l.external ? 'target="_blank" rel="noopener"' : '';
    const isCur = (l.href !== 'https://github.com/nicoegerer' && l.href !== 'https://www.linkedin.com/in/nico-egerer/')
                  && active === l.href ? ' active' : '';
    return `<a href="${l.href}" class="${cls}${isCur}" ${ext}>${l.label}</a>`;
  }).join('\n');

  const html = `
  <header class="nav" id="nav">
    <div class="nav-inner">
      <a href="/" class="nav-logo">Nico</a>
      <div class="nav-right">
        <a href="https://github.com/nicoegerer" target="_blank" rel="noopener"
           aria-label="GitHub" class="nav-icon">
          ${SVG_GITHUB}
        </a>
        <a href="https://www.linkedin.com/in/nico-egerer/" target="_blank" rel="noopener"
           aria-label="LinkedIn" class="nav-icon">
          ${SVG_LINKEDIN}
        </a>
        <button class="burger" id="burger" aria-label="Menü öffnen" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>

  <div class="sidebar-overlay" id="sidebar-overlay"></div>
  <nav class="sidebar" id="sidebar" aria-hidden="true">
    <button class="sidebar-close" id="sidebar-close" aria-label="Menü schließen">✕</button>
    <div class="sidebar-links">
      ${sidebarLinksHTML}
    </div>
  </nav>`;

  document.body.insertAdjacentHTML('afterbegin', html);
}

/* ---------- Build and inject FOOTER --------------------------- */
function injectFooter() {
  const colsHTML = FOOTER_COLS.map(col => {
    const subHTML = (col.subs || []).map(s => {
      const ext = s.external ? 'target="_blank" rel="noopener"' : '';
      return `<a href="${s.href}" class="footer-sub" ${ext}>${s.label}</a>`;
    }).join('\n');
    return `<div class="footer-col">
      <a href="${col.main.href}" class="footer-main">${col.main.label}</a>
      ${subHTML}
    </div>`;
  }).join('\n');

  const html = `
  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-links">
        ${colsHTML}
      </div>
      <div class="footer-bottom">
        <a href="/" class="footer-logo">Nico</a>
        <div class="footer-social">
          <a href="https://github.com/nicoegerer" target="_blank" rel="noopener"
             aria-label="GitHub" class="nav-icon footer-social-icon">
            ${SVG_GITHUB}
          </a>
          <a href="https://www.linkedin.com/in/nico-egerer/" target="_blank" rel="noopener"
             aria-label="LinkedIn" class="nav-icon footer-social-icon">
            ${SVG_LINKEDIN}
          </a>
        </div>
      </div>
    </div>
  </footer>`;

  document.body.insertAdjacentHTML('beforeend', html);
}

/* ---------- Sidebar behaviour --------------------------------- */
function initSidebar() {
  const burger         = document.getElementById('burger');
  const sidebar        = document.getElementById('sidebar');
  const overlay        = document.getElementById('sidebar-overlay');
  const closeBtn       = document.getElementById('sidebar-close');

  const open  = () => {
    sidebar.classList.add('open');
    overlay.classList.add('open');
    sidebar.setAttribute('aria-hidden', 'false');
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };
  const close = () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
    sidebar.setAttribute('aria-hidden', 'true');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  burger.addEventListener('click', () => sidebar.classList.contains('open') ? close() : open());
  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  document.querySelectorAll('.sidebar-link-main, .sidebar-link-sub')
    .forEach(l => l.addEventListener('click', close));
}

/* ---------- Nav scroll effect --------------------------------- */
function initNavScroll() {
  const nav = document.getElementById('nav');
  const upd = () => nav.classList.toggle('scrolled', window.scrollY > 50);
  window.addEventListener('scroll', upd, { passive: true });
  upd();
}

/* ---------- Scroll reveal ------------------------------------- */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
}

/* ---------- Timeline ------------------------------------------ */
function initTimeline() {
  const tlSection = document.getElementById('tl-section');
  const tlFill    = document.getElementById('tl-fill');
  const tlCards   = document.querySelectorAll('.tl-card');
  if (!tlSection || !tlFill) return;

  const update = () => {
    const r = tlSection.getBoundingClientRect();
    const ratio = Math.min(Math.max((window.innerHeight - r.top) / (r.height + window.innerHeight), 0), 1);
    tlFill.style.height = (ratio * 100) + '%';
    tlCards.forEach(c => {
      if (c.getBoundingClientRect().top < window.innerHeight * 0.88) c.classList.add('visible');
    });
  };
  window.addEventListener('scroll', update, { passive: true });
  setTimeout(update, 100);
}

/* ---------- EmailJS contact form ------------------------------ */
const EMAILJS_PUBLIC_KEY      = '06H9FmKshm9bn70Us';
const EMAILJS_SERVICE_ID      = 'service_gp9s55y';
const EMAILJS_TEMPLATE_NOTIFY = 'template_qrftc8c';
const EMAILJS_TEMPLATE_REPLY  = 'template_2juygdo';

function initContactForm() {
  const form    = document.getElementById('contact-form');
  const success = document.getElementById('cf-success');
  const error   = document.getElementById('cf-error');
  if (!form) return;

  let ejsReady = false;
  const s = document.createElement('script');
  s.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
  s.async = true;
  s.onload = () => { emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY }); ejsReady = true; };
  document.head.appendChild(s);

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('.cf-submit');
    btn.disabled = true; btn.textContent = 'Wird gesendet…';
    success.style.display = 'none'; error.style.display = 'none';

    const wait = () => new Promise((res, rej) => {
      if (ejsReady) return res();
      let t = 0;
      const iv = setInterval(() => {
        t += 100;
        if (ejsReady) { clearInterval(iv); res(); }
        if (t >= 8000) { clearInterval(iv); rej(); }
      }, 100);
    });

    const name = document.getElementById('cf-name').value.trim();
    const mail = document.getElementById('cf-email').value.trim();
    const msg  = document.getElementById('cf-msg').value.trim();
    const ts   = new Date().toLocaleString('de-DE', { day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit' });

    try {
      await wait();
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_NOTIFY,
        { from_name: name, from_email: mail, reply_to: mail, to_name: 'Nico',
          initials: name.split(' ').map(n => n[0] ?? '').join('').toUpperCase().slice(0,2),
          message: msg, time: ts });
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_REPLY,
        { from_name: name, message: msg, email: mail });
      success.style.display = 'block'; form.reset();
    } catch {
      error.style.display = 'block';
    } finally {
      btn.disabled = false; btn.textContent = 'Absenden';
    }
  });
}

/* ---------- BOOT -------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  injectNav();
  injectFooter();
  initSidebar();
  initNavScroll();
  initReveal();
  initTimeline();
  initContactForm();
});
