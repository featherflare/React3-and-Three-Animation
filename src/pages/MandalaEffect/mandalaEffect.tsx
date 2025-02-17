import { useEffect, useRef } from 'react'
import '../../assets/styles/App.css'
import { Leva, useControls } from 'leva'
export default function MandalaEffect() {
  const cRef = useRef<HTMLCanvasElement | null>(null)

  const { radius, period, amp, count } = useControls({
    radius: { value: 200, min: 100, max: 300, step: 1 },
    period: { value: 15, min: 0, max: 50, step: 1 },
    amp: { value: 4, min: 0, max: 100, step: 1 },
    count: { value: 20, min: 1, max: 50, step: 1 },
  })

  const draw = (
    c: CanvasRenderingContext2D,
    radius: number,
    color: string,
    offset: number
  ) => {
    const num: number = 300
    const centerX: number = innerWidth / 2
    const centerY: number = innerHeight / 2

    c.fillStyle = color
    c.beginPath()

    for (var i = 0; i < num; i++) {
      const teta = (i * 2 * Math.PI) / num
      const varRadius = radius + amp * Math.sin(teta * period + offset)
      const x = centerX + varRadius * Math.cos(teta)
      const y = centerY + varRadius * Math.sin(teta)

      if (i === 0) c.moveTo(x, y)
      else c.lineTo(x, y)
    }

    c.closePath()
    c.fill()
  }

  useEffect(() => {
    const canvas = cRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    let time = 0
    const render = () => {
      time++
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < count; i++) {
        draw(
          ctx,
          radius - i * (radius / count),
          `hsl(${i * 5},50%,50%)`,
          (-i * time) / 100
        )
      }
      requestAnimationFrame(render)
    }

    render()

    return () => window.removeEventListener('resize', resizeCanvas)
  }, [radius, period, amp, count])

  return (
    <>
      <Leva collapsed={false} oneLineLabels={true} />
      <canvas
        width={innerWidth}
        height={innerHeight}
        className='canvas'
        ref={cRef}
      ></canvas>
    </>
  )
}
