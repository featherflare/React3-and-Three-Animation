import { OrbitControls, useTexture } from '@react-three/drei'
import earthImg from '../../assets/images/earth-small.jpg'
import earthUV from '../../assets/images/earthbump1k.jpg'
import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import Repeat from '../../utils/repeatFunc'
import fragmentShader from './fragment.glsl'
import vertexShader from './vertex.glsl'
import $ from 'jquery'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/all'

gsap.registerPlugin(Draggable)

export default function EarthMapExperience() {
  // var nullObject = document.createElement('div')
  // $('#container').append(nullObject)
  // $(nullObject).addClass('is-null')

  // Draggable.create(nullObject, {
  //   type: 'x,y',
  //   trigger: $('#container'),
  //   onDrag: doDrag,
  //   throwProps: true,
  //   onThrowUpdate: doDrag,
  //   bounds: { minY: 40, maxY: 480 },
  // })

  // function doDrag(e) {
  //   var posX = nullObject._gsTransform.x
  //   var posY = nullObject._gsTransform.y

  //   gsap.to('#one', 1.5, {
  //     x: posX,
  //     y: posY,
  //   })

  //   gsap.to(group.rotation, 1.5, {
  //     x: posY / 100,
  //     y: posX / 100,
  //   })
  // }

  const earth = useTexture(earthImg)
  const uv = useTexture(earthUV)
  const pointsRefs = useRef([])
  const gRef = useRef()
  pointsRefs.current = []
  const pointMaterial = useRef()

  let points = [
    {
      title: 'Bali',
      lat: -8.409518,
      long: 115.188919,
    },
    {
      title: 'Yevpatoriya',
      lat: 45.20091,
      long: 33.36655,
    },
    {
      title: 'Kyiv',
      lat: 50.431782,
      long: 30.516382,
    },
    {
      title: 'New York',
      lat: 40.73061,
      long: -73.968285,
    },
    {
      title: 'Managua',
      lat: 12.136389,
      long: -86.251389,
    },
    {
      title: 'Sydney',
      lat: -33.865143,
      long: 151.215256,
    },
    {
      title: 'Berlin',
      lat: 52.520645,
      long: 13.409779,
    },
    {
      title: 'Lisboa',
      lat: 38.736946,
      long: -9.142685,
    },
  ]

  const addToRefs = (el) => {
    if (el && !pointsRefs.current.includes(el)) {
      pointsRefs.current.push(el)
    }
  }

  function randn_bm() {
    var u = 0,
      v = 0
    while (u === 0) u = Math.random()
    while (v === 0) v = Math.random()
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
  }

  function calcPosFromLatLonRad(lat, lon, radius) {
    var phi = (90 - lat) * (Math.PI / 180)
    var theta = (lon + 180) * (Math.PI / 180)

    let x = -(radius * Math.sin(phi) * Math.cos(theta))
    let z = radius * Math.sin(phi) * Math.sin(theta)
    let y = radius * Math.cos(phi)

    console.log([x, y, z])
    return [x, y, z]
  }

  let time = 0
  useFrame((state) => {
    time++
    // gRef.current.rotation.x = time / 100
    pointsRefs.current.forEach((el) => {
      let conj = new THREE.Quaternion()
      conj.copy(gRef.current.quaternion)
      conj.conjugate()

      el.quaternion.multiplyQuaternions(conj, state.camera.quaternion)
    })
  })

  const data = useMemo(() => ({
    uniforms: {
      time: { value: 0 },
      hover: { value: 0 },
    },
    transparent: true,
    fragmentShader,
    vertexShader,
  }))

  const [positions] = useMemo(() => {
    let positions = []
    let R = 26
    points.forEach((p, i) => {
      let pos = calcPosFromLatLonRad(p.lat, p.long, R)

      positions[i] = [pos[0], pos[1], pos[2]]
    })

    return [positions]
  }, [])

  return (
    <>
      <ambientLight color='#404040' intensity={5} />
      <OrbitControls />
      <group ref={gRef}>
        <mesh>
          <sphereGeometry args={[25, 132, 132]} />
          <meshPhongMaterial
            map={earth}
            displacementMap={uv}
            displacementScale={10}
          />
        </mesh>
        <Repeat numTimes={25}>
          {(j) => (
            <mesh key={j} position={positions[j]} ref={addToRefs}>
              <planeGeometry args={[1, 1]} />
              <shaderMaterial ref={pointMaterial} attach='material' {...data} />
            </mesh>
          )}
        </Repeat>
      </group>
    </>
  )
}
