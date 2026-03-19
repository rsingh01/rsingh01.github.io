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

// ---- Scroll fade-in ----
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' };

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Apply fade-in to key elements
document.querySelectorAll(
  '.timeline-item, .skill-category, .project-card, .about-text, .about-details, .contact-card'
).forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
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

// ---- Render resume PDF ----
(async () => {
  if (typeof pdfjsLib === 'undefined') return;
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

  try {
    const pdf = await pdfjsLib.getDocument('https://assets.rajsec.dev/img/rsingh_resume_2026_final.pdf').promise;
    const container = document.getElementById('resume-pages');
    const scale = window.devicePixelRatio || 2;

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: scale });
      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const wrapper = document.createElement('div');
      wrapper.className = 'resume-page';
      wrapper.appendChild(canvas);
      container.appendChild(wrapper);

      await page.render({ canvasContext: canvas.getContext('2d'), viewport: viewport }).promise;
    }
  } catch (e) {
    console.error('Resume PDF failed to load:', e);
  }
})();

// ---- Navbar background on scroll ----
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(15, 11, 8, 0.95)';
  } else {
    navbar.style.background = 'rgba(15, 11, 8, 0.85)';
  }
});
