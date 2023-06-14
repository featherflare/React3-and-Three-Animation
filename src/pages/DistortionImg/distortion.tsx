import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import img1 from '../../assets/images/distortion/1.jpg'
import img2 from '../../assets/images/distortion/2.jpg'
import spriteImg from '../../assets/images/distortion/nature-sprite.png'

export default function Distortion() {
  const cRef: MutableRefObject<any> = useRef()
  const [size, setSize]: [number[], Dispatch<SetStateAction<number[]>>] =
    useState([innerWidth, innerHeight])

  const sprite = (
    srcImg: any[],
    ctx: CanvasRenderingContext2D,
    frameCount: number
  ) => {
    const img2 = new Image()
    img2.src = srcImg[0]
    const sprite = new Image()
    sprite.src = srcImg[1]
    const img1 = new Image()
    img1.src = srcImg[2]
    const frame = Math.floor(frameCount / 5)

    ctx.clearRect(0, 0, size[0], size[1])
    ctx.drawImage(sprite, -size[0] * frame, 0, size[0] * 23, size[1])
    ctx.globalCompositeOperation = 'source-in'
    ctx.drawImage(img2, 0, 0, size[0], size[1])
    ctx.globalCompositeOperation = 'source-out'
  }

  useEffect(() => {
    var ctx: CanvasRenderingContext2D = cRef.current.getContext('2d')
    var frameCount = 0
    var animationFrameId: number

    const render = () => {
      animationFrameId = requestAnimationFrame(render)
      frameCount++
      sprite([img2, spriteImg, img1], ctx, frameCount)
    }
    render()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [sprite])

  useEffect(() => {
    setSize([innerWidth, innerHeight])
  }, [innerWidth, innerHeight])

  return (
    <>
      <canvas
        ref={cRef}
        width={size[0]}
        height={size[1]}
        style={{
          backgroundImage: `url(${img1})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      ></canvas>
    </>
  )
}
