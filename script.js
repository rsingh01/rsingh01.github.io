// ---- Mobile nav toggle ----
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('active');
});

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

document.querySelectorAll('.section-title').forEach(el => {
  el.classList.add('reveal', 'reveal-up');
  revealObserver.observe(el);
});

document.querySelectorAll('.about-text').forEach(el => {
  el.classList.add('reveal', 'reveal-left');
  revealObserver.observe(el);
});
document.querySelectorAll('.about-details').forEach(el => {
  el.classList.add('reveal', 'reveal-right');
  revealObserver.observe(el);
});

document.querySelectorAll('.timeline-item').forEach((el, i) => {
  el.classList.add('reveal', 'reveal-up', `stagger-${Math.min(i + 1, 6)}`);
  revealObserver.observe(el);
});

document.querySelectorAll('.skill-category').forEach((el, i) => {
  el.classList.add('reveal', 'reveal-scale', `stagger-${Math.min(i + 1, 6)}`);
  revealObserver.observe(el);
});

document.querySelectorAll('.project-card').forEach((el, i) => {
  el.classList.add('reveal', i % 2 === 0 ? 'reveal-left' : 'reveal-right', `stagger-${Math.min(i + 1, 6)}`);
  revealObserver.observe(el);
});

document.querySelectorAll('.resume-page').forEach((el, i) => {
  el.classList.add('reveal', i === 0 ? 'reveal-left' : 'reveal-right');
  revealObserver.observe(el);
});

document.querySelectorAll('.contact-card').forEach((el, i) => {
  el.classList.add('reveal', 'reveal-up', `stagger-${Math.min(i + 1, 6)}`);
  revealObserver.observe(el);
});

document.querySelectorAll('.section-divider').forEach(el => {
  el.classList.add('reveal', 'reveal-scale');
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

// ---- Navbar background on scroll ----
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(15, 11, 8, 0.95)';
  } else {
    navbar.style.background = 'rgba(15, 11, 8, 0.85)';
  }
});

// ---- Cursor glow ----
const cursorGlow = document.getElementById('cursor-glow');
if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  });
}

// ---- 3D Card tilt ----
document.querySelectorAll('.project-card, .timeline-content, .skill-category').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ---- Timeline draw on scroll ----
const timeline = document.querySelector('.timeline');
if (timeline) {
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        timeline.classList.add('draw-active');
        timelineObserver.unobserve(timeline);
      }
    });
  }, { threshold: 0.15 });
  timelineObserver.observe(timeline);
}

// ---- Typewriter hero greeting ----
const typedEl = document.querySelector('.hero-typed');
const heroName = document.querySelector('.hero-name');
if (typedEl && heroName) {
  heroName.style.opacity = '0';
  heroName.style.transition = 'none';
  const command = 'whoami';
  let i = 0;
  setTimeout(() => {
    const type = () => {
      if (i < command.length) {
        typedEl.textContent += command.charAt(i);
        i++;
        setTimeout(type, 80 + Math.random() * 50);
      } else {
        typedEl.classList.add('done');
        setTimeout(() => {
          heroName.style.transition = 'opacity 0.6s ease';
          heroName.style.opacity = '1';
        }, 300);
      }
    };
    type();
  }, 500);
}

// ---- Hero particles (embers) ----
const particleCanvas = document.getElementById('hero-particles');
if (particleCanvas) {
  const ctx = particleCanvas.getContext('2d');
  let particles = [];
  const PARTICLE_COUNT = 40;

  function resizeCanvas() {
    const hero = document.getElementById('hero');
    particleCanvas.width = hero.offsetWidth;
    particleCanvas.height = hero.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  function createParticle() {
    return {
      x: Math.random() * particleCanvas.width,
      y: Math.random() * particleCanvas.height,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -Math.random() * 0.4 - 0.1,
      opacity: Math.random() * 0.4 + 0.1,
      fade: Math.random() * 0.003 + 0.001
    };
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(createParticle());
  }

  function animateParticles() {
    ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    particles.forEach((p, i) => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.opacity -= p.fade;
      if (p.opacity <= 0 || p.y < -10) {
        particles[i] = createParticle();
        particles[i].y = particleCanvas.height + 10;
        particles[i].opacity = 0.05;
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(196, 154, 108, ${p.opacity})`;
      ctx.fill();
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();
}

// ---- Konami code easter egg ----
(() => {
  const code = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
  let pos = 0;
  const overlay = document.getElementById('konami-overlay');
  const typedEl = overlay.querySelector('.konami-typed');
  const secret = 'cat /etc/shadow';

  document.addEventListener('keydown', (e) => {
    if (overlay.classList.contains('active')) {
      overlay.classList.remove('active');
      pos = 0;
      typedEl.textContent = '';
      return;
    }

    if (e.keyCode === code[pos]) {
      pos++;
      if (pos === code.length) {
        overlay.classList.add('active');
        let ti = 0;
        typedEl.textContent = '';
        const typeCmd = () => {
          if (ti < secret.length) {
            typedEl.textContent += secret.charAt(ti);
            ti++;
            setTimeout(typeCmd, 60 + Math.random() * 40);
          }
        };
        setTimeout(typeCmd, 300);
      }
    } else {
      pos = 0;
    }
  });
})();
