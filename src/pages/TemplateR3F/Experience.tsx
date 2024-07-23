import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { OrbitControls } from '@react-three/drei'

export default function TemplateR3FExperience() {
  const smokeRefs = useRef([])
  smokeRefs.current = []

  const addToRefs = (el: never) => {
    if (el && !smokeRefs.current.includes(el)) {
      smokeRefs.current.push(el)
    }
  }

  useFrame(() => {})

  function OrbitRenderer() {
    let renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerWidth)

    return <OrbitControls domElement={renderer.domElement} />
  }

  return (
    <>
      <ambientLight color='#333333' />
      <directionalLight color='#ffeeee' position={[0, 0, 1]} />
      <OrbitRenderer />
      <mesh>
        <planeGeometry args={[1, 1, 64, 64]} />
        <shaderMaterial
          side={THREE.DoubleSide}
          uniforms={{ time: { value: 0.0 } }}
          vertexShader=''
          fragmentShader=''
        />
      </mesh>
    </>
  )
}
