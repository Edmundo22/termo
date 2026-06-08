import Tile from './Tile.jsx'

// letters: array de 5 caracteres (pode conter '')
// states: array de 5 estados (ou undefined)
// cursor: índice da célula ativa (ou null) — para digitação fora de ordem
// onSelect: callback ao clicar numa célula
export default function Row({ letters, states, invalid, cursor, onSelect }) {
  return (
    <div className={'row' + (invalid ? ' invalid' : '')}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Tile
          key={i}
          letter={letters[i] || ''}
          state={states && states[i]}
          active={cursor === i}
          onClick={onSelect ? () => onSelect(i) : undefined}
        />
      ))}
    </div>
  )
}
