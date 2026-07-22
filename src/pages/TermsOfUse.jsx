import React from 'react'

export default function TermsOfUse({ onBack }) {
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
        <span className="policy-eyebrow">Legal & Terms</span>
        <h1 className="policy-title">Terms of Use</h1>
        <p className="policy-updated">Last Updated: July 2026</p>

        <section className="policy-section">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using this website, the Sony WH-1000XM6 digital experience, or associated software, you agree to be bound by these Terms of Use and all applicable laws and regulations.
          </p>
        </section>

        <section className="policy-section">
          <h2>2. Intellectual Property Rights</h2>
          <p>
            All content, trade dress, trademarks, logos, audio technology descriptions, custom graphics, 3D image sequences, and software code related to Sony WH-1000XM6, LDAC, DSEE Extreme, QN3 Processor, and 360 Reality Audio are the exclusive property of Sony Corporation or its licensors.
          </p>
        </section>

        <section className="policy-section">
          <h2>3. Device Usage & Safety Guidelines</h2>
          <p>
            While using Active Noise Cancellation (ANC) on WH-1000XM6:
          </p>
          <ul>
            <li>Do not use high noise cancellation settings in environments where ambient situational awareness is required for safety (e.g., driving, cycling, walking near road traffic or railway lines).</li>
            <li>Extended exposure to high volume levels may cause permanent hearing damage. Please listen responsibly.</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>4. Software & Firmware Updates</h2>
          <p>
            Sony may periodically provide automatic or manual software updates to improve performance, fix security vulnerabilities, or add features. Usage of updated software constitutes acceptance of any modified terms.
          </p>
        </section>

        <section className="policy-section">
          <h2>5. Warranty & Limitation of Liability</h2>
          <p>
            WH-1000XM6 includes a 2-year limited manufacturer warranty covering hardware defects. Sony Corporation is not liable for indirect, incidental, or consequential damages resulting from improper device handling or unauthorized modifications.
          </p>
        </section>
      </main>

      <footer className="policy-footer">
        &copy; 2026 Sony Corporation. All rights reserved.
      </footer>
    </div>
  )
}
