import Row from './Row.jsx'

// board = {
//   rows: array de { letters: string[5], states: state[5] } já avaliadas,
//   solved: bool,
//   current: string (linha em digitação, ou ''),
//   showCurrent: bool,
//   invalid: bool,
//   maxAttempts,
//   reveal: string (solução para exibir quando perdeu)
// }
export default function Board({ board }) {
  const { rows, current, showCurrent, invalid, maxAttempts, solved } = board
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
          letters={current.padEnd(5).split('')}
          states={[]}
          invalid={invalid}
        />
      )}
      {Array.from({ length: Math.max(0, blanks) }).map((_, i) => (
        <Row key={'b' + i} letters={['', '', '', '', '']} states={[]} />
      ))}
    </div>
  )
}
