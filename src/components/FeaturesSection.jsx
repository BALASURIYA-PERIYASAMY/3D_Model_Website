import { useEffect, useRef, useState } from 'react'

const FEATURES = [
  {
    tag: 'Noise Cancellation',
    tagColor: 'cyan',
    headline: 'QN3 Processor.\nSilence at scale.',
    body: 'The next-generation HD Noise Cancelling Processor QN3 pairs with a 12-microphone beamforming array to analyse and eliminate noise faster than ever — adapting in real time to pressure changes at 30,000 feet or a packed commuter train.',
    detail: 'Auto NC Optimizer continuously calibrates to your unique ear shape, hair, and wearing position. No two pairs of ears are the same — your ANC shouldn\'t be either.',
    stat: { value: '12', unit: 'Mics', label: 'Beamforming array' },
    side: 'left',
  },
  {
    tag: 'Audio Excellence',
    tagColor: 'blue',
    headline: 'Mastered with\nSterling Sound.',
    body: 'Sony\'s custom 30mm Dynamic Driver Unit was tuned in collaboration with Sterling Sound and Battery Studios — the world\'s premier mastering facilities. Every frequency, every transient, every breath of air between notes, precisely calibrated.',
    detail: 'DSEE Extreme AI upscaling restores digital compression artifacts in real time, so even streamed audio sounds like it was never compressed. Pair that with LDAC at 990 kbps and you have wireless Hi-Res Audio — no compromise.',
    stat: { value: 'Hi-Res', unit: '', label: 'Wireless certified' },
    side: 'right',
  },
  {
    tag: 'Smart Listening',
    tagColor: 'purple',
    headline: 'Aware of you.\nAlways.',
    body: 'Wearing detection senses when you take off your headphones and pauses playback automatically. Speak-to-Chat detects your voice and switches to ambient sound mid-sentence — no button press, no interruption.',
    detail: '360 Reality Audio with head tracking places sound in three-dimensional space around you. As your head moves, so does the sound field — a performance that follows you.',
    stat: { value: '360°', unit: '', label: 'Reality Audio' },
    side: 'left',
  },
  {
    tag: 'All-Day Battery',
    tagColor: 'cyan',
    headline: '30 hours.\n3-minute rescue.',
    body: 'Up to 30 hours of battery life with ANC enabled. When you forget to charge, three minutes on the cable delivers three hours of playback — enough to make any flight.',
    detail: 'Bluetooth 5.3 with Multipoint Connection lets you seamlessly pair two devices at once. Switch from laptop to phone without touching a single button.',
    stat: { value: '30h', unit: '', label: 'ANC battery life' },
    side: 'right',
  },
]

function FeatureRow({ feature, index }) {
  const rowRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const isRight = feature.side === 'right'

  useEffect(() => {
    const el = rowRef.current
    if (!el) return

    // IntersectionObserver for initial fade-in class
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('feature-visible')
        }
      },
      { threshold: 0.1 }
    )
    io.observe(el)

    // Scroll listener for calculating scroll progress (0 to 1) of this specific row
    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const windowHeight = window.innerHeight
      // Progress 0 when top enters viewport bottom, 1 when bottom leaves viewport top
      const totalDist = windowHeight + rect.height
      const current = windowHeight - rect.top
      const p = Math.max(0, Math.min(1, current / totalDist))
      setScrollProgress(p)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // trigger once on mount

    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const tagColors = {
    cyan:   { dot: '#00D6FF', bg: 'rgba(0,214,255,0.08)', border: 'rgba(0,214,255,0.2)' },
    blue:   { dot: '#0050FF', bg: 'rgba(0,80,255,0.08)',  border: 'rgba(0,80,255,0.2)'  },
    purple: { dot: '#8B5CF6', bg: 'rgba(139,92,246,0.08)',border: 'rgba(139,92,246,0.2)'},
  }
  const tc = tagColors[feature.tagColor]

  return (
    <div
      ref={rowRef}
      className={`feature-row ${isRight ? 'feature-row--right' : ''}`}
      style={{ '--tag-dot': tc.dot, '--tag-bg': tc.bg, '--tag-border': tc.border }}
    >
      {/* Text column */}
      <div className="feature-text">
        <div className="feature-tag">
          <span className="feature-tag-dot" />
          {feature.tag}
        </div>
        <h3 className="feature-headline">
          {feature.headline.split('\n').map((line, i) => (
            <span key={i}>{line}{i === 0 && <br />}</span>
          ))}
        </h3>
        <p className="feature-body">{feature.body}</p>
        <p className="feature-detail">{feature.detail}</p>

        {/* Stat pill */}
        <div className="feature-stat">
          <span className="feature-stat-value">{feature.stat.value}</span>
          {feature.stat.unit && <span className="feature-stat-unit">{feature.stat.unit}</span>}
          <span className="feature-stat-label">{feature.stat.label}</span>
        </div>
      </div>

      {/* Visual column with scroll-linked animation */}
      <div className="feature-visual">
        <div className="feature-visual-card">
          <div className="feature-visual-glow" />
          <AnimatedFeatureVisual index={index} tagColor={feature.tagColor} progress={scrollProgress} />
        </div>
      </div>
    </div>
  )
}

function AnimatedFeatureVisual({ index, tagColor, progress }) {
  const colors = {
    cyan:   ['#00D6FF', '#0050FF'],
    blue:   ['#0050FF', '#00D6FF'],
    purple: ['#8B5CF6', '#00D6FF'],
  }
  const [c1, c2] = colors[tagColor]

  // Smooth normalized progress scaled to focus zone (0.2 to 0.8)
  const normP = Math.max(0, Math.min(1, (progress - 0.2) / 0.6))

  if (index === 0) {
    // ── QN3 PROCESSOR / 12-MIC RADAR ANIMATION ──
    const activeMicsCount = Math.floor(normP * 12)
    const radarRadius = 30 + normP * 35
    const radarOpacity = Math.max(0.1, 0.8 - normP * 0.4)

    return (
      <svg viewBox="0 0 200 200" fill="none" className="feature-svg">
        {/* Expanding Radar Rings */}
        <circle cx="100" cy="100" r={radarRadius} stroke={c1} strokeWidth="1" opacity={radarOpacity} />
        <circle cx="100" cy="100" r={Math.max(10, radarRadius - 20)} stroke={c1} strokeWidth="1" opacity={radarOpacity * 0.7} />
        <circle cx="100" cy="100" r="20" stroke={c1} strokeWidth="1.5" opacity="0.6"/>

        {/* 12 Mic Beamforming Dots & Activation Rays */}
        {[...Array(12)].map((_, i) => {
          const angle = (i / 12) * Math.PI * 2
          const x = 100 + Math.cos(angle) * 60
          const y = 100 + Math.sin(angle) * 60
          const isActive = i <= activeMicsCount
          return (
            <g key={i}>
              <line
                x1="100" y1="100" x2={x} y2={y}
                stroke={isActive ? c1 : '#333'}
                strokeWidth={isActive ? '1' : '0.5'}
                opacity={isActive ? '0.6' : '0.2'}
                style={{ transition: 'all 0.2s' }}
              />
              <circle
                cx={x} cy={y}
                r={isActive ? '5' : '3'}
                fill={isActive ? c1 : '#333'}
                opacity={isActive ? '1' : '0.4'}
                style={{ transition: 'all 0.2s' }}
              />
              {isActive && (
                <circle cx={x} cy={y} r="8" fill={c1} opacity="0.2" />
              )}
            </g>
          )
        })}

        {/* Center QN3 Processor Core */}
        <rect x="88" y="88" width="24" height="24" rx="4" fill="#0A0A0C" stroke={c1} strokeWidth="1.5" />
        <circle cx="100" cy="100" r="4" fill={c2} />
        <text x="100" y="103" textAnchor="middle" fill="#fff" fontSize="6" fontWeight="700" fontFamily="Inter,sans-serif">QN3</text>

        <text x="100" y="180" textAnchor="middle" fill={c1} fontSize="11" fontWeight="600" opacity="0.85" fontFamily="Inter,sans-serif">
          {activeMicsCount > 0 ? `${activeMicsCount} / 12 MICS ACTIVE` : '12-MIC BEAMFORMING ARRAY'}
        </text>
      </svg>
    )
  }

  if (index === 1) {
    // ── MASTERED WITH STERLING SOUND / EQUALIZER ANIMATION ──
    const barsCount = 20
    const phaseShift = normP * Math.PI * 4

    return (
      <svg viewBox="0 0 200 200" fill="none" className="feature-svg">
        <defs>
          <linearGradient id="wg_anim" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={c1}/>
            <stop offset="100%" stopColor={c2}/>
          </linearGradient>
        </defs>

        {/* Equalizer Bars moving dynamically on scroll */}
        {[...Array(barsCount)].map((_, i) => {
          const x = 10 + i * 9.5
          // Calculate dynamic height based on sine wave shifted by scroll progress
          const baseH = [20,35,55,80,95,80,60,90,70,45,75,95,60,40,70,85,55,35,25,15][i]
          const wave = Math.sin(phaseShift + (i / barsCount) * Math.PI * 2)
          const dynamicH = Math.max(10, Math.min(105, baseH + wave * 25 * normP))

          return (
            <rect
              key={i}
              x={x}
              y={100 - dynamicH / 2}
              width="5"
              height={dynamicH}
              rx="2.5"
              fill="url(#wg_anim)"
              opacity={0.4 + (i / barsCount) * 0.5}
              style={{ transition: 'height 0.1s ease-out, y 0.1s ease-out' }}
            />
          )
        })}

        {/* High-Res Bitrate Counter Surge */}
        <text x="100" y="175" textAnchor="middle" fill={c1} fontSize="11" fontWeight="600" opacity="0.9" fontFamily="Inter,sans-serif">
          LDAC · {Math.round(300 + normP * 690)} KBPS
        </text>
      </svg>
    )
  }

  if (index === 2) {
    // ── AWARE OF YOU / HEAD TRACKING ANIMATION ──
    const rotationAngle = (normP - 0.5) * 60 // Rotate -30deg to +30deg
    const waveRadius1 = 45 + (normP * 25) % 20
    const waveRadius2 = 30 + (normP * 25) % 15

    return (
      <svg viewBox="0 0 200 200" fill="none" className="feature-svg">
        {/* Head Tracking Orbit Rings */}
        <g transform={`rotate(${rotationAngle} 100 90)`} style={{ transition: 'transform 0.1s ease-out' }}>
          <circle cx="100" cy="90" r="35" stroke={c1} strokeWidth="1.5" opacity="0.7"/>
          <circle cx="100" cy="90" r="8" fill={c2} opacity="0.9"/>

          {/* Directional Sensor Rays */}
          {[0, 60, 120, 180, 240, 300].map((deg, i) => {
            const rad = (deg * Math.PI) / 180
            const x1 = 100 + Math.cos(rad) * 38
            const y1 = 90 + Math.sin(rad) * 38
            const x2 = 100 + Math.cos(rad) * 58
            const y2 = 90 + Math.sin(rad) * 58
            return (
              <g key={i}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={c1} strokeWidth="1.5" opacity="0.7"/>
                <circle cx={x2} cy={y2} r="3" fill={c1} opacity="0.8"/>
              </g>
            )
          })}
          <ellipse cx="100" cy="90" rx="58" ry="25" stroke={c1} strokeWidth="1" opacity="0.4" strokeDasharray="4 3"/>
        </g>

        {/* Dynamic 360 Sound Wave Arcs */}
        <circle cx="100" cy="90" r={waveRadius1} stroke={c2} strokeWidth="1" opacity={0.6 - waveRadius1 / 100} />
        <circle cx="100" cy="90" r={waveRadius2} stroke={c2} strokeWidth="1" opacity={0.8 - waveRadius2 / 80} />

        <text x="100" y="175" textAnchor="middle" fill={c1} fontSize="11" fontWeight="600" opacity="0.9" fontFamily="Inter,sans-serif">
          360° HEAD TRACKING · {Math.round(rotationAngle)}°
        </text>
      </svg>
    )
  }

  if (index === 3) {
    // ── 30 HOURS / DYNAMIC CHARGING ANIMATION ──
    const chargePercentage = Math.round(normP * 100)
    const maxHeight = 84
    const currentFillHeight = (chargePercentage / 100) * maxHeight
    const fillY = 144 - currentFillHeight

    return (
      <svg viewBox="0 0 200 200" fill="none" className="feature-svg">
        <defs>
          <linearGradient id="batteryGrad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor={c2}/>
            <stop offset="100%" stopColor={c1}/>
          </linearGradient>
          <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Battery Cap */}
        <rect x="85" y="46" width="30" height="12" rx="4" stroke={c1} strokeWidth="1.5" opacity="0.6" fill="#0A0A0C" />

        {/* Outer Battery Shell */}
        <rect x="55" y="56" width="90" height="92" rx="14" stroke={c1} strokeWidth="2" fill="#0A0A0C" opacity="0.8" />

        {/* Dynamic Charging Fill Bar */}
        {currentFillHeight > 0 && (
          <rect
            x="60"
            y={fillY}
            width="80"
            height={currentFillHeight}
            rx="10"
            fill="url(#batteryGrad)"
            filter="url(#glowFilter)"
            style={{ transition: 'height 0.1s linear, y 0.1s linear' }}
          />
        )}

        {/* Lightning Bolt Charging Icon */}
        <path
          d="M103 75L90 102H102L97 125L113 97H100L103 75Z"
          fill={chargePercentage > 20 ? '#FFFFFF' : c1}
          stroke={c1}
          strokeWidth="1"
          opacity={0.7 + Math.sin(normP * 10) * 0.3}
          style={{ transition: 'fill 0.2s' }}
        />

        {/* Live Charge Percentage & Hours */}
        <text x="100" y="175" textAnchor="middle" fill={c1} fontSize="12" fontWeight="700" fontFamily="Inter,sans-serif">
          {chargePercentage}% CHARGED · {Math.round((chargePercentage / 100) * 30)} HOURS
        </text>
      </svg>
    )
  }

  return null
}

export default function FeaturesSection() {
  return (
    <section id="features-section" className="features-section" aria-label="Product features">
      <div className="features-inner">
        <div className="section-eyebrow">
          <span className="eyebrow-dot eyebrow-dot--blue" aria-hidden="true" />
          Why WH‑1000XM6
        </div>
        <h2 className="section-title">
          Every detail,<br />
          <span className="gradient-text">obsessively refined.</span>
        </h2>
        <p className="section-subtitle">
          Real specifications. Real technologies. Interactive on scroll.
        </p>

        <div className="features-list">
          {FEATURES.map((f, i) => (
            <FeatureRow key={f.tag} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
