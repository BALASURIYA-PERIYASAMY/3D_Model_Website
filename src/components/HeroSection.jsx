import { useEffect, useRef } from 'react'

export default function HeroSection() {
  const contentRef = useRef(null)

  // Direct DOM opacity manipulation — no re-renders on scroll
  useEffect(() => {
    const onScroll = () => {
      const el = contentRef.current
      if (!el) return
      const scrollY = window.scrollY
      const wh = window.innerHeight
      // Fade out over the first 60% of the viewport height
      const opacity = Math.max(0, 1 - scrollY / (wh * 0.6))
      el.style.opacity = opacity
      el.style.transform = `translateY(${(1 - opacity) * -30}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToSequence = (e) => {
    e.preventDefault()
    document.getElementById('sequence-wrapper')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToSpecs = (e) => {
    e.preventDefault()
    document.getElementById('specs-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToCTA = (e) => {
    e.preventDefault()
    document.getElementById('cta-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="hero-section" aria-label="Hero">
      <div className="hero-ambient" aria-hidden="true" />

      <div className="hero-content" ref={contentRef}>
        <div className="hero-eyebrow">
          <span className="eyebrow-dot" aria-hidden="true" />
          Flagship Wireless Audio
        </div>

        <h1 className="hero-title">
          Sony<br />WH‑1000XM6
        </h1>

        <p className="hero-subtitle">Silence, perfected.</p>

        <p className="hero-body">
          Flagship wireless noise cancelling,<br />
          re‑engineered for a world that never stops.
        </p>

        <div className="hero-ctas">
          <a href="#cta-section" className="btn-primary" onClick={scrollToCTA} id="hero-btn-primary">
            <span>Experience Now</span>
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#specs-section" className="btn-ghost" onClick={scrollToSpecs} id="hero-btn-specs">
            See full specs
          </a>
        </div>

        <div className="hero-scroll-hint" aria-label="Scroll to explore" onClick={scrollToSequence} style={{ cursor: 'pointer' }}>
          <div className="scroll-line" aria-hidden="true" />
          <span>Scroll to explore</span>
        </div>
      </div>
    </section>
  )
}
