/* ============================================
   GYÓGYMASSZÁZS, FRIDERIKUSZ ISTVÁN
   JavaScript: témaváltás, animációk, menü
   ============================================ */

(function () {
  'use strict';

  // ---- DOM elemek ----
  const html = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.navbar__link');

  // ---- TÉMAVÁLTÁS ----
  function getStoredTheme() {
    return localStorage.getItem('theme');
  }

  function getPreferredTheme() {
    const stored = getStoredTheme();
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  // Betöltéskor beállítjuk a témát
  setTheme(getPreferredTheme());

  themeToggle.addEventListener('click', function () {
    const current = html.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });

  // OS-szintű témaváltás figyelése
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!getStoredTheme()) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  // ---- MOBIL MENÜ ----
  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('open');
  });

  // Menü bezárása navigációs link kattintásra
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('active');
      navMenu.classList.remove('open');
    });
  });

  // ---- SCROLL ANIMÁCIÓK (Intersection Observer) ----
  function initScrollAnimations() {
    const animElements = document.querySelectorAll('.anim-fade-up');

    if (!('IntersectionObserver' in window)) {
      // Fallback: mindent láthatóvá teszünk
      animElements.forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    animElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  initScrollAnimations();

  // ---- NAVBAR SCROLL EFFEKT ----
  let lastScroll = 0;
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', function () {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      navbar.style.backdropFilter = 'blur(12px)';
      navbar.style.webkitBackdropFilter = 'blur(12px)';
    } else {
      navbar.style.backdropFilter = 'none';
      navbar.style.webkitBackdropFilter = 'none';
    }

    lastScroll = currentScroll;
  }, { passive: true });

})();
