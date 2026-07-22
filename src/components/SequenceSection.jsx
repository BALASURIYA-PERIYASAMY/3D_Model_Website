import { useEffect, useRef } from 'react'

// ---- CONFIG ----
const TOTAL_FRAMES = 240
const FRAMES_DIR   = '/flow/'
const FRAME_PREFIX = 'ezgif-frame-'
const FRAME_EXT    = '.jpg'
const LERP_FACTOR  = 0.14

// Scroll progress → story beat visibility windows (0-1)
const STORY_BEATS = {
  engineering: { start: 0.08, peak: 0.18, end: 0.36 },
  nc:          { start: 0.35, peak: 0.46, end: 0.64 },
  sound:       { start: 0.63, peak: 0.73, end: 0.88 },
}

// ---- Helpers ----
const framePath = (n) =>
  `${FRAMES_DIR}${FRAME_PREFIX}${String(n).padStart(3, '0')}${FRAME_EXT}`

const smoothstep = (e0, e1, x) => {
  const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)))
  return t * t * (3 - 2 * t)
}

const getBeatOpacity = (progress, { start, peak, end }) => {
  if (progress < start) return 0
  if (progress < peak)  return smoothstep(start, peak, progress)
  if (progress < end)   return 1 - smoothstep(peak + (end - peak) * 0.6, end, progress)
  return 0
}

// ============================================================
// Main Component
// ============================================================
export default function SequenceSection({ onLoadingProgress, onReady }) {
  const wrapperRef   = useRef(null)
  const canvasRef    = useRef(null)
  const ambientRef   = useRef(null)

  // Story beat DOM refs — manipulated directly, no React re-renders
  const beatEngRef   = useRef(null)
  const beatNCRef    = useRef(null)
  const beatSoundRef = useRef(null)

  // All animation state in refs — never triggers re-renders
  const state = useRef({
    images:          new Array(TOTAL_FRAMES).fill(null),
    loadedCount:     0,
    isReady:         false,
    targetProgress:  0,
    smoothProgress:  0,
    smoothFrame:     0,
    lastDrawnFrame:  -1,
    rafId:           null,
  })

  // ---- Canvas helpers ----
  const resizeCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w   = window.innerWidth
    const h   = window.innerHeight
    canvas.width  = w * dpr
    canvas.height = h * dpr
    canvas.style.width  = `${w}px`
    canvas.style.height = `${h}px`
    // setTransform resets to identity first — prevents cumulative scale bug
    canvas.getContext('2d').setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  const drawFrame = (idx) => {
    const canvas = canvasRef.current
    const img    = state.current.images[idx]
    if (!canvas || !img) return

    const ctx = canvas.getContext('2d')
    const cw  = canvas.clientWidth  || window.innerWidth
    const ch  = canvas.clientHeight || window.innerHeight
    const iw  = img.naturalWidth    || img.width
    const ih  = img.naturalHeight   || img.height
    if (!iw || !ih) return

    // Fill background (matches image dark bg — seamless float effect)
    ctx.fillStyle = '#050505'
    ctx.fillRect(0, 0, cw, ch)

    // CONTAIN fit — entire frame always visible, no cropping
    const scale   = Math.min(cw / iw, ch / ih)
    const drawW   = iw * scale
    const drawH   = ih * scale
    const offsetX = (cw - drawW) / 2
    const offsetY = (ch - drawH) / 2

    ctx.drawImage(img, offsetX, offsetY, drawW, drawH)
  }

  // ---- Beat visibility update (direct DOM, no setState) ----
  const updateBeat = (ref, opacity) => {
    const el = ref.current
    if (!el) return
    el.style.opacity = opacity
    if (opacity > 0.01) el.classList.add('visible')
    else                el.classList.remove('visible')
  }

  // ---- Scroll progress from wrapper position ----
  const getScrollProgress = () => {
    const wrapper = wrapperRef.current
    if (!wrapper) return 0
    const rect    = wrapper.getBoundingClientRect()
    const wh      = window.innerHeight
    const total   = wrapper.offsetHeight - wh
    if (total <= 0) return 0
    const scrolled = -rect.top
    const p = Math.max(0, Math.min(1, scrolled / total))
    return isNaN(p) ? 0 : p
  }

  // ---- Main effect — owns RAF loop, scroll, resize, preload ----
  useEffect(() => {
    const s = state.current

    resizeCanvas()

    // RAF render loop — runs continuously at 60fps, NEVER calls setState
    const renderLoop = () => {
      const tp = s.targetProgress

      // Lerp smooth progress toward target
      s.smoothProgress += (tp - s.smoothProgress) * LERP_FACTOR

      // Lerp smooth frame float
      const targetFrameF = tp * (TOTAL_FRAMES - 1)
      s.smoothFrame += (targetFrameF - s.smoothFrame) * LERP_FACTOR

      const frameIdx     = Math.round(s.smoothFrame)
      const clampedFrame = Math.max(0, Math.min(TOTAL_FRAMES - 1, frameIdx))

      // Only redraw on frame change
      if (clampedFrame !== s.lastDrawnFrame) {
        drawFrame(clampedFrame)
        s.lastDrawnFrame = clampedFrame
      }

      const p = s.smoothProgress

      // Beat overlays
      updateBeat(beatEngRef,   getBeatOpacity(p, STORY_BEATS.engineering))
      updateBeat(beatNCRef,    getBeatOpacity(p, STORY_BEATS.nc))
      updateBeat(beatSoundRef, getBeatOpacity(p, STORY_BEATS.sound))

      // Ambient glow color shift
      if (ambientRef.current) {
        ambientRef.current.style.background =
          p < 0.35
            ? 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(0,80,255,0.04) 0%, transparent 70%)'
            : p < 0.65
            ? 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(0,214,255,0.05) 0%, transparent 70%)'
            : 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(0,80,255,0.06) 0%, transparent 70%)'
      }

      s.rafId = requestAnimationFrame(renderLoop)
    }

    s.rafId = requestAnimationFrame(renderLoop)

    // Scroll handler — only updates target; rendering is fully decoupled
    const onScroll = () => {
      s.targetProgress = getScrollProgress()
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // Resize handler — debounced
    let resizeTimer
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(resizeCanvas, 100)
    }
    window.addEventListener('resize', onResize, { passive: true })

    // Safety fallback timer — unlocks page after 2.5s regardless of network speed
    const fallbackTimer = setTimeout(() => {
      if (!s.isReady) {
        s.isReady = true
        onReady?.()
      }
    }, 2500)

    // Image preload — prioritized: first frame, last frame, then sequential
    const priorityOrder = [1, TOTAL_FRAMES]
    for (let i = 2; i < TOTAL_FRAMES; i++) priorityOrder.push(i)

    const checkReadyThreshold = () => {
      onLoadingProgress?.(s.loadedCount / TOTAL_FRAMES)
      if (!s.isReady && s.loadedCount >= Math.ceil(TOTAL_FRAMES * 0.08)) {
        s.isReady = true
        clearTimeout(fallbackTimer)
        onReady?.()
      }
    }

    priorityOrder.forEach((n, idx) => {
      const img  = new Image()
      img.decoding = 'async'

      img.onload = () => {
        s.images[n - 1] = img
        s.loadedCount++

        // Show first frame the instant it's available
        if (s.loadedCount === 1 || n === 1) {
          resizeCanvas()
          drawFrame(0)
          s.lastDrawnFrame = 0
        }

        checkReadyThreshold()
      }

      img.onerror = () => {
        s.loadedCount++
        checkReadyThreshold()
      }

      // Stagger requests slightly
      setTimeout(() => { img.src = framePath(n) }, idx * 4)
    })

    return () => {
      cancelAnimationFrame(s.rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      clearTimeout(resizeTimer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="sequence-wrapper" id="sequence-wrapper" ref={wrapperRef}>
      <div className="canvas-sticky">

        {/* The canvas — full viewport, pinned */}
        <canvas
          ref={canvasRef}
          id="product-canvas"
          aria-label="Sony WH-1000XM6 animated product sequence"
        />

        {/* Ambient color layer */}
        <div className="canvas-ambient" ref={ambientRef} aria-hidden="true" />

        {/* ── Beat 1: Engineering (left) ── */}
        <div
          className="story-beat beat-left"
          ref={beatEngRef}
          style={{ opacity: 0 }}
          aria-live="polite"
        >
          <div className="beat-inner">
            <div className="beat-tag">
              <span className="beat-tag-dot" />
              Engineering
            </div>
            <h2 className="beat-headline">
              Precision-engineered<br />for silence.
            </h2>
            <div className="beat-divider" />
            <p className="beat-body">
              Custom drivers, sealed acoustic chambers, and optimized airflow deliver studio-grade clarity.
            </p>
            <p className="beat-body beat-body-2">
              Every component tuned for balance, power, and comfort — hour after hour.
            </p>
            <ul className="beat-specs-list" aria-label="Engineering specs">
              <li><span className="spec-icon" aria-hidden="true">◈</span><span>30mm custom-engineered drivers</span></li>
              <li><span className="spec-icon" aria-hidden="true">◈</span><span>Sealed acoustic chambers</span></li>
              <li><span className="spec-icon" aria-hidden="true">◈</span><span>Optimized airflow architecture</span></li>
            </ul>
          </div>
        </div>

        {/* ── Beat 2: Noise Cancelling (right) ── */}
        <div
          className="story-beat beat-right"
          ref={beatNCRef}
          style={{ opacity: 0 }}
          aria-live="polite"
        >
          <div className="beat-inner">
            <div className="beat-tag">
              <span className="beat-tag-dot beat-tag-dot--cyan" />
              Noise Cancelling
            </div>
            <h2 className="beat-headline">
              Adaptive noise cancelling,<br />redefined.
            </h2>
            <div className="beat-divider" />
            <ul className="beat-points" aria-label="Noise cancelling features">
              <li>
                <svg className="point-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <circle cx="10" cy="10" r="9" stroke="#00D6FF" strokeWidth="1.5" />
                  <path d="M6.5 10l2.5 2.5 4.5-4.5" stroke="#00D6FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Multi-microphone array listens in every direction.</span>
              </li>
              <li>
                <svg className="point-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <circle cx="10" cy="10" r="9" stroke="#00D6FF" strokeWidth="1.5" />
                  <path d="M6.5 10l2.5 2.5 4.5-4.5" stroke="#00D6FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Real-time noise analysis adapts to your environment.</span>
              </li>
              <li>
                <svg className="point-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <circle cx="10" cy="10" r="9" stroke="#00D6FF" strokeWidth="1.5" />
                  <path d="M6.5 10l2.5 2.5 4.5-4.5" stroke="#00D6FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Your music stays pure — planes, trains, and crowds fade away.</span>
              </li>
            </ul>
            <div className="nc-badge">
              <span className="nc-badge-label">Industry-Best ANC</span>
              <span className="nc-badge-value">QN3 Processor</span>
            </div>
          </div>
        </div>

        {/* ── Beat 3: Sound Quality (center bottom) ── */}
        <div
          className="story-beat beat-center"
          ref={beatSoundRef}
          style={{ opacity: 0 }}
          aria-live="polite"
        >
          <div className="beat-inner beat-inner--center">
            <div className="beat-tag">
              <span className="beat-tag-dot beat-tag-dot--blue" />
              Sound Quality
            </div>
            <h2 className="beat-headline beat-headline--center">
              Immersive,<br />lifelike sound.
            </h2>
            <div className="beat-divider beat-divider--center" />
            <p className="beat-body beat-body--center">
              High-performance drivers unlock detail, depth, and texture in every track.
            </p>
            <p className="beat-body beat-body--center beat-body-2">
              AI-enhanced upscaling restores clarity to compressed audio, so every note feels alive.
            </p>
            <div className="sound-metrics" aria-label="Audio metrics">
              <div className="metric">
                <span className="metric-value">40h</span>
                <span className="metric-label">Battery</span>
              </div>
              <div className="metric-divider" aria-hidden="true" />
              <div className="metric">
                <span className="metric-value">Hi-Res</span>
                <span className="metric-label">Audio</span>
              </div>
              <div className="metric-divider" aria-hidden="true" />
              <div className="metric">
                <span className="metric-value">LDAC</span>
                <span className="metric-label">Lossless</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
