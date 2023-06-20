import { Canvas } from '@react-three/fiber'
import EarthMapExperience from './Experience'
import '../../assets/styles/App.css'

export default function EarthMap() {
  const aspect: number = window.innerWidth / window.innerHeight

  return (
    <>
      <Canvas
        className='canvas'
        camera={{
          fov: 40,
          aspect: aspect,
          near: 1,
          far: 1000,
          position: [0, -100, 10],
        }}
      >
        <EarthMapExperience />
      </Canvas>
      {/* <div id='container'>
        <div id='one'></div>
      </div> */}
    </>
  )
}
