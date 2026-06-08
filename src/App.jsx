import { useState } from 'react'
import Header from './components/Header.jsx'
import Board from './components/Board.jsx'
import Keyboard from './components/Keyboard.jsx'
import GameOver from './components/GameOver.jsx'
import Help from './components/Help.jsx'
import { useTermo } from './modes/useTermo.js'

export default function App() {
  const [mode, setMode] = useState('individual')
  const [help, setHelp] = useState(false)

  const game = useTermo(mode)

  return (
    <>
      <Header
        mode={mode}
        onMode={setMode}
        onHelp={() => setHelp(true)}
      />

      <div className={'app boards-wrap-' + mode}>
        <div className="message-bar">
          {game.message && <div className="message">{game.message}</div>}
        </div>

        <main className={'boards boards-' + mode}>
          {game.boards.map((b, i) => (
            <Board key={i} board={b} onSelect={game.selectCell} />
          ))}
        </main>

        <Keyboard
          keyStates={game.keyStates}
          onKey={game.onKey}
          numBoards={game.numBoards}
        />
      </div>

      {game.gameOver && (
        <GameOver
          won={game.won}
          solutions={game.displaySolutions}
          onNew={game.newGame}
        />
      )}

      {help && <Help onClose={() => setHelp(false)} />}
    </>
  )
}
