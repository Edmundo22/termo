export default function GameOver({ won, solutions, onNew }) {
  return (
    <div className="overlay">
      <div className="modal">
        <h2>{won ? '🎉 Você acertou!' : '😕 Não foi dessa vez'}</h2>
        <p className="modal-sub">
          {won ? 'Mandou bem!' : 'A(s) palavra(s) era(m):'}
        </p>
        <div className="solutions">
          {solutions.map((s, i) => (
            <span key={i} className="sol-word">{s.toUpperCase()}</span>
          ))}
        </div>
        <button className="primary-btn" onClick={onNew}>Jogar novamente</button>
      </div>
    </div>
  )
}
