import { OrbitControls, shaderMaterial, useTexture } from '@react-three/drei'
import flowerImg from '../../assets/images/flower.jpg'
import { useEffect, useMemo, useRef } from 'react'
import { extend, useFrame, useLoader, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { gsap } from 'gsap'

const fragmentShader = `
uniform sampler2D uTexture;
varying vec3 v_position;
varying vec2 vUv;
void main() {
  vec4 image = texture2D(uTexture,vUv);

  vec3 normal = normalize(cross(dFdx(v_position),dFdy(v_position)));

  vec3 light = vec3(0.,0.,1.);

  vec3 prod = clamp(cross(normal,light), 0., 1.0);


  gl_FragColor = image*(1. - prod.r/3. - prod.g/3. - prod.g/3.);
}
`

const vertexShader = `
varying vec2 vUv;
varying vec3 vecPos;
varying vec3 v_position;

void main() {
  vUv = uv;
  vecPos = (modelViewMatrix * vec4(position, 1.0)).xyz;
  v_position = position.xyz;
  gl_Position = projectionMatrix * vec4(vecPos, 1.0);
}

`

export default function ParticleBlobingExperience() {
  const flower = useTexture(flowerImg)
  const pointsRef = useRef()
  const geometryRef = useRef()

  const flagMaterial = useRef()

  const [image] = useLoader(THREE.TextureLoader, [flowerImg])

  const { raycaster, camera } = useThree()

  useFrame((state, delta) => {})

  const data = useMemo(() => ({
    uniforms: {
      uTexture: { value: image },
    },
    fragmentShader,
    vertexShader,
  }))

  useEffect(() => {
    geometryRef.current.computeBoundingBox()
    const array = pointsRef.current.geometry.attributes.position.array
    console.log(pointsRef.current.geometry)
    for (let i = 0; i < array.length; i += 3) {
      const z = array[i + 2]
      array[i + 2] = z + Math.random() * 5
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true
  }, [])

  useFrame(() => {})
  function handlePoint(e) {
    let mouse = {
      x: (e.clientX / innerWidth) * 2 - 1,
      y: -(e.clientY / innerHeight) * 2 + 1,
    }
    raycaster.setFromCamera(mouse, camera)

    const positions = pointsRef.current.geometry.attributes.position.array
    const positionCount = positions.length
    const intersects = raycaster.intersectObject(pointsRef.current)

    if (intersects.length > 0) {
      const { position } = intersects[0].object.geometry.attributes

      // vertice 1
      position.setZ(Math.random() * 100)

      intersects[0].object.geometry.attributes.position.needsUpdate = true
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true
    console.log(intersects)
  }

  return (
    <>
      <OrbitControls />
      <directionalLight color='#ffffff' position={[0, -1, 1]} />
      <directionalLight color='#ffffff' position={[0, 0, -1]} />
      <mesh ref={pointsRef} onPointerMove={(e) => handlePoint(e)}>
        <planeGeometry
          ref={geometryRef}
          args={[500, 500, 38, 38]}
        ></planeGeometry>
        <shaderMaterial ref={flagMaterial} attach='material' {...data} />
      </mesh>
    </>
  )
}
