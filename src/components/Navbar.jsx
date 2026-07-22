import { useEffect, useRef } from 'react'

export default function Navbar() {
  const navRef = useRef(null)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const onScroll = () => {
      if (window.scrollY > 60) nav.classList.add('scrolled')
      else nav.classList.remove('scrolled')
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleAnchor = (e, id) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav ref={navRef} className="navbar" aria-label="Main navigation">
      <div className="nav-inner">
        {/* Logo */}
        <a href="#hero" className="nav-logo" onClick={(e) => handleAnchor(e, 'hero')} aria-label="Sony WH-1000XM6 home">
          <span className="nav-logo-sony">Sony</span>
          <span className="nav-logo-model">WH‑1000XM6</span>
        </a>

        {/* Links */}
        <ul className="nav-links" role="list">
          {[
            { label: 'Overview',   id: 'hero' },
            { label: 'Explosion',  id: 'sequence-wrapper' },
            { label: 'Features',   id: 'features-section' },
            { label: 'Colors',     id: 'colors-section' },
            { label: 'Specs',      id: 'specs-section' },
            { label: 'Buy',        id: 'cta-section' },
          ].map(({ label, id }) => (
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

        {/* CTA */}
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
      </div>
    </nav>
  )
}
