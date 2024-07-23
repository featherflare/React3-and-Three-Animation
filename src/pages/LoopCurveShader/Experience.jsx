import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { OrbitControls } from '@react-three/drei'
import vertex from './vertex.glsl'
import fragment from './fragment.glsl'

export default function LoopCurveShaderExperience() {
  const smokeRefs = useRef([])
  const flashRef = useRef()
  smokeRefs.current = []

  const addToRefs = (el) => {
    if (el && !smokeRefs.current.includes(el)) {
      smokeRefs.current.push(el)
    }
  }

  useFrame(() => {})

  return (
    <>
      <OrbitControls makeDefault />
      <ambientLight color='#333333' />
      <directionalLight color='#ffeeee' position={[0, 0, 1]} />
      <mesh>
        <planeGeometry args={[1, 1, 64, 64]} />
        <shaderMaterial
          side={THREE.DoubleSide}
          uniforms={{ time: { value: 0.0 } }}
          vertexShader={vertex}
          fragmentShader={fragment}
        />
      </mesh>
    </>
  )
}
