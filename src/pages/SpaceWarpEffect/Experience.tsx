import { useMemo, useRef } from 'react'
import starImg from '../../assets/images/star.png'
import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function SpaceExperience() {
  const star = useTexture(starImg)
  const pointsRef: any = useRef()

  const count: number = 6000
  const [positions, velocity] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocity = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      positions[i] = Math.random() * 600 - 300
      positions[i + 1] = Math.random() * 600 - 300
      positions[i + 2] = Math.random() * 600 - 300
      velocity[i] = 0
    }

    return [positions, velocity]
  }, [])

  useFrame(() => {
    for (
      let i = 1;
      i < pointsRef.current.geometry.attributes.position.array.length / 3;
      i += 3
    ) {
      pointsRef.current.geometry.attributes.velocity.array[(i - 1) / 3] += 0.02
      pointsRef.current.geometry.attributes.position.array[i] -=
        pointsRef.current.geometry.attributes.velocity.array[(i - 1) / 3]
      if (pointsRef.current.geometry.attributes.position.array[i] < -200) {
        pointsRef.current.geometry.attributes.position.array[i] = 200
        pointsRef.current.geometry.attributes.velocity.array[(i - 1) / 3] = 0
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <>
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
        <pointsMaterial
          color='#aaaaaa'
          size={0.7}
          map={star}
          transparent={false}
          alphaTest={0.5}
        />
      </points>
    </>
  )
}
