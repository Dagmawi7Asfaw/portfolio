(function () {
  const root = document.documentElement;

  function getSystemPrefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function applyTheme(theme) {
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }

  function initTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') {
      applyTheme(saved);
    } else {
      applyTheme(getSystemPrefersDark() ? 'dark' : 'light');
    }
  }

  function toggleTheme() {
    const isLight = root.classList.contains('light');
    applyTheme(isLight ? 'dark' : 'light');
  }

  function initThemeToggle() {
    const btn = document.querySelector('.theme-toggle');
    if (!btn) return;
    btn.addEventListener('click', toggleTheme);
  }

  function initYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  }

  function initNav() {
    const nav = document.querySelector('.nav');
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.getElementById('nav-menu');
    if (!nav || !toggle || !menu) return;

    function close() {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }

    function open() {
      nav.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
    }

    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      expanded ? close() : open();
    });

    menu.addEventListener('click', (e) => {
      const target = e.target;
      if (target && target.tagName === 'A') close();
    });

    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target)) close();
    });
  }

  function initFilters() {
    const filters = document.querySelector('.filters');
    const cards = Array.from(document.querySelectorAll('.projects-grid .card'));
    if (!filters || cards.length === 0) return;

    filters.addEventListener('click', (e) => {
      const btn = e.target.closest('button.filter');
      if (!btn) return;
      const filter = btn.getAttribute('data-filter');
      filters.querySelectorAll('button.filter').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      cards.forEach((card) => {
        const cat = card.getAttribute('data-cat');
        const match = filter === 'all' || filter === cat;
        card.style.display = match ? '' : 'none';
      });
    });
  }

  function animateCount(el, to) {
    const durationMs = 1200;
    const start = performance.now();
    const from = 0;

    function step(now) {
      const progress = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(from + (to - from) * eased);
      el.textContent = String(value);
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  function initCounters() {
    const nums = Array.from(document.querySelectorAll('.num[data-count]'));
    if (nums.length === 0) return;

    const obs = new IntersectionObserver((entries, observer) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const el = entry.target;
          const to = parseInt(el.getAttribute('data-count'), 10) || 0;
          animateCount(el, to);
          observer.unobserve(el);
        }
      }
    }, { threshold: 0.5 });

    nums.forEach((n) => obs.observe(n));
  }

  function initReveal() {
    const els = Array.from(document.querySelectorAll('.card, .stat, .timeline > li, .contact-form'));
    els.forEach((el) => el.classList.add('reveal'));

    const obs = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) entry.target.classList.add('in-view');
      }
    }, { threshold: 0.15 });

    els.forEach((el) => obs.observe(el));
  }

  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initThemeToggle();
    initYear();
    initNav();
    initFilters();
    initCounters();
    initReveal();
  });
})(); 