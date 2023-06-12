import { useTexture } from '@react-three/drei'
import smokeImg from '../../assets/images/smoke.png'
import { useLayoutEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import THREE from 'three'

export default function RainExperience() {
  const smoke = useTexture(smokeImg)
  const smokeRefs = useRef([])
  const flashRef: any = useRef()
  const pointsRef: any = useRef()
  smokeRefs.current = []

  function Repeat(props: any) {
    let items = []
    for (let i = 0; i < props.numTimes; i++) {
      items.push(props.children(i))
    }
    return <>{items}</>
  }

  const addToRefs = (el: never) => {
    if (el && !smokeRefs.current.includes(el)) {
      smokeRefs.current.push(el)
    }
  }

  useFrame(() => {
    smokeRefs.current.forEach((el: any) => {
      el.rotation.z -= 0.002
    })

    console.log(pointsRef.current.geometry)

    for (
      let i = 1;
      i < pointsRef.current.geometry.attributes.position.array.length / 3;
      i += 3
    ) {
      pointsRef.current.geometry.attributes.velocity.array[(i - 1) / 3] -=
        0.01 + Math.random() * 0.01
      pointsRef.current.geometry.attributes.position.array[i] +=
        pointsRef.current.geometry.attributes.velocity.array[(i - 1) / 3]
      if (pointsRef.current.geometry.attributes.position.array[i] < -200) {
        pointsRef.current.geometry.attributes.position.array[i] = 200
        pointsRef.current.geometry.attributes.velocity.array[(i - 1) / 3] = 0
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true

    if (Math.random() > 0.93 || flashRef.current.power > 100) {
      if (flashRef.current.power < 100) {
        flashRef.current.position.set(
          Math.random() * 400,
          300 + Math.random() * 200,
          100
        )
      }
      flashRef.current.power = 50 + Math.random() * 500
    }
  })

  const count: number = 15000
  const [positions, velocity] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocity = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      positions[i] = Math.random() * 400 - 200
      positions[i + 1] = Math.random() * 500 - 250
      positions[i + 2] = Math.random() * 400 - 200
      velocity[i] = 0
    }

    return [positions, velocity]
  }, [])

  return (
    <>
      <ambientLight color='#333333' />
      <directionalLight color='#ffeeee' position={[0, 0, 1]} />
      <pointLight
        ref={flashRef}
        color='#062d89'
        position={[200, 300, 100]}
        intensity={30}
        distance={500}
        decay={1.7}
      />
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
            rotation={[1.16, -0.12, Math.random() * 360]}
          >
            <planeGeometry args={[500, 500]} />
            <meshLambertMaterial map={smoke} transparent={true} opacity={0.6} />
          </mesh>
        )}
      </Repeat>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach='attributes-position'
            count={positions.length / 3}
            itemSize={3}
            array={positions}
          />
          <bufferAttribute
            attach='attributes-velocity'
            count={velocity.length}
            itemSize={1}
            array={velocity}
          />
        </bufferGeometry>
        <pointsMaterial color='#aaaaaa' size={0.3} transparent={true} />
      </points>
    </>
  )
}
