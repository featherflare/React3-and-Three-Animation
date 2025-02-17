import { Debug, Physics, useBox, usePlane } from '@react-three/cannon'
import { OrbitControls } from '@react-three/drei'
import { RefObject, useRef } from 'react'
import { Mesh } from 'three'

interface SphereProps {
  position?: [number, number, number]
  color?: string
  angularVelocity?: [number, number, number]
  angularDamping?: number
  velocity?: [number, number, number]
  friction?: number
  restitution?: number
}

function Sphere({
  position = [0, 20, 0],
  color = 'red',
  angularVelocity,
  angularDamping,
  velocity,
  friction,
  restitution,
}: SphereProps) {
  const [ref, api] = useBox(() => ({
    position: position,
    mass: 2,
    type: 'Dynamic',
    args: [1.5, 1.125, 0.032],
    angularVelocity: angularVelocity,
    angularDamping: angularDamping,
    velocity,
    linearDamping: friction,
    restitution,
    onCollide: (e) => {
      api.applyImpulse([Math.random() * 0.5, 0, Math.random() * 0.5], [0, 0, 0])
    },
  }))

  return (
    <mesh ref={ref as RefObject<Mesh>}>
      <boxGeometry args={[1.5, 1.125, 0.02]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

function Plane({}) {
  const [ref] = usePlane(() => ({
    position: [0, 0, 0],
    args: [32, 32],
    rotation: [-Math.PI / 2, 0, 0],
    mass: 0,
  }))

  return (
    <mesh ref={ref as RefObject<Mesh>}>
      <planeGeometry args={[32, 32]} />
      <meshStandardMaterial color='white' transparent opacity={0.0} />
    </mesh>
  )
}
export default function CannonPhysicExperience() {
  return (
    <>
      <OrbitControls
        enableDamping={true}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={-Math.PI / 2}
      />
      <ambientLight color='#ffffff' />
      <Physics>
        {Array.from({ length: 50 }).map((_, i) => (
          <Sphere
            key={i}
            position={[
              Math.random() * 20 - 10,
              Math.random() * 10 + 5,
              Math.random() * 20 - 10,
            ]}
            angularVelocity={[
              Math.random() * 5 - 2.5,
              Math.random() * 5 - 2.5,
              Math.random() * 5 - 2.5,
            ]}
            angularDamping={Math.random() * 0.2 + 0.4}
            velocity={[0, -Math.random() * 5 - 2, 0]}
            friction={Math.random() * 0.2 + 0.1}
            restitution={Math.random() * 0.5 + 0.2}
          />
        ))}

        <Plane />
      </Physics>
    </>
  )
}
