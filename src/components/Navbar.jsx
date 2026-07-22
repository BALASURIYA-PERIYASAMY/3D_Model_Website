import { useState, useEffect, useRef } from 'react'

const NAV_ITEMS = [
  { label: 'Overview',   id: 'hero' },
  { label: 'Explosion',  id: 'sequence-wrapper' },
  { label: 'Features',   id: 'features-section' },
  { label: 'Colors',     id: 'colors-section' },
  { label: 'Specs',      id: 'specs-section' },
  { label: 'Buy',        id: 'cta-section' },
]

export default function Navbar() {
  const navRef = useRef(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const onScroll = () => {
      if (window.scrollY > 40) nav.classList.add('scrolled')
      else nav.classList.remove('scrolled')
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleAnchor = (e, id) => {
    e.preventDefault()
    setMobileOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <nav ref={navRef} className="navbar" aria-label="Main navigation">
        <div className="nav-inner">
          {/* Logo */}
          <a href="#hero" className="nav-logo" onClick={(e) => handleAnchor(e, 'hero')} aria-label="Sony WH-1000XM6 home">
            <span className="nav-logo-sony">Sony</span>
            <span className="nav-logo-model">WH‑1000XM6</span>
          </a>

          {/* Desktop Navigation Links */}
          <ul className="nav-links" role="list">
            {NAV_ITEMS.map(({ label, id }) => (
              <li key={label}>
                <a
                  href={`#${id}`}
                  className="nav-link"
                  onClick={(e) => handleAnchor(e, id)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <a
            href="#cta-section"
            className="nav-cta"
            onClick={(e) => handleAnchor(e, 'cta-section')}
          >
            <span>Experience WH‑1000XM6</span>
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            className={`nav-mobile-toggle ${mobileOpen ? 'open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <span className="hamburger-line line-1" />
            <span className="hamburger-line line-2" />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu Overlay */}
      <div className={`nav-mobile-overlay ${mobileOpen ? 'active' : ''}`} aria-hidden={!mobileOpen}>
        <div className="nav-mobile-content">
          <ul className="nav-mobile-links">
            {NAV_ITEMS.map(({ label, id }) => (
              <li key={label}>
                <a
                  href={`#${id}`}
                  className="nav-mobile-link"
                  onClick={(e) => handleAnchor(e, id)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-mobile-cta-wrap">
            <a
              href="#cta-section"
              className="btn-primary btn-primary--large"
              onClick={(e) => handleAnchor(e, 'cta-section')}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <span>Experience WH‑1000XM6</span>
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
