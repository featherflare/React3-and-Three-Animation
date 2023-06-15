import { MutableRefObject, useEffect, useRef } from 'react'
import '../../assets/styles/App.css'
export default function MandalaEffect() {
  const cRef: MutableRefObject<any> = useRef()
  const draw = (c: CanvasRenderingContext2D) => {}
  useEffect(() => {
    const ctx: CanvasRenderingContext2D = cRef.current.getContext('2d')
    draw(ctx)
  }, [draw])
  return (
    <>
      <canvas className='canvas' ref={cRef}></canvas>
    </>
  )
}
