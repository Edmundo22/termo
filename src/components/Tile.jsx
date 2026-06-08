export default function Tile({ letter, state }) {
  const cls = ['tile']
  if (state) cls.push(state, 'rv')
  if (letter) cls.push('filled')
  return <div className={cls.join(' ')}>{letter}</div>
}
