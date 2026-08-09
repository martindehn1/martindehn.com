(() => {
  const nav = document.getElementById('siteNav');
  const navLinks = document.getElementById('navLinks');
  const navToggle = document.getElementById('navToggle');
  const progressBar = document.getElementById('progressBar');
  const yearEl = document.getElementById('year');

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Scroll state: translucent nav becomes opaque, progress bar fills.
  const onScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    nav.classList.toggle('is-scrolled', scrollTop > 8);
    if (progressBar) progressBar.style.width = `${pct}%`;
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu: opens and closes along the same edge (right), never traps focus.
  const closeMenu = () => {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Menü öffnen');
  };
  const openMenu = () => {
    navLinks.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Menü schließen');
  };

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.contains('is-open');
      isOpen ? closeMenu() : openMenu();
    });
  }

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // Logo placeholders: swap a missing logo file for a text chip instead of a broken-image icon.
  document.querySelectorAll('.logo-row img').forEach((img) => {
    img.addEventListener('error', () => {
      const chip = document.createElement('span');
      chip.className = 'logo-fallback';
      chip.textContent = img.alt;
      img.replaceWith(chip);
    }, { once: true });
  });

  // Scroll reveal — opacity/transform only, respects prefers-reduced-motion via CSS.
  const revealEls = Array.from(document.querySelectorAll('.reveal'));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Siblings arrive in sequence rather than all at once, so a row of cards
  // reads as one movement. Capped so long groups (12 photos) don't crawl.
  const STAGGER_MS = 70;
  const MAX_DELAY_MS = 420;

  const staggerDelay = (el) => {
    if (reduceMotion || !el.parentElement) return 0;
    const siblings = Array.from(el.parentElement.children).filter((c) =>
      c.classList.contains('reveal')
    );
    if (siblings.length < 2) return 0;
    return Math.min(siblings.indexOf(el) * STAGGER_MS, MAX_DELAY_MS);
  };

  // Drop the compositor hint once the element has landed
  const settle = (el) => {
    el.addEventListener(
      'transitionend',
      (e) => {
        if (e.target === el) el.classList.add('is-settled');
      },
      { once: true }
    );
  };

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          io.unobserve(el);
          el.style.transitionDelay = `${staggerDelay(el)}ms`;
          settle(el);
          el.classList.add('is-visible');
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible', 'is-settled'));
  }
})();
