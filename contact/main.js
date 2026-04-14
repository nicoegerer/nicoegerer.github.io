/* contact/main.js — FAQ accordion */
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.faq-q').forEach(btn => {
      btn.addEventListener('click', () => {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        document.querySelectorAll('.faq-q').forEach(b => {
          b.setAttribute('aria-expanded', 'false');
          b.nextElementSibling.classList.remove('open');
        });
        if (!expanded) {
          btn.setAttribute('aria-expanded', 'true');
          btn.nextElementSibling.classList.add('open');
        }
      });
    });
  });