import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Board from './components/Board.jsx'
import Keyboard from './components/Keyboard.jsx'
import GameOver from './components/GameOver.jsx'
import Help from './components/Help.jsx'
import { useTermo } from './modes/useTermo.js'

export default function App() {
  const [mode, setMode] = useState('individual')
  const [dark, setDark] = useState(() => localStorage.getItem('termo-dark') !== 'false')
  const [help, setHelp] = useState(false)

  const game = useTermo(mode)

  useEffect(() => {
    document.body.classList.toggle('light', !dark)
    localStorage.setItem('termo-dark', String(dark))
  }, [dark])

  return (
    <>
      <Header
        mode={mode}
        onMode={setMode}
        onToggleTheme={() => setDark((d) => !d)}
        onHelp={() => setHelp(true)}
        dark={dark}
      />

      <div className={'app boards-wrap-' + mode}>
        <div className="message-bar">
          {game.message && <div className="message">{game.message}</div>}
        </div>

        <main className={'boards boards-' + mode}>
          {game.boards.map((b, i) => (
            <Board key={i} board={b} />
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
