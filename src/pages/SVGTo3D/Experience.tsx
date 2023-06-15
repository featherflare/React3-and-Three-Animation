import { OrbitControls, useTexture } from '@react-three/drei'
import particleImg from '../../assets/images/particle.png'
import { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import arrow from '../../assets/images/arrow.svg'
// import close from '../../assets/images/close.svg'
// import place from '../../assets/images/place.svg'

export default function SVGExperience() {
  const size = 50

  const [imageCoords, setImageCoords] = useState<number[][]>([])

  const imgload = (c: CanvasRenderingContext2D, imgSrc: string) => {
    const img = new Image()
    const coords: number[][] = []
    img.src = imgSrc
    img.onload = () => {
      c.clearRect(0, 0, size, size)
      c.drawImage(img, 0, 0, size, size)
      let data = c.getImageData(0, 0, size, size)
      for (var y = 0; y < size; y++) {
        for (var x = 0; x < size; x++) {
          var alpha = data.data[(size * y + x) * 4 + 3]
          if (alpha > 0) {
            // console.log([10 * (x - size / 2), 10 * (size / 2 - y)])
            coords.push([10 * (x - size / 2), 10 * (size / 2 - y)])
          }
        }
      }
      setImageCoords(coords)
      //   if (imageCoords.length > 10000) imageCoords.length = 10000
    }
  }

  useEffect(() => {
    let canvas = document.createElement('canvas')
    let ctx: any = canvas.getContext('2d')
    canvas.width = size
    canvas.height = size
    canvas.classList.add('tempcanvas')
    document.getElementById('root').appendChild(canvas)
    imgload(ctx, arrow)
  }, [])

  const particle = useTexture(particleImg)
  const pointsRef: MutableRefObject<any> = useRef()

  const [positions, color] = useMemo(() => {
    const positions = new Float32Array(3540 * 3)
    const color = new Float32Array(3540 * 3)
    imageCoords.forEach((el: number[], i: number) => {
      positions[i] = el[0]
      positions[i + 1] = el[1]
      positions[i + 2] = Math.random() * 1
      color[i] = Math.random()
      color[i + 1] = Math.random()
      color[i + 2] = Math.random()
    })
    console.log(positions, color)
    return [positions, color]
  }, [imageCoords])

  // console.log(imageCoords)

  useEffect(() => {})

  useFrame(() => {
    imageCoords.forEach((el: number[], i: number) => {})
    // console.log(pointsRef.current.geometry.attributes.position)
    pointsRef.current.geometry.attributes.position.needsUpdate = true
    pointsRef.current.geometry.attributes.color.needsUpdate = true
  })

  return (
    <>
      <OrbitControls />
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach='attributes-position'
            count={3540}
            itemSize={3}
            array={positions}
          />
          <bufferAttribute
            attach='attributes-color'
            count={3540}
            itemSize={3}
            array={color}
          />
        </bufferGeometry>
        <pointsMaterial
          size={5}
          vertexColors
          transparent={true}
          alphaTest={0.5}
          map={particle}
        />
      </points>
    </>
  )
}
