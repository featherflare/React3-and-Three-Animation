import { Canvas } from '@react-three/fiber'
import '../../assets/styles/App.css'
import TemplateR3FExperience from './Experience'

export default function TemplateR3F() {
  const aspect: number = window.innerWidth / window.innerHeight
  return (
    <>
      <Canvas
        className='canvas'
        camera={{
          fov: 60,
          aspect: aspect,
          near: 1,
          far: 1000,
          position: [0, 0, 1],
          rotation: [1.16, -0.12, 0.27],
        }}
      >
        <TemplateR3FExperience />
      </Canvas>
    </>
  )
}
