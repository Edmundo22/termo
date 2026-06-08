const MODES = [
  { id: 'individual', label: 'termo' },
  { id: 'dueto', label: 'dueto' },
  { id: 'quarteto', label: 'quarteto' },
]

export default function Header({ mode, onMode, onHelp }) {
  const current = MODES.find((m) => m.id === mode)
  return (
    <>
      <div className="topbar">
        <div className="topbar-inner">
          <nav className="modes">
            {MODES.map((m) => (
              <button
                key={m.id}
                className={'mode-btn' + (mode === m.id ? ' active' : '')}
                onClick={() => onMode(m.id)}
              >
                {m.label}
              </button>
            ))}
          </nav>
          <button className="topbar-icon" onClick={onHelp} title="Como jogar">
            &#9432;
          </button>
        </div>
      </div>

      <div className="subhead">
        <div className="subhead-side">
          <button className="box-btn" onClick={onHelp} title="Como jogar">?</button>
        </div>
        <h1 className="title">{current.label.toUpperCase()}</h1>
        <div className="subhead-side subhead-right" />
      </div>
    </>
  )
}
