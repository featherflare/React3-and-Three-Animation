import { Canvas } from '@react-three/fiber'
import SVGExperience from './Experience'
import '../../assets/styles/App.css'

export default function SvgTo3D() {
  const aspect: number = window.innerWidth / window.innerHeight

  return (
    <>
      <Canvas
        className='canvas'
        camera={{
          fov: 90,
          aspect: aspect,
          near: 1,
          far: 3000,
          position: [0, 0, 500],
        }}
      >
        <SVGExperience />
      </Canvas>
    </>
  )
}
