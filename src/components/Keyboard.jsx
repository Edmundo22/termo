const ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACK'],
]

// keyStates: { LETRA: [estadoBoard0, estadoBoard1, ...] }
export default function Keyboard({ keyStates, onKey, numBoards }) {
  return (
    <div className="keyboard">
      {ROWS.map((row, ri) => (
        <div className="kb-row" key={ri}>
          {row.map((k) => {
            const isAction = k === 'ENTER' || k === 'BACK'
            const segs = keyStates[k] || []
            return (
              <button
                key={k}
                className={'key' + (isAction ? ' key-action' : '')}
                onClick={() => onKey(k)}
              >
                {!isAction && segs.length > 0 ? (
                  <span className="key-segs">
                    {Array.from({ length: numBoards }).map((_, i) => (
                      <span
                        key={i}
                        className={'seg ' + (segs[i] || 'none')}
                      />
                    ))}
                  </span>
                ) : null}
                <span className="key-label">
                  {k === 'BACK' ? '⌫' : k === 'ENTER' ? '⏎' : k}
                </span>
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}
