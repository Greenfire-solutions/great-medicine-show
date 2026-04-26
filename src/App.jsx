import { useEffect, useMemo, useState } from 'react'

const guilds = ['Fire Guild', 'Water Guild', 'Earth Guild', 'Air Guild']
const hubSections = [
  'Cyber Hall of Great Works',
  'Fire Temple',
  'Water Temple',
  'Earth Temple',
  'Air Temple',
  'Music Hall',
  'Store',
  'Shows Amphitheater',
  'Courses Academy',
  'CivilX Lab'
]
const saveKey = 'gms-cyber-hall-profile'
const stepAmount = 2.5

const getSavedProfile = () => {
  try {
    const value = localStorage.getItem(saveKey)
    return value ? JSON.parse(value) : null
  } catch {
    return null
  }
}

const mapLocations = [
  { name: 'Cyber Hall of Great Works', zone: 'center', tone: 'hall', x: 50, y: 48 },
  { name: 'Fire Temple', zone: 'northwest', tone: 'fire', x: 20, y: 23 },
  { name: 'Water Temple', zone: 'northeast', tone: 'water', x: 80, y: 23 },
  { name: 'Earth Temple', zone: 'southwest', tone: 'earth', x: 20, y: 78 },
  { name: 'Air Temple', zone: 'southeast', tone: 'air', x: 80, y: 78 },
  { name: 'Music Hall', zone: 'west', tone: 'music', x: 10, y: 48 },
  { name: 'Store', zone: 'east', tone: 'store', x: 90, y: 48 },
  { name: 'Shows Amphitheater', zone: 'south', tone: 'shows', x: 50, y: 92 },
  { name: 'Courses Academy', zone: 'north', tone: 'courses', x: 50, y: 10 },
  { name: 'CivilX Lab', zone: 'far-east', tone: 'lab', x: 95, y: 33 }
]

const clamp = (value, min, max) => Math.max(min, Math.min(max, value))

function App() {
  const savedProfile = useMemo(getSavedProfile, [])
  const [step, setStep] = useState(savedProfile ? 4 : 1)
  const [guild, setGuild] = useState(savedProfile?.guild || '')
  const [name, setName] = useState(savedProfile?.name || '')
  const [activeSection, setActiveSection] = useState('Cyber Hall of Great Works')
  const [playerPosition, setPlayerPosition] = useState({ x: 50, y: 52 })

  const enterWorld = () => {
    const profile = { guild, name: name.trim() }
    localStorage.setItem(saveKey, JSON.stringify(profile))
    setStep(4)
  }

  const movePlayer = (dx, dy) => {
    setPlayerPosition((prev) => ({
      x: clamp(prev.x + dx, 4, 96),
      y: clamp(prev.y + dy, 4, 96)
    }))
  }

  const nearbyLocation = useMemo(() => {
    let closest = null
    let closestDistance = Number.POSITIVE_INFINITY

    for (const location of mapLocations) {
      const distance = Math.hypot(playerPosition.x - location.x, playerPosition.y - location.y)
      if (distance < closestDistance) {
        closestDistance = distance
        closest = location
      }
    }

    return closestDistance <= 10 ? closest : null
  }, [playerPosition])

  const enterNearbyLocation = () => {
    if (nearbyLocation) {
      setActiveSection(nearbyLocation.name)
    }
  }

  useEffect(() => {
    if (step !== 4) {
      return
    }

    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase()
      if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd', 'enter'].includes(key)) {
        event.preventDefault()
      }

      if (key === 'arrowup' || key === 'w') movePlayer(0, -stepAmount)
      if (key === 'arrowdown' || key === 's') movePlayer(0, stepAmount)
      if (key === 'arrowleft' || key === 'a') movePlayer(-stepAmount, 0)
      if (key === 'arrowright' || key === 'd') movePlayer(stepAmount, 0)
      if (key === 'enter') enterNearbyLocation()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [step, nearbyLocation])

  return (
    <div className="app-shell arcade-screen">
      <header className="arcade-panel banner">
        <p className="kicker">Great Medicine Show RPG</p>
        <h1 className="glyph-title">Cyber Hall of Great Works</h1>
        <div className="glowing-divider" />
      </header>

      {step === 1 && (
        <section className="arcade-panel intro-panel">
          <h2 className="glyph-title">Welcome, Seeker</h2>
          <p className="arcade-copy">
            Beneath neon constellations and moss-covered stone, the halls stir. Begin your journey through
            music, craft, and elemental wisdom.
          </p>
          <button className="arcade-button" onClick={() => setStep(2)}>
            Begin Onboarding
          </button>
        </section>
      )}

      {step === 2 && (
        <section className="arcade-panel">
          <h2 className="glyph-title">Choose Your Elemental Guild</h2>
          <div className="glowing-divider" />
          <div className="grid guild-grid">
            {guilds.map((option) => (
              <button
                key={option}
                className={`temple-card ${guild === option ? 'selected' : ''}`}
                onClick={() => setGuild(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <button className="arcade-button" disabled={!guild} onClick={() => setStep(3)}>
            Continue
          </button>
        </section>
      )}

      {step === 3 && (
        <section className="arcade-panel">
          <h2 className="glyph-title">Name Your Character</h2>
          <div className="glowing-divider" />
          <label htmlFor="characterName">Character Name</label>
          <input
            id="characterName"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="e.g. Ash of the Verdant Circuit"
            maxLength={40}
          />
          <p className="small">Guild: {guild}</p>
          <button className="arcade-button" disabled={!name.trim()} onClick={enterWorld}>
            Enter World
          </button>
        </section>
      )}

      {step === 4 && (
        <section className="arcade-panel world-panel">
          <aside className="sidebar arcade-panel">
            <h3 className="glyph-title">Hall Navigation</h3>
            <div className="glowing-divider" />
            {hubSections.map((section) => (
              <button
                key={section}
                className={`arcade-button linkish ${activeSection === section ? 'selected' : ''}`}
                onClick={() => setActiveSection(section)}
              >
                {section}
              </button>
            ))}
          </aside>

          <div className="world-content">
            <div className="status-line">
              <span>{name}</span>
              <span>{guild}</span>
            </div>

            <h2 className="glyph-title">RPG Overworld Map</h2>
            <div className="glowing-divider" />

            <div className="rpg-map" role="group" aria-label="2D RPG world map">
              <div className="terrain terrain-forest" />
              <div className="terrain terrain-ruins" />
              <div className="terrain terrain-water" />
              <div className="portal portal-north" />
              <div className="portal portal-south" />
              <div className="path-line path-main" />
              <div className="path-line path-cross" />

              {mapLocations.map((location) => (
                <button
                  key={location.name}
                  className={`map-node temple-card zone-${location.zone} tone-${location.tone} ${
                    activeSection === location.name ? 'selected' : ''
                  }`}
                  onClick={() => setActiveSection(location.name)}
                >
                  <span className="node-label">{location.name}</span>
                </button>
              ))}

              <div className="player-avatar" style={{ left: `${playerPosition.x}%`, top: `${playerPosition.y}%` }}>
                <span className="player-core" />
              </div>

              {nearbyLocation && (
                <button className="enter-prompt arcade-button" onClick={enterNearbyLocation}>
                  Enter {nearbyLocation.name}
                </button>
              )}
            </div>

            <div className="mobile-controls" aria-label="Map movement controls">
              <button className="arcade-button" onClick={() => movePlayer(0, -stepAmount)}>
                ↑
              </button>
              <div>
                <button className="arcade-button" onClick={() => movePlayer(-stepAmount, 0)}>
                  ←
                </button>
                <button className="arcade-button" onClick={() => movePlayer(stepAmount, 0)}>
                  →
                </button>
              </div>
              <button className="arcade-button" onClick={() => movePlayer(0, stepAmount)}>
                ↓
              </button>
            </div>

            <article className="arcade-panel section-panel">
              <h3 className="glyph-title">{activeSection}</h3>
              <p className="arcade-copy">
                Placeholder content for <strong>{activeSection}</strong>. Future updates can add quests,
                stories, shops, lessons, and event pathways here.
              </p>
            </article>
          </div>
        </section>
      )}

      <footer className="footer">Boot OK</footer>
    </div>
  )
}

export default App
