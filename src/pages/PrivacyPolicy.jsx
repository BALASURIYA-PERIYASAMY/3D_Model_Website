import React from 'react'

export default function PrivacyPolicy({ onBack }) {
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
        <span className="policy-eyebrow">Legal & Compliance</span>
        <h1 className="policy-title">Privacy Policy</h1>
        <p className="policy-updated">Last Updated: July 2026</p>

        <section className="policy-section">
          <h2>1. Introduction</h2>
          <p>
            Sony Corporation and its global subsidiaries ("Sony", "we", "us", or "our") respect your privacy and are committed to protecting the personal data collected through your use of Sony WH-1000XM6 wireless headphones, the Sony Sound Connect application, and our online services.
          </p>
        </section>

        <section className="policy-section">
          <h2>2. Information We Collect</h2>
          <p>When you interact with our devices and services, we may collect the following types of information:</p>
          <ul>
            <li><strong>Device Telemetry:</strong> Firmware version, battery status, noise-cancelling optimization settings, and Bluetooth pairing logs.</li>
            <li><strong>Audio & Acoustic Profile:</strong> Auto NC Optimizer calibration data (ear canal shape measurements used locally on the QN3 processor). Audio logs are not stored or transmitted to external servers.</li>
            <li><strong>Location Data:</strong> Coarse location for adaptive sound control (e.g., detecting if you are at an airport, office, or gym) when explicitly permitted via the Sony Sound Connect app.</li>
            <li><strong>Account & Transaction Data:</strong> Name, email address, purchase history, and warranty registration details.</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>3. How We Use Your Information</h2>
          <p>Your information is used strictly to provide, maintain, and enhance your audio experience:</p>
          <ul>
            <li>Calibrating real-time adaptive noise cancellation and 360 Spatial Audio head tracking.</li>
            <li>Delivering firmware updates, security patches, and feature additions.</li>
            <li>Processing product registration, warranty claims, and customer support requests.</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>4. Data Protection & Sharing</h2>
          <p>
            Sony does not sell your personal data to third parties. Data processed by on-device AI algorithms (such as DSEE Extreme and Speak-to-Chat) remains strictly within local memory on the QN3 processor.
          </p>
        </section>

        <section className="policy-section">
          <h2>5. Your Rights & Contact</h2>
          <p>
            You have the right to access, rectify, or request deletion of your personal data at any time via the Sony Privacy Portal. For privacy inquiries, please contact privacy@sony.com.
          </p>
        </section>
      </main>

      <footer className="policy-footer">
        &copy; 2026 Sony Corporation. All rights reserved.
      </footer>
    </div>
  )
}
