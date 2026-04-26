import { useEffect, useMemo, useState } from 'react'

const guilds = ['Fire Guild', 'Water Guild', 'Earth Guild', 'Air Guild']
const saveKey = 'gms-cyber-hall-profile'
const stepAmount = 2.5

const mapDefinitions = {
  overworld: {
    title: 'Overworld Map',
    nodes: [
      { id: 'hall', name: 'Hall of Great Works', x: 50, y: 48, tone: 'hall', type: 'map', targetMap: 'hall' },
      { id: 'civilx', name: 'CivilX Lab', x: 84, y: 28, tone: 'lab', type: 'map', targetMap: 'civilx' },
      { id: 'fire', name: 'Fire Temple', x: 20, y: 22, tone: 'fire', type: 'map', targetMap: 'fireTemple' },
      { id: 'water', name: 'Water Temple', x: 80, y: 20, tone: 'water', type: 'map', targetMap: 'waterTemple' },
      { id: 'earth', name: 'Earth Temple', x: 20, y: 78, tone: 'earth', type: 'map', targetMap: 'earthTemple' },
      { id: 'air', name: 'Air Temple', x: 80, y: 78, tone: 'air', type: 'map', targetMap: 'airTemple' },
      { id: 'course', name: 'Course Academy', x: 50, y: 10, tone: 'courses', type: 'page' }
    ]
  },
  hall: {
    title: 'Hall of Great Works Interior',
    nodes: [
      {
        id: 'music',
        name: 'Music Hall',
        x: 20,
        y: 26,
        tone: 'music',
        type: 'page',
        prompt: 'Enter Music Hall?',
        actionLabel: 'Enter Music Hall'
      },
      { id: 'store', name: 'Store', x: 80, y: 28, tone: 'store', type: 'page', prompt: 'Browse Store?', actionLabel: 'Browse Store' },
      {
        id: 'shows',
        name: 'Shows / Booking Desk',
        x: 52,
        y: 52,
        tone: 'shows',
        type: 'page',
        prompt: 'View Shows?',
        actionLabel: 'View Shows'
      },
      {
        id: 'course-link',
        name: 'Courses Portal',
        x: 18,
        y: 76,
        tone: 'courses',
        type: 'page',
        prompt: 'Go to Courses?',
        actionLabel: 'Go to Courses'
      },
      {
        id: 'hall-exit',
        name: 'Exit to Overworld',
        x: 80,
        y: 78,
        tone: 'exit',
        type: 'map',
        targetMap: 'overworld',
        prompt: 'Return to Overworld?',
        actionLabel: 'Exit Hall'
      }
    ]
  },
  civilx: {
    title: 'CivilX Lab Interior',
    nodes: [
      { id: 'station-a', name: 'Project Station Alpha', x: 26, y: 26, tone: 'lab', type: 'quest' },
      { id: 'station-b', name: 'Project Station Beta', x: 76, y: 28, tone: 'lab', type: 'quest' },
      { id: 'quest-board', name: 'Quest Board Placeholder', x: 48, y: 58, tone: 'lab', type: 'quest' },
      { id: 'civilx-exit', name: 'Back to Overworld Exit', x: 78, y: 82, tone: 'exit', type: 'map', targetMap: 'overworld' }
    ]
  },
  fireTemple: {
    title: 'Fire Temple Interior',
    nodes: [
      { id: 'fire-quest', name: 'Fire Projects / Quests Placeholder', x: 48, y: 42, tone: 'fire', type: 'quest' },
      { id: 'fire-exit', name: 'Back to Overworld Exit', x: 76, y: 80, tone: 'exit', type: 'map', targetMap: 'overworld' }
    ]
  },
  waterTemple: {
    title: 'Water Temple Interior',
    nodes: [
      { id: 'water-quest', name: 'Water Projects / Quests Placeholder', x: 48, y: 42, tone: 'water', type: 'quest' },
      { id: 'water-exit', name: 'Back to Overworld Exit', x: 76, y: 80, tone: 'exit', type: 'map', targetMap: 'overworld' }
    ]
  },
  earthTemple: {
    title: 'Earth Temple Interior',
    nodes: [
      { id: 'earth-quest', name: 'Earth Projects / Quests Placeholder', x: 48, y: 42, tone: 'earth', type: 'quest' },
      { id: 'earth-exit', name: 'Back to Overworld Exit', x: 76, y: 80, tone: 'exit', type: 'map', targetMap: 'overworld' }
    ]
  },
  airTemple: {
    title: 'Air Temple Interior',
    nodes: [
      { id: 'air-quest', name: 'Air Projects / Quests Placeholder', x: 48, y: 42, tone: 'air', type: 'quest' },
      { id: 'air-exit', name: 'Back to Overworld Exit', x: 76, y: 80, tone: 'exit', type: 'map', targetMap: 'overworld' }
    ]
  }
}

const clamp = (value, min, max) => Math.max(min, Math.min(max, value))

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
  const [currentMap, setCurrentMap] = useState('overworld')
  const [activeSection, setActiveSection] = useState('Hall of Great Works')
  const [playerPosition, setPlayerPosition] = useState({ x: 50, y: 52 })
  const [dialogueNode, setDialogueNode] = useState(null)
  const [navOpen, setNavOpen] = useState(false)

  const currentMapDef = mapDefinitions[currentMap]

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

    for (const location of currentMapDef.nodes) {
      const distance = Math.hypot(playerPosition.x - location.x, playerPosition.y - location.y)
      if (distance < closestDistance) {
        closestDistance = distance
        closest = location
      }
    }

    return closestDistance <= 11 ? closest : null
  }, [playerPosition, currentMapDef.nodes])

  const openDialogue = (node) => {
    setDialogueNode(node)
  }

  const closeDialogue = () => setDialogueNode(null)

  const handleNodeAction = (node, action) => {
    if (action === 'yes' && node.type === 'map' && node.targetMap) {
      setCurrentMap(node.targetMap)
      setPlayerPosition({ x: 50, y: 52 })
      setActiveSection(node.name)
    }

    if (action === 'view') {
      setActiveSection(node.name)
    }

    if (action === 'quest') {
      setActiveSection(`${node.name} — Join quest placeholder`)
    }

    closeDialogue()
  }

  useEffect(() => {
    setDialogueNode(null)
  }, [currentMap])

  useEffect(() => {
    if (step !== 4) return

    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase()
      if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd', 'enter'].includes(key)) {
        event.preventDefault()
      }

      if (dialogueNode && key === 'enter') {
        return
      }

      if (key === 'arrowup' || key === 'w') movePlayer(0, -stepAmount)
      if (key === 'arrowdown' || key === 's') movePlayer(0, stepAmount)
      if (key === 'arrowleft' || key === 'a') movePlayer(-stepAmount, 0)
      if (key === 'arrowright' || key === 'd') movePlayer(stepAmount, 0)
      if (key === 'enter' && nearbyLocation) openDialogue(nearbyLocation)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [step, nearbyLocation, dialogueNode])

  return (
    <div className="app-shell arcade-screen">
      <header className="arcade-panel banner">
        <p className="kicker">Great Medicine Show RPG</p>
        <h1 className="glyph-title">Hall of Great Works</h1>
        <div className="glowing-divider" />
      </header>

      {step === 1 && (
        <section className="arcade-panel intro-panel">
          <h2 className="glyph-title">Welcome, Seeker</h2>
          <p className="arcade-copy">Begin your journey through arcane halls, elemental temples, and project realms.</p>
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
          <button className="arcade-button nav-toggle" onClick={() => setNavOpen((value) => !value)}>
            {navOpen ? 'Hide Navigation' : 'Show Navigation'}
          </button>

          <aside className={`sidebar arcade-panel ${navOpen ? 'open' : ''}`}>
            <h3 className="glyph-title">Map Navigation</h3>
            <div className="glowing-divider" />
            <p className="small">Current: {currentMapDef.title}</p>
            {currentMapDef.nodes.map((section) => (
              <button
                key={section.id}
                className={`arcade-button linkish ${activeSection === section.name ? 'selected' : ''}`}
                onClick={() => {
                  setActiveSection(section.name)
                  setNavOpen(false)
                }}
              >
                {section.name}
              </button>
            ))}
          </aside>

          <div className="world-content">
            <div className="status-line">
              <span>{name}</span>
              <span>{guild}</span>
              <span>{currentMapDef.title}</span>
            </div>

            <h2 className="glyph-title">{currentMapDef.title}</h2>
            <div className="glowing-divider" />

            <div className={`rpg-map ${currentMap === 'hall' ? 'map-hall' : ''}`} role="group" aria-label="2D RPG world map">
              <div className="terrain terrain-forest" />
              <div className="terrain terrain-ruins" />
              <div className="terrain terrain-water" />
              <div className="path-line path-main" />
              <div className="path-line path-cross" />
              {currentMap === 'hall' && (
                <>
                  <div className="hall-lane hall-lane-left" />
                  <div className="hall-lane hall-lane-right" />
                  <div className="hall-crystal" />
                </>
              )}

              {currentMapDef.nodes.map((location) => (
                <button
                  key={location.id}
                  className={`map-node temple-card tone-${location.tone} ${activeSection === location.name ? 'selected' : ''}`}
                  style={{ left: `${location.x}%`, top: `${location.y}%`, transform: 'translate(-50%, -50%)' }}
                  onClick={() => openDialogue(location)}
                >
                  <span className="node-label">{location.name}</span>
                </button>
              ))}

              <div className="player-avatar" style={{ left: `${playerPosition.x}%`, top: `${playerPosition.y}%` }}>
                <span className="player-core" />
              </div>

              {nearbyLocation && !dialogueNode && (
                <button className="enter-prompt arcade-button" onClick={() => openDialogue(nearbyLocation)}>
                  {nearbyLocation.prompt || `Enter ${nearbyLocation.name}`}
                </button>
              )}

              {dialogueNode && (
                <div className="dialogue-bubble" role="dialog" aria-label="Interaction dialogue">
                  <p>{dialogueNode.prompt || `Interact with ${dialogueNode.name}?`}</p>
                  <div className="dialogue-actions">
                    {dialogueNode.type === 'map' ? (
                      <>
                        <button className="arcade-button" onClick={() => handleNodeAction(dialogueNode, 'yes')}>
                          Yes
                        </button>
                        <button className="arcade-button" onClick={closeDialogue}>
                          Not now
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="arcade-button" onClick={() => handleNodeAction(dialogueNode, 'view')}>
                          {dialogueNode.actionLabel || 'View page'}
                        </button>
                        <button className="arcade-button" onClick={() => handleNodeAction(dialogueNode, 'quest')}>
                          Join quest placeholder
                        </button>
                        <button className="arcade-button" onClick={closeDialogue}>
                          Not now
                        </button>
                      </>
                    )}
                  </div>
                </div>
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
                Placeholder content for <strong>{activeSection}</strong>. This panel will evolve into full rooms,
                pages, and quests in future updates.
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
