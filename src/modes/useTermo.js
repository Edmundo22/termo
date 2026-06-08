import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { RESPOSTAS } from '../data/respostas.js'
import { isValidGuess } from '../data/validas.js'
import { normalize } from '../lib/normalize.js'
import { evaluateGuess, bestState } from '../lib/gameLogic.js'
import { createBag } from '../lib/random.js'

const MODE_BOARDS = { individual: 1, dueto: 2, quarteto: 4 }

// Mapeia palavra normalizada -> palavra com acento (para exibir a solução).
const ACCENTED = (() => {
  const map = {}
  for (const w of RESPOSTAS) map[normalize(w)] = w
  return map
})()

const bag = createBag(RESPOSTAS)

export function useTermo(mode) {
  const numBoards = MODE_BOARDS[mode]
  const maxAttempts = numBoards + 5

  const [solutions, setSolutions] = useState([]) // normalizadas
  const [guesses, setGuesses] = useState([])      // normalizadas (uppercase)
  const [current, setCurrent] = useState('')
  const [invalid, setInvalid] = useState(false)
  const [message, setMessage] = useState('')
  const msgTimer = useRef(null)

  const newGame = useCallback(() => {
    setSolutions(bag.draw(numBoards).map(normalize))
    setGuesses([])
    setCurrent('')
    setInvalid(false)
    setMessage('')
  }, [numBoards])

  // Reinicia ao trocar de modo.
  useEffect(() => { newGame() }, [newGame])

  const flash = useCallback((text) => {
    setMessage(text)
    clearTimeout(msgTimer.current)
    msgTimer.current = setTimeout(() => setMessage(''), 1600)
  }, [])

  // Índice em que cada board foi resolvido (-1 se não resolvido).
  const solvedAt = useMemo(
    () =>
      solutions.map((sol) => {
        const idx = guesses.findIndex((g) => g === sol)
        return idx
      }),
    [solutions, guesses]
  )

  const allSolved = solvedAt.length > 0 && solvedAt.every((i) => i >= 0)
  const outOfTries = guesses.length >= maxAttempts
  const gameOver = allSolved || outOfTries
  const won = allSolved

  // Linhas avaliadas por board.
  const boards = useMemo(() => {
    return solutions.map((sol, b) => {
      const sIdx = solvedAt[b]
      const rows = []
      for (let g = 0; g < guesses.length; g++) {
        // Após resolver, este board para de exibir chutes seguintes.
        if (sIdx >= 0 && g > sIdx) break
        const guess = guesses[g]
        const states = evaluateGuess(guess, sol)
        rows.push({ letters: guess.split(''), states })
      }
      const solved = sIdx >= 0
      const showCurrent = !solved && !gameOver
      return {
        rows,
        solved,
        current,
        showCurrent,
        invalid: showCurrent ? invalid : false,
        maxAttempts,
        reveal: ACCENTED[sol] || sol,
      }
    })
  }, [solutions, guesses, solvedAt, current, invalid, gameOver, maxAttempts])

  // Estado de cada tecla por board (para o teclado colorido).
  const keyStates = useMemo(() => {
    const map = {}
    solutions.forEach((sol, b) => {
      const sIdx = solvedAt[b]
      for (let g = 0; g < guesses.length; g++) {
        if (sIdx >= 0 && g > sIdx) break
        const guess = guesses[g]
        const states = evaluateGuess(guess, sol)
        for (let i = 0; i < guess.length; i++) {
          const ch = guess[i]
          if (!map[ch]) map[ch] = []
          map[ch][b] = bestState(map[ch][b], states[i])
        }
      }
    })
    return map
  }, [solutions, guesses, solvedAt])

  const submit = useCallback(() => {
    if (gameOver) return
    if (current.length < 5) {
      setInvalid(true)
      flash('Faltam letras')
      setTimeout(() => setInvalid(false), 600)
      return
    }
    if (!isValidGuess(current)) {
      setInvalid(true)
      flash('Palavra não encontrada')
      setTimeout(() => setInvalid(false), 600)
      return
    }
    setGuesses((prev) => [...prev, normalize(current)])
    setCurrent('')
    setInvalid(false)
  }, [current, gameOver, flash])

  const onKey = useCallback(
    (key) => {
      if (gameOver) return
      if (key === 'ENTER') return submit()
      if (key === 'BACK') return setCurrent((c) => c.slice(0, -1))
      if (/^[A-Z]$/.test(key)) {
        setCurrent((c) => (c.length < 5 ? c + key : c))
      }
    },
    [gameOver, submit]
  )

  // Teclado físico.
  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return
      if (e.key === 'Enter') return onKey('ENTER')
      if (e.key === 'Backspace') return onKey('BACK')
      const ch = normalize(e.key)
      if (ch.length === 1 && /[A-Z]/.test(ch)) onKey(ch)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onKey])

  const displaySolutions = solutions.map((s) => ACCENTED[s] || s)

  return {
    numBoards,
    maxAttempts,
    boards,
    keyStates,
    onKey,
    newGame,
    gameOver,
    won,
    message,
    displaySolutions,
    attemptsUsed: guesses.length,
  }
}
