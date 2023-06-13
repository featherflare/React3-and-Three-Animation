import { Canvas } from '@react-three/fiber'
import SpaceExperience from './Experience'
import '../../assets/styles/App.css'

export default function Space() {
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
          rotation: [Math.PI / 2, 0, 0],
        }}
      >
        <SpaceExperience />
      </Canvas>
    </>
  )
}
