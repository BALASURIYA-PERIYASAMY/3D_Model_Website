import React from 'react'

export default function Accessibility({ onBack }) {
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
        <span className="policy-eyebrow">Inclusion & Access</span>
        <h1 className="policy-title">Accessibility Statement</h1>
        <p className="policy-updated">Last Updated: July 2026</p>

        <section className="policy-section">
          <h2>1. Our Commitment</h2>
          <p>
            Sony Corporation is dedicated to ensuring digital accessibility for people of all abilities. We continuously improve the user experience for everyone and apply the relevant accessibility standards, including WCAG 2.1 Level AA guidelines.
          </p>
        </section>

        <section className="policy-section">
          <h2>2. Web & Product Accessibility Features</h2>
          <p>Our website and WH-1000XM6 product experience incorporate the following accessible design principles:</p>
          <ul>
            <li><strong>Keyboard Navigation:</strong> Full keyboard accessibility across all interactive controls, buttons, and section anchors.</li>
            <li><strong>Screen Reader Compatibility:</strong> Semantic HTML5 tags, ARIA labels (`aria-live`, `aria-label`, `aria-hidden`), and descriptive text for visual elements.</li>
            <li><strong>High Contrast & Typography:</strong> Dark Mode palette with high contrast ratios exceeding WCAG AA minimum thresholds for text legibility.</li>
            <li><strong>Reduced Motion:</strong> Support for `prefers-reduced-motion` media queries, allowing users to disable continuous scroll animations if desired.</li>
            <li><strong>Voice Guidance & Haptics:</strong> On-device voice prompts and touch sensor tactile feedback for visually impaired users.</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>3. Feedback & Contact</h2>
          <p>
            We welcome your feedback on the accessibility of the Sony WH-1000XM6 digital experience. If you encounter accessibility barriers, please let us know:
          </p>
          <ul>
            <li>Email: accessibility@sony.com</li>
            <li>Phone: 1-800-222-7669 (Sony Support Center)</li>
          </ul>
        </section>
      </main>

      <footer className="policy-footer">
        &copy; 2026 Sony Corporation. All rights reserved.
      </footer>
    </div>
  )
}
