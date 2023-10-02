import { Canvas } from '@react-three/fiber'
import WaveReflectEffectExperience from './Experience'

export default function WaveAndReflectEffect() {
  const aspect: number = window.innerWidth / window.innerHeight
  return (
    <>
      <Canvas
        className='canvas'
        camera={{
          fov: 70,
          aspect: aspect,
          near: 0.001,
          far: 100,
          position: [0, 0, 1],
        }}
      >
        <WaveReflectEffectExperience />
      </Canvas>
    </>
  )
}
