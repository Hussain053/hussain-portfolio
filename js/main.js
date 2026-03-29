/* ================================================================
   main.js — Portfolio Interactions
   Hussain Patanwala Portfolio
   ----------------------------------------------------------------
   Modules:
   1. Loader
   2. Custom Cursor
   3. Navigation (scroll + hamburger + theme toggle)
   4. Hero Canvas (particle field)
   5. Scroll Reveal
   6. Project Filter
   7. Contact Form
================================================================ */

'use strict';

/* ================================================================
   1. LOADER
================================================================ */
(function initLoader() {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const loader = document.getElementById('loader');
      if (loader) loader.classList.add('hidden');
    }, 2000);
  });
})();

/* ================================================================
   2. CUSTOM CURSOR
================================================================ */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  if (!cursor) return;

  // Disable on touch devices
  if (window.matchMedia('(pointer: coarse)').matches) {
    cursor.style.display = 'none';
    document.body.style.cursor = 'auto';
    return;
  }

  const dot  = cursor.querySelector('.dot');
  const ring = cursor.querySelector('.ring');

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

  // Instant dot follow
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  // Smooth ring lerp
  (function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateRing);
  })();

  // Hover state for interactive elements
  const hoverTargets = 'a, button, .project-card, .ach-card, .stat-card, .timeline-card, .filter-btn, .lang-pill';
  document.querySelectorAll(hoverTargets).forEach((el) => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hover-state'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hover-state'));
  });
})();

/* ================================================================
   3. NAVIGATION
================================================================ */
(function initNav() {
  const nav = document.getElementById('nav');

  /* Scroll shrink */
  window.addEventListener('scroll', () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  /* Theme toggle */
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const html = document.documentElement;
      html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
      // Persist preference
      try {
        localStorage.setItem('hp-theme', html.dataset.theme);
      } catch (_) {}
    });
  }

  // Restore saved theme
  try {
    const saved = localStorage.getItem('hp-theme');
    if (saved) document.documentElement.dataset.theme = saved;
  } catch (_) {}
})();

/* Hamburger menu — exposed globally for inline onclick in HTML */
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  if (navLinks) navLinks.classList.toggle('open');
}

function closeMenu() {
  const navLinks = document.getElementById('navLinks');
  if (navLinks) navLinks.classList.remove('open');
}

/* ================================================================
   4. HERO CANVAS — PARTICLE FIELD
================================================================ */
(function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  // Skip heavy canvas on low-end / reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ctx = canvas.getContext('2d');
  let W, H, pts = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function buildParticles() {
    pts = [];
    const count = Math.min(90, Math.floor(W / 14));
    for (let i = 0; i < count; i++) {
      pts.push({
        x:   Math.random() * W,
        y:   Math.random() * H,
        vx:  (Math.random() - 0.5) * 0.4,
        vy:  (Math.random() - 0.5) * 0.4,
        r:   Math.random() * 1.5 + 0.5,
        hue: Math.random() < 0.5 ? 180 : 270,  // cyan : purple
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Draw dots
    pts.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, 0.7)`;
      ctx.fill();
    });

    // Draw connecting lines
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x;
        const dy = pts[i].y - pts[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 130) {
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(0, 229, 255, ${0.18 * (1 - d / 130)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  resize();
  buildParticles();
  draw();

  window.addEventListener('resize', () => {
    resize();
    buildParticles();
  }, { passive: true });
})();

/* ================================================================
   5. SCROLL REVEAL
================================================================ */
(function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  // Add stagger delays to grouped items
  const staggerGroups = [
    '.achievements-grid .ach-card',
    '.projects-grid .project-card',
    '.timeline-item',
    '.skill-group',
    '.stats-row .stat-card',
  ];

  staggerGroups.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.08}s`;
    });
  });

  // IntersectionObserver for reveal + skill bars
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');

      // Animate skill bars inside this revealed element
      entry.target.querySelectorAll('.skill-bar').forEach((bar) => {
        bar.style.width = bar.dataset.w + '%';
      });
    });
  }, { threshold: 0.15 });

  revealEls.forEach((el) => observer.observe(el));
})();

/* ================================================================
   6. PROJECT FILTER
================================================================ */
(function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  if (!filterBtns.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
      // Update active state
      filterBtns.forEach((b) => b.classList.remove('active'));
      this.classList.add('active');

      const filter = this.dataset.filter;

      projectCards.forEach((card) => {
        const match = filter === 'all' || card.dataset.cat === filter;
        card.classList.toggle('hide', !match);
      });
    });
  });
})();

/* ================================================================
   7. CONTACT FORM
================================================================ */
async function handleForm() {
  const name  = document.getElementById('fname').value.trim();
  const email = document.getElementById('femail').value.trim();
  const msg   = document.getElementById('fmsg').value.trim();
  const msgEl = document.getElementById('formMsg');

  // Reset state
  msgEl.className = 'form-msg';

  // Validation
  if (!name || !email || !msg) {
    msgEl.textContent = '⚠ Please fill out all fields.';
    msgEl.className = 'form-msg error';
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    msgEl.textContent = '⚠ Please enter a valid email address.';
    msgEl.className = 'form-msg error';
    return;
  }

  try {
    const res = await fetch("https://formspree.io/f/mykbepzw", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        message: msg
      })
    });

    if (res.ok) {
      msgEl.textContent = `✓ Thanks ${name}! Your message has been sent successfully.`;
      msgEl.className = 'form-msg success';

      // Clear form
      document.getElementById('fname').value  = '';
      document.getElementById('femail').value = '';
      document.getElementById('fmsg').value   = '';
    } else {
      throw new Error("Failed to send");
    }

  } catch (error) {
    msgEl.textContent = '❌ Something went wrong. Please try again later.';
    msgEl.className = 'form-msg error';
  }
}