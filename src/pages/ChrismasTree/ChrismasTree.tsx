import { MutableRefObject, useEffect, useRef } from 'react'
import '../../assets/styles/App.css'

export default function ChrismasTree() {
  const cRef: MutableRefObject<any> = useRef()

  function draw(c: CanvasRenderingContext2D, t: number) {
    c.clearRect(0, 0, 900, 600)

    let m = 0
    let n = 0
    for (var i = 0; i < 100; i++) {
      let teta = i * t + t
      let x = innerWidth / 2 - 150 + 2 * i * Math.sin(teta)
      let y = 150 + 1 * i * Math.cos(teta) + 3 * i
      c.fillStyle = `hsl(${10 * (i % 10)},100%,50%)`
      c.beginPath()
      c.arc(x, y, 10, 0, 2 * Math.PI)
      c.closePath()
      c.fill()
      if (i !== 0) {
        c.strokeStyle = 'green'
        c.beginPath()
        c.moveTo(m, n)
        c.lineTo(x, y)
        c.closePath()
        c.stroke()
      }
      m = x
      n = y
    }

    let angle = 0
    for (var i = 0; i < 4; i++) {
      angle = (i * 4 * Math.PI) / 3 + Math.PI / 3
      let x = innerWidth / 2 - 150 + 50 * Math.sin(angle) * Math.sin(18 * t)
      let y = 100 + 50 * Math.cos(angle)
      if (i !== 0) {
        c.beginPath()
        c.moveTo(m, n)
        c.lineTo(x, y)
        c.closePath()
        c.stroke()
      }
      m = x
      n = y
    }

    for (var i = 0; i < 4; i++) {
      angle = (i * 4 * Math.PI) / 3
      let x = innerWidth / 2 - 150 + 50 * Math.sin(angle) * Math.sin(18 * t)
      let y = 100 + 50 * Math.cos(angle)
      if (i !== 0) {
        c.beginPath()
        c.moveTo(m, n)
        c.lineTo(x, y)
        c.closePath()
        c.stroke()
      }
      m = x
      n = y
    }
  }

  useEffect(() => {
    const c: CanvasRenderingContext2D = cRef.current.getContext('2d')

    var t = 0
    function render() {
      t = t + 0.001
      requestAnimationFrame(render)

      draw(c, t)
    }

    render()
  }, [draw])
  return (
    <>
      <canvas width={900} height={600} ref={cRef} className='canvas'></canvas>
    </>
  )
}
