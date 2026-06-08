export default function Help({ onClose }) {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal modal-help" onClick={(e) => e.stopPropagation()}>
        <h2>Como jogar</h2>
        <p className="modal-sub">Descubra a palavra certa em 6 tentativas.</p>
        <ul className="help-list">
          <li>Cada tentativa precisa ser uma palavra válida de 5 letras.</li>
          <li>Você digita sem acento; ao acertar, a célula mostra a letra acentuada.</li>
          <li>As cores mostram o quão perto você está da palavra.</li>
        </ul>
        <div className="help-examples">
          <div className="help-row">
            <span className="tile correct">T</span>
            <span className="tile">U</span>
            <span className="tile">R</span>
            <span className="tile">M</span>
            <span className="tile">A</span>
          </div>
          <p>A letra <b>T</b> faz parte da palavra e está na posição correta.</p>
          <div className="help-row">
            <span className="tile">V</span>
            <span className="tile present">I</span>
            <span className="tile">D</span>
            <span className="tile">R</span>
            <span className="tile">O</span>
          </div>
          <p>A letra <b>I</b> faz parte da palavra, mas em outra posição.</p>
          <div className="help-row">
            <span className="tile">P</span>
            <span className="tile">E</span>
            <span className="tile absent">D</span>
            <span className="tile">R</span>
            <span className="tile">A</span>
          </div>
          <p>A letra <b>D</b> não faz parte da palavra.</p>
        </div>
        <p className="modal-sub">
          Nos modos <b>Dueto</b> e <b>Quarteto</b> você descobre 2 ou 4 palavras ao
          mesmo tempo, com tentativas extras. Sem limite diário!
        </p>
        <button className="primary-btn" onClick={onClose}>Jogar</button>
      </div>
    </div>
  )
}
