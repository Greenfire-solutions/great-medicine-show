import { useMemo, useState } from 'react'

const guilds = ['Fire Guild', 'Water Guild', 'Earth Guild', 'Air Guild']
const hubSections = ['Music Hall', 'Store', 'Shows', 'Courses', 'CivilX Lab', 'Guild Temples']
const saveKey = 'gms-cyber-hall-profile'

const getSavedProfile = () => {
  try {
    const value = localStorage.getItem(saveKey)
    return value ? JSON.parse(value) : null
  } catch {
    return null
  }
}

function App() {
  const savedProfile = useMemo(getSavedProfile, [])
  const [step, setStep] = useState(savedProfile ? 4 : 1)
  const [guild, setGuild] = useState(savedProfile?.guild || '')
  const [name, setName] = useState(savedProfile?.name || '')
  const [activeSection, setActiveSection] = useState('Music Hall')

  const enterWorld = () => {
    const profile = { guild, name: name.trim() }
    localStorage.setItem(saveKey, JSON.stringify(profile))
    setStep(4)
  }

  return (
    <div className="app-shell">
      <header className="banner">
        <p className="kicker">Great Medicine Show RPG</p>
        <h1>Cyber Hall of Great Works</h1>
      </header>

      {step === 1 && (
        <section className="panel intro-panel">
          <h2>Welcome, Seeker</h2>
          <p>
            Beneath neon constellations and moss-covered stone, the halls stir. Begin your journey through
            music, craft, and elemental wisdom.
          </p>
          <button onClick={() => setStep(2)}>Begin Onboarding</button>
        </section>
      )}

      {step === 2 && (
        <section className="panel">
          <h2>Choose Your Elemental Guild</h2>
          <div className="grid guild-grid">
            {guilds.map((option) => (
              <button
                key={option}
                className={`card ${guild === option ? 'selected' : ''}`}
                onClick={() => setGuild(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <button disabled={!guild} onClick={() => setStep(3)}>
            Continue
          </button>
        </section>
      )}

      {step === 3 && (
        <section className="panel">
          <h2>Name Your Character</h2>
          <label htmlFor="characterName">Character Name</label>
          <input
            id="characterName"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="e.g. Ash of the Verdant Circuit"
            maxLength={40}
          />
          <p className="small">Guild: {guild}</p>
          <button disabled={!name.trim()} onClick={enterWorld}>
            Enter World
          </button>
        </section>
      )}

      {step === 4 && (
        <section className="panel world-panel">
          <aside className="sidebar">
            <h3>Hall Navigation</h3>
            {hubSections.map((section) => (
              <button
                key={section}
                className={`linkish ${activeSection === section ? 'selected' : ''}`}
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

            <h2>RPG Hub Map</h2>
            <div className="grid hub-grid">
              {hubSections.map((section) => (
                <button key={section} className="card" onClick={() => setActiveSection(section)}>
                  {section}
                </button>
              ))}
            </div>

            <article className="panel section-panel">
              <h3>{activeSection}</h3>
              <p>
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
