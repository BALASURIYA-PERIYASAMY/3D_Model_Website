import React from 'react'

export default function Sitemap({ onBack, onNavigate }) {
  const links = [
    {
      category: 'Product Experience',
      items: [
        { name: 'Overview', id: 'hero' },
        { name: 'Engineering Explosion Sequence', id: 'sequence-wrapper' },
        { name: 'Features Showcase (QN3, Sterling Sound, ANC)', id: 'features-section' },
        { name: 'Color Customizer (Black, Silver, Blue, White, Sandstone)', id: 'colors-section' },
        { name: 'Technical Specifications', id: 'specs-section' },
        { name: 'Order & Pricing (₹39,990)', id: 'cta-section' },
      ],
    },
    {
      category: 'Key Technologies',
      items: [
        { name: 'HD Noise Cancelling Processor QN3', id: 'features-section' },
        { name: '30mm Custom Dynamic Driver', id: 'features-section' },
        { name: 'LDAC Lossless Audio (990 kbps)', id: 'features-section' },
        { name: '360° Spatial Audio with Head Tracking', id: 'features-section' },
        { name: '12-Microphone Beamforming Array', id: 'features-section' },
        { name: '30-Hour Battery & Quick Charge', id: 'features-section' },
      ],
    },
    {
      category: 'Legal & Information',
      items: [
        { name: 'Privacy Policy', target: 'privacy' },
        { name: 'Terms of Use', target: 'terms' },
        { name: 'Accessibility Statement', target: 'accessibility' },
        { name: 'Sitemap', target: 'sitemap' },
      ],
    },
  ]

  const handleClick = (item) => {
    if (item.target) {
      onNavigate(item.target)
    } else if (item.id) {
      onBack()
      setTimeout(() => {
        document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }

  return (
    <div className="policy-page">
      <div className="policy-header">
        <button onClick={onBack} className="policy-back-btn">
          <svg viewBox="0 0 16 16" fill="none">
            <path d="M13 8H3M7 12L3 8L7 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to WH‑1000XM6
        </button>
        <div className="policy-logo">Sony Corporation</div>
      </div>

      <main className="policy-content">
        <span className="policy-eyebrow">Site Architecture</span>
        <h1 className="policy-title">Sitemap</h1>
        <p className="policy-updated">Complete Navigation Map for Sony WH‑1000XM6</p>

        <div className="sitemap-grid">
          {links.map((group) => (
            <div key={group.category} className="sitemap-group">
              <h2 className="sitemap-group-title">{group.category}</h2>
              <ul className="sitemap-list">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <button onClick={() => handleClick(item)} className="sitemap-link">
                      {item.name}
                      <span className="sitemap-arrow">→</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>

      <footer className="policy-footer">
        &copy; 2026 Sony Corporation. All rights reserved.
      </footer>
    </div>
  )
}
