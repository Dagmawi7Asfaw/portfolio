/**
 * Portfolio interactions and theming
 *
 * Responsibilities:
 * - Theme: choose initial theme (system fallback), persist user choice, toggle on demand
 * - Header nav: open/close mobile menu, close on outside click or link click
 * - Project filters: filter cards by data-cat using button group
 * - Counters: animate numbers once when they enter viewport
 * - Reveal-on-scroll: add class when elements intersect to trigger CSS animation
 * - Back-to-top: smooth scroll to top for the footer arrow
 * - Contact form: basic client-side validation and open Gmail compose with prefilled body
 */
(function () {
  const root = document.documentElement;

  /**
   * Detect whether the OS prefers a dark color scheme.
   * Used only when no explicit theme has been saved by the user.
   */
  function getSystemPrefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  /**
   * Apply the given theme by toggling the `.light` class on the root element
   * and persisting the preference in localStorage.
   * theme: 'light' | 'dark'
   */
  function applyTheme(theme) {
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }

  /**
   * Initialize theme on page load by prioritizing saved preference,
   * then falling back to the system color scheme.
   */
  function initTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') {
      applyTheme(saved);
    } else {
      applyTheme(getSystemPrefersDark() ? 'dark' : 'light');
    }
  }

  /**
   * Toggle between light and dark themes.
   */
  function toggleTheme() {
    const isLight = root.classList.contains('light');
    applyTheme(isLight ? 'dark' : 'light');
  }

  /**
   * Wire up the theme toggle button in the header.
   */
  function initThemeToggle() {
    const btn = document.querySelector('.theme-toggle');
    if (!btn) return;
    btn.addEventListener('click', toggleTheme);
  }

  /**
   * Set the current year in the footer once at load.
   */
  function initYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  }

  /**
   * Mobile navigation: open/close via the hamburger button, close when
   * clicking outside the nav or choosing a link in the menu.
   */
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

  /**
   * Project filters: clicking a filter button activates it and toggles
   * visibility of cards by matching `data-filter` against card `data-cat`.
   */
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

  /**
   * Animate a number from 0 to the target value using an ease-out curve.
   * Triggers are handled by `initCounters()`.
   */
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

  /**
   * Observe counter elements and animate each once when at least 50%
   * of the element becomes visible in the viewport.
   */
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

  /**
   * Reveal-on-scroll: mark elements as in-view when they intersect,
   * leaving the animation to CSS.
   */
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

  /**
   * Back-to-top behavior: smooth scroll to the top when clicking the
   * footer arrow, for consistent UX across browsers.
   */
  function initToTop() {
    const toTop = document.querySelector('.to-top');
    if (!toTop) return;
    toTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /**
   * Contact form: minimal client-side validation and then open Gmail
   * compose in a new tab with a prefilled subject and body. This keeps
   * the site static and avoids handling email on the server.
   */
  function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
      }

      // Create Gmail compose URL instead of mailto
      const subject = `Portfolio Contact from ${name}`;
      const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=dagmawyasfaw@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      // Open Gmail in new tab
      window.open(gmailUrl, '_blank');

      // Reset form
      form.reset();

      // Simple user feedback; safe to remove if undesired
      alert('Opening your email client...');
    });
  }

  /**
   * Initialize all modules after DOM is interactive.
   */
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initThemeToggle();
    initYear();
    initNav();
    initFilters();
    initCounters();
    initReveal();
    initToTop();
    initContactForm();
  });
})(); 