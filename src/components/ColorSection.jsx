import { useState, useRef } from 'react'

const COLORS = [
  {
    id: 'black',
    name: 'Midnight Black',
    swatch: '#1A1A1A',
    image: 'https://sony.scene7.com/is/image/sonyglobalsolutions/WH1000XM6_Product_intro_01_M?$productIntroPlatemobile$&fmt=png-alpha',
    description: 'The iconic original. Quiet, powerful, timeless.',
    price: '₹39,990',
  },
  {
    id: 'silver',
    name: 'Platinum Silver',
    swatch: '#D8D8D8',
    image: 'https://sony.scene7.com/is/image/sonyglobalsolutions/WH1000XM6_Product_intro_08_M?$productIntroPlatemobile$&fmt=png-alpha',
    description: 'Luminous metallic finish with satin ear cushions.',
    price: '₹39,990',
  },
  {
    id: 'blue',
    name: 'Midnight Blue',
    swatch: '#1B2E4B',
    image: 'https://sony.scene7.com/is/image/sonyglobalsolutions/WH1000XM6_Product_intro_12_M?$productIntroPlatemobile$&fmt=png-alpha',
    description: 'Deep indigo matte finish designed for focused flow.',
    price: '₹39,990',
  },
  {
    id: 'white',
    name: 'Smoky White',
    swatch: '#F0F0F2',
    image: 'https://sony.scene7.com/is/image/sonyglobalsolutions/WH1000XM6_Product_intro_16_M?$productIntroPlatemobile$&fmt=png-alpha',
    description: 'Pristine, minimal, and modern aesthetics.',
    price: '₹39,990',
  },
  {
    id: 'sandstone',
    name: 'Sandstone',
    swatch: '#C5B299',
    image: 'https://sony.scene7.com/is/image/sonyglobalsolutions/WH1000XM6_Product_intro_23?$productIntroPlatemobile$&fmt=png-alpha',
    description: 'Natural earthy tones with warm metallic accents.',
    price: '₹39,990',
  },
]

export default function ColorSection() {
  const [active, setActive] = useState(0)
  const vizRef = useRef(null)

  const handleSelect = (idx) => {
    if (idx === active) return
    setActive(idx)
  }

  const color = COLORS[active]

  return (
    <section id="colors-section" className="color-section" aria-label="Color options">
      {/* Dynamic ambient color glow matching active headphone */}
      <div
        className="color-ambient"
        style={{ '--color-glow': color.swatch }}
        aria-hidden="true"
      />

      <div className="color-inner">
        {/* Left: Original Sony High-Res Headphone Image Showcase */}
        <div className="color-visual-wrap" ref={vizRef}>
          <div className="color-headphone-stage">
            {COLORS.map((c, i) => (
              <img
                key={c.id}
                src={c.image}
                alt={`Sony WH-1000XM6 in ${c.name}`}
                className={`color-headphone-img ${i === active ? 'active' : ''}`}
                loading="eager"
              />
            ))}
            {/* Soft radial shadow under headphone */}
            <div className="color-shadow-floor" />
          </div>
        </div>

        {/* Right: Color selector & details */}
        <div className="color-info">
          <div className="section-eyebrow">
            <span className="eyebrow-dot eyebrow-dot--cyan" aria-hidden="true" />
            Official Colors
          </div>

          <h2 className="section-title" style={{ marginBottom: '12px' }}>
            Choose your<br />
            <span className="gradient-text">expression.</span>
          </h2>

          <p className="section-subtitle" style={{ marginBottom: '40px' }}>
            Five signature Sony finishes. Crafted with precision.
          </p>

          {/* Color Swatches */}
          <div className="color-swatches" role="radiogroup" aria-label="Select color option">
            {COLORS.map((c, i) => (
              <button
                key={c.id}
                className={`color-swatch-btn ${active === i ? 'active' : ''}`}
                onClick={() => handleSelect(i)}
                aria-pressed={active === i}
                aria-label={c.name}
                style={{ '--swatch': c.swatch }}
                title={c.name}
              >
                <span className="swatch-inner" style={{ background: c.swatch }} />
              </button>
            ))}
          </div>

          {/* Active Color Info */}
          <div className="color-name-block">
            <span className="color-name" key={color.id}>
              {color.name}
            </span>
            <span className="color-description">{color.description}</span>
          </div>

          {/* Price & CTA */}
          <div className="color-price-row">
            <span className="color-price">{color.price}</span>
            <a
              href="#cta-section"
              className="btn-primary"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('cta-section')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <span>Order Now</span>
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
