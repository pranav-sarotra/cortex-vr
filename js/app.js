/* ==========================================================================
   CORTEX VR — Application Logic
   By Pranav Sarotra | HCI Midterm (ITS69004)
   ========================================================================== */

// ==========================================
// 1. SPLASH SCREEN
// ==========================================

function dismissSplash() {
  const splash = document.getElementById('splash-screen');
  const app = document.getElementById('app');
  splash.classList.add('splash--hidden');
  app.style.opacity = '1';
  // Start background animations after splash
  setTimeout(() => {
    initParticles();
    initRevealObserver();
    initBioSyncSimulation();
    initSynVisualizerBars();
  }, 400);
}

// Auto-dismiss after 6 seconds if user hasn't clicked
setTimeout(() => {
  const splash = document.getElementById('splash-screen');
  if (!splash.classList.contains('splash--hidden')) {
    // Don't auto-dismiss, let user click
  }
}, 6000);

// ==========================================
// 2. SPA NAVIGATION
// ==========================================

let currentScreen = 'home';

function navigateTo(screenId) {
  // Don't navigate if already on this screen
  if (screenId === currentScreen) return;

  // Hide all screens
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('screen--active');
  });

  // Show target screen
  const target = document.getElementById(`screen-${screenId}`);
  if (target) {
    target.classList.add('screen--active');
    currentScreen = screenId;

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update nav active state
    document.querySelectorAll('.nav__link').forEach(link => {
      link.classList.remove('nav__link--active');
      if (link.dataset.screen === screenId) {
        link.classList.add('nav__link--active');
      }
    });

    // Re-trigger reveal animations for new screen
    setTimeout(() => {
      target.querySelectorAll('.reveal').forEach(el => {
        el.classList.remove('reveal--visible');
        void el.offsetWidth; // Force reflow
      });
      initRevealObserver();
    }, 100);

    // Close mobile nav if open
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.remove('nav__links--open');

    // Start screen-specific animations
    if (screenId === 'biosync') {
      startBioSyncAnimation();
    }
  }
}

function toggleMobileNav() {
  const navLinks = document.getElementById('nav-links');
  navLinks.classList.toggle('nav__links--open');
}

// ==========================================
// 3. SCROLL-BASED NAV BACKGROUND
// ==========================================

window.addEventListener('scroll', () => {
  const nav = document.getElementById('main-nav');
  if (window.scrollY > 50) {
    nav.classList.add('nav--scrolled');
  } else {
    nav.classList.remove('nav--scrolled');
  }
});

// ==========================================
// 4. PARTICLE CANVAS ANIMATION
// ==========================================

function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouse = { x: null, y: null };
  let animationId;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  // Track mouse for proximity effects
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.color = this.getRandomColor();
    }

    getRandomColor() {
      const colors = [
        '123, 47, 255',   // purple
        '0, 245, 212',    // mint
        '255, 107, 107',  // coral
        '77, 168, 255',   // blue
        '255, 255, 255',  // white
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Mouse proximity effect
      if (mouse.x !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          this.x -= (dx / dist) * force * 0.5;
          this.y -= (dy / dist) * force * 0.5;
          this.opacity = Math.min(1, this.opacity + force * 0.3);
        }
      }

      // Wrap around edges
      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
      ctx.fill();
    }
  }

  // Create particles (fewer on mobile for performance)
  const count = window.innerWidth < 768 ? 40 : 80;
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          const opacity = (1 - dist / 150) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(123, 47, 255, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    drawConnections();
    animationId = requestAnimationFrame(animate);
  }

  animate();
}

// ==========================================
// 5. SPLASH PARTICLES (simpler, for splash screen)
// ==========================================

(function initSplashParticles() {
  const canvas = document.getElementById('splash-particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const particles = [];
  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      speedY: -(Math.random() * 0.5 + 0.2),
      speedX: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.6 + 0.1,
    });
  }

  function animate() {
    const splash = document.getElementById('splash-screen');
    if (splash && splash.classList.contains('splash--hidden')) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX;
      if (p.y < 0) { p.y = canvas.height; p.x = Math.random() * canvas.width; }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(123, 47, 255, ${p.opacity})`;
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  animate();
})();

// ==========================================
// 6. SCROLL-TRIGGERED REVEAL ANIMATIONS
// ==========================================

function initRevealObserver() {
  const reveals = document.querySelectorAll('.reveal:not(.reveal--visible)');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all
    reveals.forEach(el => el.classList.add('reveal--visible'));
  }
}

// ==========================================
// 7. 3D TILT EFFECT ON CARDS
// ==========================================

document.addEventListener('mousemove', (e) => {
  const cards = document.querySelectorAll('.feature-card, .perspective-card, .glass-card');
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Only apply if mouse is near the card
    if (x >= -50 && x <= rect.width + 50 && y >= -50 && y <= rect.height + 50) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    } else {
      card.style.transform = '';
    }
  });
});

// Reset tilt on mouse leave
document.addEventListener('mouseleave', () => {
  document.querySelectorAll('.feature-card, .perspective-card, .glass-card').forEach(card => {
    card.style.transform = '';
  });
});

// ==========================================
// 8. BIOSYNC LIVE SIMULATION
// ==========================================

let bioSyncInterval = null;

function initBioSyncSimulation() {
  // Subtle fluctuation of biometric values when on BioSync screen
}

function startBioSyncAnimation() {
  if (bioSyncInterval) clearInterval(bioSyncInterval);

  bioSyncInterval = setInterval(() => {
    if (currentScreen !== 'biosync') {
      clearInterval(bioSyncInterval);
      return;
    }

    // Fluctuate heart rate
    const hr = 68 + Math.floor(Math.random() * 12);
    const hrEl = document.getElementById('heart-rate');
    if (hrEl) hrEl.innerHTML = `${hr} <span style="font-size: var(--text-lg); opacity: 0.6;">BPM</span>`;
    const hrBar = document.getElementById('heart-bar');
    if (hrBar) hrBar.style.width = `${(hr / 120) * 100}%`;

    // Fluctuate stress
    const stress = 22 + Math.floor(Math.random() * 15);
    const stressEl = document.getElementById('stress-level');
    if (stressEl) stressEl.innerHTML = `${stress} <span style="font-size: var(--text-lg); opacity: 0.6;">/ 100</span>`;
    const stressBar = document.getElementById('stress-bar');
    if (stressBar) stressBar.style.width = `${stress}%`;

    // Fluctuate breathing
    const br = 14 + Math.floor(Math.random() * 6);
    const brEl = document.getElementById('breath-rate');
    if (brEl) brEl.innerHTML = `${br} <span style="font-size: var(--text-lg); opacity: 0.6;">BrPM</span>`;
    const brBar = document.getElementById('breath-bar');
    if (brBar) brBar.style.width = `${(br / 30) * 100}%`;

    // Fluctuate focus
    const focus = 78 + Math.floor(Math.random() * 15);
    const focusEl = document.getElementById('focus-index');
    if (focusEl) focusEl.innerHTML = `${focus} <span style="font-size: var(--text-lg); opacity: 0.6;">%</span>`;
    const focusBar = document.getElementById('focus-bar');
    if (focusBar) focusBar.style.width = `${focus}%`;

  }, 2000);
}

// ==========================================
// 9. SYNAESTHESIA VISUALIZER BARS
// ==========================================

function initSynVisualizerBars() {
  const container = document.getElementById('syn-visualizer');
  if (!container) return;

  // Generate 40 bars with random delays
  let barsHTML = '';
  for (let i = 0; i < 40; i++) {
    const height = 20 + Math.random() * 80;
    const delay = Math.random() * 2;
    const hue = 260 + (i / 40) * 100; // purple → mint gradient
    barsHTML += `<div class="syn-bar" style="
      height: ${height}%;
      animation-delay: ${delay}s;
      animation-duration: ${1 + Math.random() * 1.5}s;
      background: linear-gradient(to top, hsla(${hue}, 80%, 60%, 0.8), hsla(${hue}, 80%, 60%, 0.2));
    "></div>`;
  }
  container.innerHTML = barsHTML;
}

// ==========================================
// 10. CHRONO TIMELINE ERA SELECTOR
// ==========================================

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('chrono-era')) {
    document.querySelectorAll('.chrono-era').forEach(era => era.classList.remove('chrono-era--active'));
    e.target.classList.add('chrono-era--active');
  }
});

// ==========================================
// 11. MNEMO ROOM SELECTOR
// ==========================================

document.addEventListener('click', (e) => {
  const room = e.target.closest('.mnemo-room');
  if (room) {
    document.querySelectorAll('.mnemo-room').forEach(r => r.classList.remove('mnemo-room--active'));
    room.classList.add('mnemo-room--active');
  }
});

// ==========================================
// 12. SYN MODE SELECTOR
// ==========================================

document.addEventListener('click', (e) => {
  const mode = e.target.closest('.syn-mode');
  if (mode) {
    document.querySelectorAll('.syn-mode').forEach(m => m.classList.remove('syn-mode--active'));
    mode.classList.add('syn-mode--active');
  }
});

// ==========================================
// 13. SLIDER VALUE DISPLAY UPDATE
// ==========================================

document.addEventListener('input', (e) => {
  if (e.target.classList.contains('syn-slider__input')) {
    const slider = e.target.closest('.syn-slider');
    const label = slider.querySelector('.syn-slider__label span:last-child');
    if (label) label.textContent = e.target.value + '%';
  }
});

// ==========================================
// 14. HERO FLOATING ANIMATION
// ==========================================

(function initHeroFloat() {
  const hero = document.getElementById('hero-float');
  if (!hero) return;

  let t = 0;
  function animate() {
    t += 0.015;
    const y = Math.sin(t) * 12;
    hero.style.transform = `translateY(calc(-50% + ${y}px))`;
    requestAnimationFrame(animate);
  }
  animate();
})();

// ==========================================
// 15. KEYBOARD NAVIGATION (Accessibility)
// ==========================================

document.addEventListener('keydown', (e) => {
  // Escape to go home
  if (e.key === 'Escape') {
    navigateTo('home');
  }

  // Enter to dismiss splash
  if (e.key === 'Enter') {
    const splash = document.getElementById('splash-screen');
    if (splash && !splash.classList.contains('splash--hidden')) {
      dismissSplash();
    }
  }
});

// ==========================================
// 16. INIT ON DOM READY
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  // Pre-trigger any reveals visible on initial load (for home screen)
  // Wait for splash to be dismissed first
});

console.log('%c CORTEX VR ', 'background: linear-gradient(135deg, #7B2FFF, #00F5D4); color: #06090F; font-size: 16px; font-weight: bold; padding: 8px 16px; border-radius: 8px;');
console.log('%c Designed by Pranav Sarotra · ITS69004 HCI ', 'color: #8B949E; font-size: 11px;');
