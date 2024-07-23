import { Canvas } from '@react-three/fiber'
import '../../assets/styles/App.css'
import LoopCurveShaderExperience from './Experience'
import { OrbitControls } from '@react-three/drei'

export default function LoopCurveShader() {
  const aspect: number = window.innerWidth / window.innerHeight
  return (
    <>
      <Canvas
        className='canvas'
        camera={{
          fov: 70,
          aspect: aspect,
          near: 0.001,
          far: 1000,
          position: [0, 0, 32],
        }}
      >
        <LoopCurveShaderExperience />
      </Canvas>
    </>
  )
}
