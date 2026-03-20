// ---- Mobile nav toggle ----
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('active');
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
  });
});

// ---- Scroll reveal ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

// Section titles — reveal + accent line grow
document.querySelectorAll('.section-title').forEach(el => {
  el.classList.add('reveal', 'reveal-up');
  revealObserver.observe(el);
});

// About — text slides from left, details from right
document.querySelectorAll('.about-text').forEach(el => {
  el.classList.add('reveal', 'reveal-left');
  revealObserver.observe(el);
});
document.querySelectorAll('.about-details').forEach(el => {
  el.classList.add('reveal', 'reveal-right');
  revealObserver.observe(el);
});

// Timeline — staggered slide-up
document.querySelectorAll('.timeline-item').forEach((el, i) => {
  el.classList.add('reveal', 'reveal-up', `stagger-${Math.min(i + 1, 6)}`);
  revealObserver.observe(el);
});

// Skills — staggered scale
document.querySelectorAll('.skill-category').forEach((el, i) => {
  el.classList.add('reveal', 'reveal-scale', `stagger-${Math.min(i + 1, 6)}`);
  revealObserver.observe(el);
});

// Projects — alternate left/right
document.querySelectorAll('.project-card').forEach((el, i) => {
  el.classList.add('reveal', i % 2 === 0 ? 'reveal-left' : 'reveal-right', `stagger-${Math.min(i + 1, 6)}`);
  revealObserver.observe(el);
});

// Resume pages
document.querySelectorAll('.resume-page').forEach((el, i) => {
  el.classList.add('reveal', i === 0 ? 'reveal-left' : 'reveal-right');
  revealObserver.observe(el);
});

// Contact cards — staggered rise
document.querySelectorAll('.contact-card').forEach((el, i) => {
  el.classList.add('reveal', 'reveal-up', `stagger-${Math.min(i + 1, 6)}`);
  revealObserver.observe(el);
});

// ---- Active nav link on scroll ----
const sections = document.querySelectorAll('section');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });

  navAnchors.forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === '#' + current) {
      a.style.color = 'var(--accent)';
    }
  });
});

// ---- Ambient glow on scroll ----
const glowObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    entry.target.classList.toggle('glow-active', entry.isIntersecting);
  });
}, { threshold: 0.1 });

document.querySelectorAll('#about, #experience, #skills, #projects, #resume, #contact').forEach(el => {
  glowObserver.observe(el);
});

// ---- Divider fade-in ----
document.querySelectorAll('.section-divider').forEach(el => {
  el.classList.add('reveal', 'reveal-scale');
  revealObserver.observe(el);
});

// ---- Navbar background on scroll ----
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(15, 11, 8, 0.95)';
  } else {
    navbar.style.background = 'rgba(15, 11, 8, 0.85)';
  }
});
