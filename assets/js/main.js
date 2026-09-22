document.documentElement.classList.add('js');
document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.site-header');
  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const backTop = document.querySelector('.back-top');
  const setScrollState = () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 12);
    if (backTop) backTop.classList.toggle('show', window.scrollY > 520);
  };
  setScrollState();
  window.addEventListener('scroll', setScrollState, { passive: true });

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      menuBtn.classList.toggle('open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      navLinks.classList.remove('open'); menuBtn.classList.remove('open'); menuBtn.setAttribute('aria-expanded','false');
    }));
  }
  if (backTop) backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const reveals = [...document.querySelectorAll('.reveal')];
  reveals.forEach((el, i) => el.style.setProperty('--i', i % 5));
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const io = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); io.unobserve(entry.target); }
    }), { threshold: 0.11, rootMargin: '0px 0px -4% 0px' });
    reveals.forEach(el => io.observe(el));
  } else reveals.forEach(el => el.classList.add('visible'));

  const heroRings = document.querySelector('.hero-rings');
  if (heroRings) {
    const orbitLinks = heroRings.querySelectorAll('.orbit-chip');
    const pauseOrbit = () => heroRings.classList.add('is-paused');
    const resumeOrbit = () => heroRings.classList.remove('is-paused');
    orbitLinks.forEach(link => {
      link.addEventListener('mouseenter', pauseOrbit);
      link.addEventListener('mouseleave', resumeOrbit);
      link.addEventListener('focus', pauseOrbit);
      link.addEventListener('blur', resumeOrbit);
    });
  }

  const lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    const image = lightbox.querySelector('img');
    const close = () => { lightbox.classList.remove('open'); lightbox.setAttribute('aria-hidden','true'); image.src=''; document.body.style.overflow=''; };
    document.querySelectorAll('.gallery button[data-full]').forEach(btn => btn.addEventListener('click', () => {
      image.src = btn.dataset.full; image.alt = btn.dataset.alt || ''; lightbox.classList.add('open'); lightbox.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden';
    }));
    lightbox.querySelector('.lightbox-close')?.addEventListener('click', close);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }

  const form = document.querySelector('[data-mailto-form]');
  if (form) form.addEventListener('submit', function(e) {
    e.preventDefault();
    const data = new FormData(form);
    const name = (data.get('name') || '').toString().trim();
    const email = (data.get('email') || '').toString().trim();
    const org = (data.get('organization') || '').toString().trim();
    const subject = (data.get('subject') || 'Professional enquiry').toString().trim();
    const message = (data.get('message') || '').toString().trim();
    const body = `Name: ${name}\nEmail: ${email}\nOrganization: ${org}\n\n${message}`;
    window.location.href = `mailto:razpab79@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const status = form.querySelector('.form-status');
    if (status) status.textContent = 'Your email app should open with this message prepared.';
  });
});
