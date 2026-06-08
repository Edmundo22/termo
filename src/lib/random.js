// Sorteio de palavras sem repetir até esgotar a lista.
// Mantém um "saco" embaralhado por modo; quando esvazia, reembaralha.

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function createBag(words) {
  let bag = shuffle(words)
  return {
    // Retorna `count` palavras distintas.
    draw(count) {
      const picked = []
      while (picked.length < count) {
        if (bag.length === 0) bag = shuffle(words)
        const w = bag.pop()
        if (!picked.includes(w)) picked.push(w)
      }
      return picked
    },
  }
}
