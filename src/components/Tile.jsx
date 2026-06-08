export default function Tile({ letter, state, active, onClick }) {
  const cls = ['tile']
  if (state) cls.push(state, 'rv')
  if (letter) cls.push('filled')
  if (active) cls.push('active')
  if (onClick) cls.push('selectable')
  return (
    <div className={cls.join(' ')} onClick={onClick}>
      {letter}
    </div>
  )
}
