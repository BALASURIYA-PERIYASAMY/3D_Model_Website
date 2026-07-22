const FOOTER_LINKS = [
  { label: 'Privacy Policy', target: 'privacy' },
  { label: 'Terms of Use',   target: 'terms' },
  { label: 'Accessibility',  target: 'accessibility' },
  { label: 'Sitemap',        target: 'sitemap' },
]

export default function Footer({ onNavigate }) {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-inner">
        <div className="footer-logo">
          <span className="footer-logo-sony">Sony</span>
          <span className="footer-logo-tagline">Make. Believe.</span>
        </div>
        <nav className="footer-nav" aria-label="Footer navigation">
          {FOOTER_LINKS.map(({ label, target }) => (
            <button
              key={label}
              className="footer-link-btn"
              onClick={() => onNavigate?.(target)}
            >
              {label}
            </button>
          ))}
        </nav>
        <p className="footer-copy">
          &copy; 2026 Sony Corporation. All rights reserved. Sony, WH-1000XM6,
          and related marks are trademarks of Sony Corporation.
        </p>
      </div>
    </footer>
  )
}
