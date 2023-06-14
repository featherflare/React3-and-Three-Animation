import '../../assets/styles/movingTriangle.scss'
import WithCanvas from './withCanvas'
import WithScss from './withSass'

export default function MovingTriangle() {
  return (
    <div className='grid'>
      <WithCanvas />
      <WithScss />
    </div>
  )
}
