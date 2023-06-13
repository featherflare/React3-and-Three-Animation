import Repeat from '../../utils/repeatFunc'
import smokeImg from '../../assets/images/smoke.png'
import { useRef } from 'react'
import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { BlendFunction, KernelSize } from 'postprocessing'

export default function NebularExperience() {
  const smoke = useTexture(smokeImg)
  const smokeRefs = useRef([])
  smokeRefs.current = []

  const addToRefs = (el: never) => {
    if (el && !smokeRefs.current.includes(el)) {
      smokeRefs.current.push(el)
    }
  }

  useFrame(() => {
    smokeRefs.current.forEach((el: any) => {
      el.rotation.z -= 0.001
    })
  })

  return (
    <>
      <EffectComposer renderPriority={0.1}>
        <Bloom
          blendFunction={BlendFunction.COLOR_DODGE}
          kernelSize={KernelSize.SMALL}
          luminanceThreshold={0.3}
          luminanceSmoothing={0.75}
          mipmapBlur
          intensity={1.5}
        />
      </EffectComposer>
      <ambientLight color='#555555' />
      <directionalLight color='#ff8c19' position={[0, 0, 1]} />
      <Repeat numTimes={25}>
        {(j: string) => (
          <mesh
            ref={addToRefs}
            key={j}
            position={[
              Math.random() * 800 - 400,
              500,
              Math.random() * 500 - 450,
            ]}
            rotation={[1.16, -0.12, Math.random() * 2 * Math.PI]}
          >
            <planeGeometry args={[500, 500]} />
            <meshLambertMaterial map={smoke} transparent={true} opacity={0.6} />
          </mesh>
        )}
      </Repeat>
      <fogExp2 color='#03544e' density={0.001} />
      <pointLight
        color='#cc6600'
        position={[200, 300, 100]}
        intensity={50}
        distance={450}
        decay={1.7}
      />
      <pointLight
        color='#d8547e'
        position={[100, 300, 100]}
        intensity={50}
        distance={450}
        decay={1.7}
      />
      <pointLight
        color='#3677ac'
        position={[300, 300, 200]}
        intensity={50}
        distance={450}
        decay={1.7}
      />
    </>
  )
}
