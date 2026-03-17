/* ============================================
   MAIN.JS — MaGaShiu Nails
   Interactividad del sitio
   ============================================ */

'use strict';

// ——— NAVBAR: scroll + toggle mobile ———
const navbar   = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu  = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.classList.toggle('active', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Cerrar menú al hacer click en un link
navMenu.querySelectorAll('.navbar__link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', false);
    document.body.style.overflow = '';
  });
});

// Cerrar menú al hacer click fuera
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target) && navMenu.classList.contains('open')) {
    navMenu.classList.remove('open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', false);
    document.body.style.overflow = '';
  }
});


// ——— SCROLL ANIMATIONS (IntersectionObserver) ———
const animatedEls = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

animatedEls.forEach(el => observer.observe(el));


// ——— FILTRO DE SERVICIOS ———
const categoryTabs = document.querySelectorAll('.category-tab');
const serviceCards = document.querySelectorAll('.service-card');

categoryTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Actualizar tab activo
    categoryTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const filter = tab.dataset.filter;

    serviceCards.forEach(card => {
      const category = card.dataset.category;
      const match = filter === 'all' || category === filter;

      if (match) {
        card.style.display = '';
        card.style.animation = 'none';
        requestAnimationFrame(() => {
          card.style.animation = '';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        });
      } else {
        card.style.display = 'none';
      }
    });
  });
});


// ——— SMOOTH SCROLL PARA ANCLAS ———
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();

    const navHeight = navbar.offsetHeight;
    const targetY = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 8;

    window.scrollTo({ top: targetY, behavior: 'smooth' });
  });
});


// ——— ACTIVE LINK EN NAVBAR AL HACER SCROLL ———
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar__link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => sectionObserver.observe(section));
