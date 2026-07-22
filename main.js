
'use strict';

const TOTAL_FRAMES = 240;
const FRAMES_DIR = './flow/';
const FRAME_PREFIX = 'ezgif-frame-';
const FRAME_EXT = '.jpg';

const STORY_BEATS = {
  engineering: { start: 0.08, peak: 0.18, end: 0.36 },
  nc: { start: 0.35, peak: 0.46, end: 0.64 },
  sound: { start: 0.63, peak: 0.73, end: 0.88 },
};

const canvas = document.getElementById('product-canvas');
const ctx = canvas.getContext('2d', { alpha: false, willReadFrequently: false });
const wrapper = document.getElementById('sequence-wrapper');
const navbar = document.getElementById('navbar');
const heroContent = document.getElementById('hero-content');
const beatEng = document.getElementById('beat-engineering');
const beatNC = document.getElementById('beat-nc');
const beatSound = document.getElementById('beat-sound');
const canvasAmbient = document.getElementById('canvas-ambient');

const images = new Array(TOTAL_FRAMES).fill(null);
let loadedCount = 0;
let isReady = false;

let targetProgress = 0;   // raw scroll 0-1
let smoothProgress = 0;   // lerp'd 0-1
let smoothFrame = 0;   // lerp'd float frame index
let lastDrawnFrame = -1;  // last integer frame rendered
const LERP_FACTOR = 0.14; // higher = more responsive catch-up

const overlay = createLoadingOverlay();
document.body.insertBefore(overlay, document.body.firstChild);

function createLoadingOverlay() {
  const el = document.createElement('div');
  el.id = 'loading-overlay';
  el.innerHTML = `
    <div class="loading-logo">Sony</div>
    <div class="loading-bar-track">
      <div class="loading-bar-fill" id="loading-bar-fill"></div>
    </div>
    <div class="loading-text" id="loading-text">Preparing experience…</div>
  `;
  return el;
}

const loadingBar = () => document.getElementById('loading-bar-fill');
const loadingText = () => document.getElementById('loading-text');

function framePath(n) {
  return `${FRAMES_DIR}${FRAME_PREFIX}${String(n).padStart(3, '0')}${FRAME_EXT}`;
}

function preloadImages() {
  const priorityOrder = [1, TOTAL_FRAMES];
  for (let i = 2; i < TOTAL_FRAMES; i++) priorityOrder.push(i);

  priorityOrder.forEach((n, idx) => {
    const img = new Image();
    img.decoding = 'async';

    img.onload = () => {
      images[n - 1] = img;
      loadedCount++;

      const bar = loadingBar();
      if (bar) bar.style.width = ((loadedCount / TOTAL_FRAMES) * 100) + '%';

      if (loadedCount === 1) {
        resizeCanvas();
        drawFrame(0);
      }

      if (!isReady && loadedCount >= Math.ceil(TOTAL_FRAMES * 0.08)) {
        isReady = true;
        hideOverlay();
      }

      const txt = loadingText();
      if (txt && loadedCount === TOTAL_FRAMES) txt.textContent = 'Ready.';
    };

    img.onerror = () => {
      loadedCount++;
    };

    setTimeout(() => { img.src = framePath(n); }, idx * 6);
  });
}

function hideOverlay() {
  const ov = document.getElementById('loading-overlay');
  if (!ov) return;
  const txt = loadingText();
  if (txt) txt.textContent = 'Experience WH‑1000XM6';
  setTimeout(() => {
    ov.classList.add('hidden');
    setTimeout(() => { if (ov.parentNode) ov.remove(); }, 700);
  }, 300);
}

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = window.innerWidth;
  const h = window.innerHeight;

  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const f = Math.max(0, lastDrawnFrame);
  if (images[f]) drawFrame(f);
}

function drawFrame(idx) {
  const img = images[idx];
  if (!img) return;

  const cw = canvas.clientWidth || window.innerWidth;
  const ch = canvas.clientHeight || window.innerHeight;
  const iw = img.naturalWidth || img.width;
  const ih = img.naturalHeight || img.height;
  if (!iw || !ih) return;

  // Background fill — perfectly matches image dark background
  ctx.fillStyle = '#050505';
  ctx.fillRect(0, 0, cw, ch);

  // CONTAIN-fit: scale down to fit entirely inside viewport, no cropping
  const scale = Math.min(cw / iw, ch / ih);
  const drawW = iw * scale;
  const drawH = ih * scale;
  const offsetX = (cw - drawW) / 2;
  const offsetY = (ch - drawH) / 2;

  ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
}

// ================================================================
// SCROLL ENGINE
// ================================================================
function getScrollProgress() {
  const rect = wrapper.getBoundingClientRect();
  const wh = window.innerHeight;
  const total = wrapper.offsetHeight - wh;
  const scrolled = -rect.top;
  return Math.max(0, Math.min(1, scrolled / total));
}


function smoothstep(edge0, edge1, x) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function beatOpacity(progress, beat) {
  const { start, peak, end } = beat;
  if (progress < start) return 0;
  if (progress >= start && progress < peak) return smoothstep(start, peak, progress);
  if (progress >= peak && progress < end) return 1 - smoothstep(peak + (end - peak) * 0.6, end, progress);
  return 0;
}

// ---- Scroll listener — only updates target, rendering is decoupled ----
function onScroll() {
  targetProgress = getScrollProgress();

  // Navbar (instant — no visual lag wanted here)
  const scrollY = window.scrollY || window.pageYOffset;
  if (scrollY > 60) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
}

// ---- Main render loop — runs every rAF regardless of scroll ----
function renderLoop() {
  // Lerp smooth progress toward target
  smoothProgress += (targetProgress - smoothProgress) * LERP_FACTOR;

  // Lerp smooth frame index
  const targetFrameF = targetProgress * (TOTAL_FRAMES - 1);
  smoothFrame += (targetFrameF - smoothFrame) * LERP_FACTOR;

  const frameIdx = Math.round(smoothFrame);
  const clampedFrame = Math.max(0, Math.min(TOTAL_FRAMES - 1, frameIdx));

  // Only re-draw if frame index actually changed
  if (clampedFrame !== lastDrawnFrame) {
    drawFrame(clampedFrame);
    lastDrawnFrame = clampedFrame;
  }

  const p = smoothProgress;

  // ---- Hero section fade on scroll
  const heroOpacity = 1 - smoothstep(0, 0.12, p);
  if (heroContent) {
    heroContent.style.opacity = heroOpacity;
    heroContent.style.transform = `translateY(${(1 - heroOpacity) * -30}px)`;
  }

  // ---- Beat overlays
  updateBeat(beatEng, beatOpacity(p, STORY_BEATS.engineering));
  updateBeat(beatNC, beatOpacity(p, STORY_BEATS.nc));
  updateBeat(beatSound, beatOpacity(p, STORY_BEATS.sound));

  // ---- Ambient glow shifts
  if (canvasAmbient) {
    if (p < 0.35) {
      canvasAmbient.style.background = 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(0,80,255,0.04) 0%, transparent 70%)';
    } else if (p < 0.65) {
      canvasAmbient.style.background = 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(0,214,255,0.05) 0%, transparent 70%)';
    } else {
      canvasAmbient.style.background = 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(0,80,255,0.06) 0%, transparent 70%)';
    }
  }

  requestAnimationFrame(renderLoop);
}

function updateBeat(el, opacity) {
  if (!el) return;
  el.style.opacity = opacity;
  if (opacity > 0.01) el.classList.add('visible');
  else el.classList.remove('visible');
}

// ================================================================
// SCROLL-REVEAL for sections below canvas
// ================================================================
function initReveal() {
  const targets = document.querySelectorAll('.spec-card, .cta-inner > *');
  targets.forEach(el => el.classList.add('reveal'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  targets.forEach(el => io.observe(el));
}

// ================================================================
// NAVBAR SMOOTH SCROLL
// ================================================================
function initNavSmooth() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

// ================================================================
// RESIZE HANDLER
// ================================================================
let resizeTimer;
function onResize() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    resizeCanvas();
    renderFrame();
  }, 120);
}

// ================================================================
// CINEMATIC CURSOR GLOW (desktop only)
// ================================================================
function initCursorEffect() {
  if (window.innerWidth <= 768) return;

  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    width: 280px;
    height: 280px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0,80,255,0.06) 0%, transparent 70%);
    pointer-events: none;
    z-index: 9998;
    transform: translate(-50%, -50%);
    transition: opacity 0.4s;
    will-change: left, top;
  `;
  document.body.appendChild(glow);

  let mx = 0, my = 0;
  let glowX = 0, glowY = 0;
  let raf;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
  });

  function animateGlow() {
    glowX += (mx - glowX) * 0.08;
    glowY += (my - glowY) * 0.08;
    glow.style.left = glowX + 'px';
    glow.style.top = glowY + 'px';
    raf = requestAnimationFrame(animateGlow);
  }
  animateGlow();

  document.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { glow.style.opacity = '1'; });
}

// ================================================================
// TEXT GRADIENT ANIMATION (hero title shimmer)
// ================================================================
function initTitleShimmer() {
  const title = document.querySelector('.hero-title');
  if (!title) return;

  let shift = 0;
  function shimmer() {
    shift = (shift + 0.15) % 360;
    // subtle hue shift in the gradient
    requestAnimationFrame(shimmer);
  }
  // Lightweight — just subtle animation on the gradient via CSS
}

// ================================================================
// PARALLAX HERO AMBIENT
// ================================================================
function initParallax() {
  const ambient = document.querySelector('.hero-ambient');
  if (!ambient) return;

  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    ambient.style.transform = `translate(${x}px, ${y}px)`;
  }, { passive: true });
}

// ================================================================
// SPEC CARDS — hover data-line animation
// ================================================================
function initSpecCards() {
  document.querySelectorAll('.spec-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'border-color 0.3s, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s';
    });
  });
}

// ================================================================
// INIT
// ================================================================
function init() {
  resizeCanvas();
  initReveal();
  initNavSmooth();
  initCursorEffect();
  initParallax();
  initSpecCards();

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize, { passive: true });

  preloadImages();

  // Kick off the continuous render loop
  requestAnimationFrame(renderLoop);
}

// Bootstrap when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
