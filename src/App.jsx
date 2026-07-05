import { useState, useEffect, useRef } from 'react'
import './App.css'

/* ─── Sections data ─── */
const cityData = [
  {
    id: 'mohenjo-daro', name: 'Mohenjo-daro', period: 'c. 2600–1900 BCE',
    coords: '27.33°N, 68.13°E',
    desc: 'The "Mound of the Dead." Home to the Great Bath, an advanced water management system, and one of the ancient world\'s most sophisticated urban layouts.',
    highlights: ['The Great Bath', 'Granary & Assembly Hall', 'Advanced drainage systems'],
  },
  {
    id: 'harappa', name: 'Harappa', period: 'c. 3300–1300 BCE',
    coords: '30.63°N, 72.87°E',
    desc: 'The first site excavated in 1921, giving the civilization its alternate name. Fortified citadels, worker quarters, and extensive craft production defined this city.',
    highlights: ['Fortified citadels', 'Cemetery R-37', 'Seal manufacturing'],
  },
  {
    id: 'dholavira', name: 'Dholavira', period: 'c. 3000–1500 BCE',
    coords: '23.88°N, 70.22°E',
    desc: 'A marvel of water engineering on Khadir Bet island. Massive stepwell reservoirs, intricate stone architecture, and a unique signboard with Indus script.',
    highlights: ['Water reservoirs', 'Rock-cut architecture', 'Signboard inscription'],
  },
  {
    id: 'lothal', name: 'Lothal', period: 'c. 2400–1600 BCE',
    coords: '22.52°N, 72.25°E',
    desc: 'A vital port city with the world\'s earliest known dockyard. A hub of maritime trade, bead-making, and commercial activity connecting to Mesopotamia.',
    highlights: ['Ancient dockyard', 'Bead factory', 'Trade networks'],
  },
  {
    id: 'rakhigarhi', name: 'Rakhigarhi', period: 'c. 2600–1900 BCE',
    coords: '29.29°N, 76.11°E',
    desc: 'One of the largest IVC sites in present-day Haryana, India. Recent excavations reveal a sprawling metropolis with advanced urban planning and workshops.',
    highlights: ['Largest IVC site', 'Planned streets', 'Craft workshops'],
  },
]

const cultureSections = [
  {
    title: 'Daily Life', subtitle: 'Hygiene, order, and comfort',
    body: 'Homes had private wells and bathrooms. Wastewater flowed through covered brick drains along grid-planned streets. The uniformity of bricks across all cities suggests remarkable central coordination.'
  },
  {
    title: 'Agriculture & Trade', subtitle: 'Cotton, cattle, and commerce',
    body: 'They grew wheat, barley, peas, dates — and were among the first to cultivate cotton. Carved steatite seals with animal motifs standardized trade across a vast network reaching Mesopotamia and Central Asia.'
  },
  {
    title: 'Art & Craft', subtitle: 'Bronze, beads, and beyond',
    body: 'The Dancing Girl bronze, the Priest-King sculpture, intricate bead necklaces, and geometric pottery reveal a society that valued beauty as much as utility. Toys for children were also found in abundance.'
  },
  {
    title: 'Beliefs & Legacy', subtitle: 'The undeciphered script',
    body: 'Mother Goddess figurines, a Proto-Shiva seal, and fire altars hint at early Hindu traditions. The Indus script — over 400 symbols on thousands of seals — remains undeciphered, one of history\'s great puzzles.'
  },
]

const timelineData = [
  { year: '7000 BCE', title: 'Early Mehrgarh', desc: 'Earliest Neolithic settlement with farming and herding.' },
  { year: '3300 BCE', title: 'Early Harappan Phase', desc: 'Emergence of urban centers and trade networks.' },
  { year: '2600 BCE', title: 'Mature Harappan Phase', desc: 'Peak of the civilization. Cities reach their zenith.' },
  { year: '1900 BCE', title: 'Late Harappan Phase', desc: 'Beginning of decline as monsoons shift and rivers dry.' },
  { year: '1300 BCE', title: 'Final Decline', desc: 'Population moves east toward the Gangetic plains.' },
  { year: '1920 CE', title: 'Rediscovery', desc: 'Excavations reveal the lost civilization to the modern world.' },
]

/* ─── Hook: scroll reveal ─── */
function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return [ref, visible]
}

/* ─── AnimatedSection wrapper ─── */
function Reveal({ children, className = '', as: Tag = 'section', threshold }) {
  const [ref, visible] = useScrollReveal(threshold)
  return (
    <Tag ref={ref} className={`reveal ${visible ? 'revealed' : ''} ${className}`}>
      {children}
    </Tag>
  )
}

/* ─── Nav dots ─── */
const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'overview', label: 'Overview' },
  { id: 'cities', label: 'Cities' },
  { id: 'culture', label: 'Culture' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'legacy', label: 'Legacy' },
]

function NavDots() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 2
      let idx = 0
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id)
        if (el && el.offsetTop <= scrollY) { idx = i; break }
      }
      setActive(idx)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className="nav-dots" aria-label="Section navigation">
      {sections.map((s, i) => (
        <a key={s.id} href={`#${s.id}`} className={`nav-dot ${i === active ? 'active' : ''}`}
          onClick={(e) => { e.preventDefault(); document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' }) }}
          aria-label={s.label}
        />
      ))}
    </nav>
  )
}

/* ─── App ─── */
function App() {
  const [selectedCity, setSelectedCity] = useState(null)

  return (
    <div className="app">
      <NavDots />

      {/* ─── HERO ─── */}
      <section id="hero" className="hero">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-label">The Bronze Age</p>
          <h1 className="hero-title">Indus Valley<br />Civilization</h1>
          <p className="hero-sub">3300 – 1300 BCE &middot; Pakistan & Northwest India</p>
          <div className="hero-sep" />
          <p className="hero-desc">One of the three great early civilizations of the Old World — a society of<br />astonishing urban planning, trade, and artistry.</p>
        </div>
        <a href="#overview" className="scroll-indicator" onClick={(e) => { e.preventDefault(); document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' }) }}>
          <span>Scroll</span>
          <div className="scroll-arrow"><div /></div>
        </a>
      </section>

      {/* ─── OVERVIEW ─── */}
      <Reveal id="overview" className="section-dark section-with-bg">
        <div className="section-bg-img overview-bg" />
        <div className="section-inner narrow">
          <h2 className="section-title">A Lost World</h2>
          <div className="section-sep" />
          <p className="section-text">
            At its peak, the Indus Valley Civilization numbered over five million people across more than
            a thousand settlements — a territory larger than Egypt and Mesopotamia combined. Its cities
            featured grid-like streets, advanced drainage, standardized bricks, and monumental architecture
            that rivaled anything in the ancient world.
          </p>
          <p className="section-text">
            Yet the Indus script remains undeciphered. We know more about their drains than their kings.
            The civilization declined around 1900 BCE, likely due to climate change and shifting rivers,
            leaving behind a legacy that still shapes the Indian subcontinent.
          </p>
          <div className="stats-row">
            <div className="stat"><span className="stat-num">5M+</span><span className="stat-label">Population</span></div>
            <div className="stat"><span className="stat-num">1,000+</span><span className="stat-label">Settlements</span></div>
            <div className="stat"><span className="stat-num">700</span><span className="stat-label">Years at peak</span></div>
          </div>
        </div>
      </Reveal>

      {/* ─── CITIES ─── */}
      <Reveal id="cities" className="section-dark-alt">
        <div className="section-inner">
          <h2 className="section-title">Great Cities</h2>
          <div className="section-sep" />
          <p className="section-text narrow">Click a city to explore its story.</p>

          <div className="cities-grid">
            {cityData.map((city) => (
              <button key={city.id} className={`city-card ${selectedCity?.id === city.id ? 'active' : ''}`}
                onClick={() => setSelectedCity(selectedCity?.id === city.id ? null : city)}>
                <h3 className="city-name">{city.name}</h3>
                <p className="city-period">{city.period}</p>
                {selectedCity?.id === city.id && (
                  <div className="city-detail">
                    <p className="city-coords">{city.coords}</p>
                    <p className="city-desc">{city.desc}</p>
                    <ul className="city-highlights">
                      {city.highlights.map((h) => <li key={h}>{h}</li>)}
                    </ul>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ─── CULTURE ─── */}
      <section id="culture" className="culture-section">
        {cultureSections.map((s, i) => (
          <Reveal key={s.title} className={`culture-block ${i % 2 === 0 ? 'culture-left' : 'culture-right'}`}>
            <div className="culture-content">
              <p className="culture-label">{s.subtitle}</p>
              <h2 className="culture-title">{s.title}</h2>
              <div className="section-sep" />
              <p className="culture-text">{s.body}</p>
            </div>
            <div className="culture-visual">
              <img src={i === 2 ? "/images/priest-king.jpg" : i === 3 ? "/images/seals.jpg" : i === 1 ? "/images/seals.jpg" : "/images/mohenjo-daro.jpg"} alt={s.title} className="culture-img" />
            </div>
          </Reveal>
        ))}
      </section>

      {/* ─── TIMELINE ─── */}
      <Reveal id="timeline" className="section-dark">
        <div className="section-inner">
          <h2 className="section-title">Timeline</h2>
          <div className="section-sep" />
          <div className="timeline">
            {timelineData.map((e, i) => (
              <div key={i} className="tl-item">
                <div className="tl-dot" />
                <div className="tl-content">
                  <span className="tl-year">{e.year}</span>
                  <h3>{e.title}</h3>
                  <p>{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ─── LEGACY ─── */}
      <Reveal id="legacy" className="section-legacy">
        <div className="legacy-bg-img" />
        <div className="legacy-overlay" />
        <div className="section-inner narrow" style={{ position: 'relative', zIndex: 1 }}>
          <h2 className="section-title">Enduring Legacy</h2>
          <div className="section-sep" />
          <p className="section-text">
            The Indus Valley Civilization did not vanish without trace. Its urban planning concepts, agricultural
            practices, craft traditions, and cultural DNA flowed into the civilizations that followed.
            From the layout of modern cities to the roots of Hindu iconography, the IVC's influence
            is still felt today.
          </p>
          <p className="section-text" style={{ marginTop: '1rem' }}>
            As archaeologists continue to dig and new technologies like DNA analysis and satellite imagery
            reveal fresh secrets, the story of the Indus people is still being written.
          </p>
          <p className="legacy-closing">They shaped history. We are still discovering how.</p>
        </div>
      </Reveal>

      {/* ─── FOOTER ─── */}
      <footer className="footer">
        <p>Indus Valley Civilization &middot; A digital exploration</p>
      </footer>
    </div>
  )
}

export default App
