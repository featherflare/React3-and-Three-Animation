import { MutableRefObject, useEffect, useRef, useState } from 'react'
import '../../assets/styles/App.css'
import DatGui, { DatNumber } from 'react-dat-gui'
export default function MandalaEffect() {
  const cRef: MutableRefObject<any> = useRef()

  const [state, setState] = useState<any>({
    data: {
      radius: 200,
      period: 15,
      amp: 4,
      count: 20,
    },
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
      var varRadius: number =
        radius + state.data.amp * Math.sin(teta * state.data.period + offset)
      const x = centerX + varRadius * Math.cos(teta)
      const y = centerY + varRadius * Math.sin(teta)

      if (i === 0) c.moveTo(x, y)
      else c.lineTo(x, y)
    }

    c.closePath()
    c.fill()
  }

  useEffect(() => {
    const ctx: CanvasRenderingContext2D = cRef.current.getContext('2d')

    var time = 0
    const render = () => {
      time++
      ctx.clearRect(0, 0, innerWidth, innerHeight)
      for (var i = 0; i < 20; i++) {
        var color = i % 2 === 1 ? 'white' : 'black'
        draw(
          ctx,
          state.data.radius - i * (state.data.radius / state.data.count),
          `hsl(${i * 5},50%,50%)`,
          (-i * time) / 100
        )
      }
      requestAnimationFrame(render)
    }

    render()
  }, [draw])

  const handleUpdate = (newData: any) => {
    setState((prevState: any) => ({
      data: { ...prevState.data, ...newData },
    }))
  }

  return (
    <>
      <DatGui data={state.data} onUpdate={handleUpdate} className='gui'>
        <DatNumber path='radius' label='Radius' min={100} max={200} step={1} />
        <DatNumber path='period' label='period' min={0} max={50} step={1} />
        <DatNumber path='amp' label='amp' min={0} max={100} step={1} />
        <DatNumber path='count' label='count' min={0} max={100} step={1} />
      </DatGui>
      <canvas
        width={innerWidth}
        height={innerHeight}
        className='canvas'
        ref={cRef}
      ></canvas>
    </>
  )
}
