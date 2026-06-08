import Row from './Row.jsx'

// board = {
//   rows: array de { letters: string[5], states: state[5] } já avaliadas,
//   solved: bool,
//   current: string[5] (linha em digitação, células livres),
//   cursor: índice ativo (ou null),
//   showCurrent: bool,
//   invalid: bool,
//   maxAttempts,
// }
// onSelect: callback ao clicar numa célula da linha atual
export default function Board({ board, onSelect }) {
  const { rows, current, cursor, showCurrent, invalid, maxAttempts, solved } = board
  const total = maxAttempts
  const filled = rows.length
  const blanks = total - filled - (showCurrent ? 1 : 0)

  return (
    <div className={'board' + (solved ? ' solved' : '')}>
      {rows.map((r, i) => (
        <Row key={'r' + i} letters={r.letters} states={r.states} />
      ))}
      {showCurrent && (
        <Row
          key="cur"
          letters={current}
          states={[]}
          invalid={invalid}
          cursor={cursor}
          onSelect={onSelect}
        />
      )}
      {Array.from({ length: Math.max(0, blanks) }).map((_, i) => (
        <Row key={'b' + i} letters={['', '', '', '', '']} states={[]} />
      ))}
    </div>
  )
}
