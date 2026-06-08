// Remove acentos e converte para maiúsculas, para comparação de letras.
// Ex.: "café" -> "CAFE", "maçã" -> "MACA"
const DIACRITICS = /[̀-ͯ]/g

export function normalize(word) {
  return word
    .normalize('NFD')
    .replace(DIACRITICS, '')
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
}

// Converte para maiúsculas mantendo o acento (para exibir a solução correta).
export function upper(word) {
  return word.toUpperCase()
}
