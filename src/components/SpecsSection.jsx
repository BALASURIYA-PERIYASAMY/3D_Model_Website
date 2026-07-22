import { useEffect, useRef } from 'react'

const SPEC_GROUPS = [
  {
    category: 'Audio',
    icon: '🎵',
    specs: [
      { label: 'Driver Unit',        value: '30mm Dynamic (Custom)' },
      { label: 'Frequency Response', value: '4 Hz – 40,000 Hz' },
      { label: 'Sensitivity',        value: '105 dB/mW' },
      { label: 'Impedance',          value: '48 Ω (1 kHz)' },
      { label: 'Codecs Supported',   value: 'SBC, AAC, LDAC, LC3' },
      { label: 'Hi-Res Audio',       value: 'Yes (Wired & Wireless)' },
      { label: 'DSEE Extreme',       value: 'AI-upscaling enabled' },
      { label: '360 Reality Audio',  value: 'With head tracking' },
    ],
  },
  {
    category: 'Noise Cancellation',
    icon: '🔇',
    specs: [
      { label: 'Processor',          value: 'HD Noise Cancelling QN3' },
      { label: 'Microphones',        value: '12 (Beamforming array)' },
      { label: 'Mic Technology',     value: 'Multi Noise Sensor' },
      { label: 'Auto NC Optimizer',  value: 'Yes (adaptive)' },
      { label: 'Ambient Sound Mode', value: 'Yes' },
      { label: 'Speak-to-Chat',      value: 'Auto-detect & pause' },
      { label: 'Wearing Detection',  value: 'Auto pause on removal' },
      { label: 'Pressure Relief',    value: 'Adaptive to altitude' },
    ],
  },
  {
    category: 'Connectivity',
    icon: '📡',
    specs: [
      { label: 'Bluetooth Version',  value: '5.3' },
      { label: 'Range',              value: 'Up to 10 m (33 ft)' },
      { label: 'Multipoint',         value: '2 devices simultaneously' },
      { label: 'NFC',                value: 'Yes (one-tap pairing)' },
      { label: 'Wired',              value: '3.5mm audio cable' },
      { label: 'Profiles',           value: 'HFP, HSP, A2DP, AVRCP' },
      { label: 'App Support',        value: 'Sony Sound Connect' },
      { label: 'Voice Assistants',   value: 'Google, Alexa, Siri' },
    ],
  },
  {
    category: 'Battery & Charging',
    icon: '⚡',
    specs: [
      { label: 'Battery Life (ANC)', value: '30 hours' },
      { label: 'Battery Life (Max)', value: '40 hours (ANC off)' },
      { label: 'Quick Charge',       value: '3 min → 3 hours' },
      { label: 'Full Charge Time',   value: 'Approx. 3.5 hours' },
      { label: 'Charging Port',      value: 'USB-C' },
      { label: 'Standby Time',       value: 'Up to 200 hours' },
    ],
  },
  {
    category: 'Design',
    icon: '✦',
    specs: [
      { label: 'Weight',             value: '254 g' },
      { label: 'Earcup Type',        value: 'Closed-back, circumaural' },
      { label: 'Foldable',           value: 'Yes (compact fold)' },
      { label: 'Colors',             value: 'Black, Silver, Blue, Sand Pink, Sandstone' },
      { label: 'Touch Controls',     value: 'Right earcup touch panel' },
      { label: 'Wearing Detection',  value: 'Accelerometer + proximity' },
      { label: 'In-Box Accessories', value: 'USB-C cable, 3.5mm cable, carry case' },
    ],
  },
]

function SpecGroup({ group, delay }) {
  const ref = useRef(null)

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          io.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="spec-group"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="spec-group-header">
        <span className="spec-group-icon" aria-hidden="true">{group.icon}</span>
        <h3 className="spec-group-title">{group.category}</h3>
      </div>
      <table className="spec-table" aria-label={`${group.category} specifications`}>
        <tbody>
          {group.specs.map((row) => (
            <tr key={row.label} className="spec-table-row">
              <td className="spec-table-label">{row.label}</td>
              <td className="spec-table-value">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function SpecsSection() {
  return (
    <section id="specs-section" className="fullspecs-section" aria-label="Full technical specifications">
      <div className="fullspecs-inner">
        {/* Header */}
        <div className="section-eyebrow">
          <span className="eyebrow-dot eyebrow-dot--blue" aria-hidden="true" />
          Technical Specifications
        </div>
        <h2 className="section-title">
          Built to the<br />
          <span className="gradient-text">highest standard.</span>
        </h2>
        <p className="section-subtitle">
          Every specification a testament to Sony's engineering heritage.
        </p>

        {/* Highlight stat bar */}
        <div className="specs-highlights">
          {[
            { v: '30h',    l: 'Battery (ANC on)' },
            { v: 'QN3',    l: 'ANC Processor'    },
            { v: '12',     l: 'Beamforming Mics' },
            { v: 'LDAC',   l: '990 kbps codec'   },
            { v: 'BT 5.3', l: 'Bluetooth'        },
            { v: '254g',   l: 'Weight'           },
          ].map((h) => (
            <div key={h.l} className="specs-highlight-item">
              <span className="specs-highlight-value">{h.v}</span>
              <span className="specs-highlight-label">{h.l}</span>
            </div>
          ))}
        </div>

        {/* Full spec groups */}
        <div className="spec-groups-grid">
          {SPEC_GROUPS.map((group, i) => (
            <SpecGroup key={group.category} group={group} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  )
}
