const MODES = [
  { id: 'individual', label: 'TERMO' },
  { id: 'dueto', label: 'DUETO' },
  { id: 'quarteto', label: 'QUARTETO' },
]

export default function Header({ mode, onMode, onToggleTheme, dark }) {
  const current = MODES.find((m) => m.id === mode)
  return (
    <header className="header">
      <div className="header-side header-left">
        <div className="modes">
          {MODES.map((m) => (
            <button
              key={m.id}
              className={'mode-btn' + (mode === m.id ? ' active' : '')}
              onClick={() => onMode(m.id)}
              title={m.label}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>
      <h1 className="title">{current.label}</h1>
      <div className="header-side header-right">
        <button className="icon-btn" onClick={onToggleTheme} title="Tema">
          {dark ? '☀' : '☾'}
        </button>
      </div>
    </header>
  )
}
