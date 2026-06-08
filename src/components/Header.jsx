const MODES = [
  { id: 'individual', label: 'Termo' },
  { id: 'dueto', label: 'Dueto' },
  { id: 'quarteto', label: 'Quarteto' },
]

export default function Header({ mode, onMode, onToggleTheme, dark }) {
  return (
    <header className="header">
      <h1 className="title">TERMO</h1>
      <div className="modes">
        {MODES.map((m) => (
          <button
            key={m.id}
            className={'mode-btn' + (mode === m.id ? ' active' : '')}
            onClick={() => onMode(m.id)}
          >
            {m.label}
          </button>
        ))}
      </div>
      <button className="icon-btn" onClick={onToggleTheme} title="Tema">
        {dark ? '☀' : '☾'}
      </button>
    </header>
  )
}
