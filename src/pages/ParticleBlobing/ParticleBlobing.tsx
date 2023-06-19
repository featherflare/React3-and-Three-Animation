import { Canvas } from '@react-three/fiber'
import ParticleBlobingExperience from './Experience'

export default function ParticleBlobing() {
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
          position: [0, 0, 200],
        }}
      >
        <ParticleBlobingExperience />
      </Canvas>
    </>
  )
}
