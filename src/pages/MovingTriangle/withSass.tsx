import { useEffect, useRef, useState } from 'react'
import Repeat from '../../utils/repeatFunc'

export default function WithScss() {
  const canvasRef: any = useRef()
  function addClass() {
    let canvasClass = canvasRef.current.className
    if (canvasClass == 'canvas') {
      canvasRef.current.className = 'canvas is-css'
    } else canvasRef.current.className = 'canvas'
  }
  return (
    <div className='canvas' ref={canvasRef} onClick={addClass}>
      <Repeat numTimes={110}>
        {(i: string) => <div key={i} className={`p${i}`}></div>}
      </Repeat>
    </div>
  )
}
