export default function CTASection() {
  const scrollTo = (id) => (e) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="cta-section" className="cta-section" aria-label="Call to action">
      <div className="cta-ambient" aria-hidden="true" />
      <div className="cta-inner">

        <div className="section-eyebrow cta-eyebrow">
          <span className="eyebrow-dot eyebrow-dot--cyan" aria-hidden="true" />
          Available Now
        </div>

        <h2 className="cta-headline">
          Hear everything.<br />
          <span className="gradient-text">Feel nothing else.</span>
        </h2>

        <p className="cta-subheadline">
          WH‑1000XM6. Designed for focus, crafted for comfort.
        </p>
        <p className="cta-micro">
          Engineered for airports, offices, and everything in between.
        </p>

        <div className="cta-price-block">
          <span className="cta-price-label">Starting at</span>
          <span className="cta-price">₹39,990 / $399</span>
        </div>

        <div className="cta-buttons">
          <a
            href="#"
            className="btn-primary btn-primary--large"
            id="cta-btn-experience"
            aria-label="Experience WH-1000XM6 — Buy now"
          >
            <span>Experience WH‑1000XM6</span>
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="#specs-section"
            className="btn-ghost btn-ghost--large"
            id="cta-btn-specs"
            onClick={scrollTo('specs-section')}
          >
            See full specs
          </a>
        </div>

        <div className="cta-trust-badges" aria-label="Trust indicators">
          <div className="trust-badge">
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M10 2l2.39 4.84 5.35.78-3.87 3.77.91 5.32L10 14.27l-4.78 2.51.91-5.32L2.26 7.62l5.35-.78z" stroke="#00D6FF" strokeWidth="1.2" fill="#00D6FF" opacity=".2"/>
            </svg>
            <span>Free shipping</span>
          </div>
          <div className="trust-badge">
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M10 2C6 2 2 6 2 10s4 8 8 8 8-4 8-8-4-8-8-8z" stroke="#00D6FF" strokeWidth="1.2"/>
              <path d="M7 10l2 2 4-4" stroke="#00D6FF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>30-day returns</span>
          </div>
          <div className="trust-badge">
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <rect x="3" y="6" width="14" height="10" rx="2" stroke="#00D6FF" strokeWidth="1.2"/>
              <path d="M7 6V5a3 3 0 016 0v1" stroke="#00D6FF" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <span>2-year warranty</span>
          </div>
        </div>

      </div>
    </section>
  )
}
