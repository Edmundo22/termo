import { normalize } from './normalize.js'

// Estados possíveis de cada letra de um chute.
export const CORRECT = 'correct' // verde: certa na posição certa
export const PRESENT = 'present' // amarelo: existe em outra posição
export const ABSENT = 'absent'   // cinza: não existe

// Avalia um chute contra a solução, com tratamento correto de letras repetidas.
// Recebe strings normalizadas (sem acento, maiúsculas, 5 letras).
// Retorna um array de 5 estados.
export function evaluateGuess(guess, solution) {
  const result = new Array(guess.length).fill(ABSENT)
  const counts = {}

  // Conta letras da solução.
  for (const ch of solution) {
    counts[ch] = (counts[ch] || 0) + 1
  }

  // 1ª passada: marca verdes e consome a contagem.
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === solution[i]) {
      result[i] = CORRECT
      counts[guess[i]]--
    }
  }

  // 2ª passada: marca amarelos enquanto houver letras restantes.
  for (let i = 0; i < guess.length; i++) {
    if (result[i] === CORRECT) continue
    const ch = guess[i]
    if (counts[ch] > 0) {
      result[i] = PRESENT
      counts[ch]--
    }
  }

  return result
}

// Combina o melhor estado de uma letra (CORRECT > PRESENT > ABSENT)
// para colorir o teclado.
export function bestState(a, b) {
  const rank = { [CORRECT]: 3, [PRESENT]: 2, [ABSENT]: 1, undefined: 0 }
  return rank[a] >= rank[b] ? a : b
}

// Garante que comparações usem a forma normalizada.
export function isWin(guess, solution) {
  return normalize(guess) === normalize(solution)
}
