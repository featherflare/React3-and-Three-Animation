import { useTexture } from '@react-three/drei'
import smokeImg from '../../assets/images/smoke.png'
import { useEffect, useMemo, useState } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import fragmentShader from './fragment.glsl'
import vertexShader from './vertex.glsl'
import estImg from '../../assets/images/est.png'
import devilImg from '../../assets/images/devil.png'
import $ from 'jquery'
import { Elastic, gsap } from 'gsap'

export default function WaveReflectEffectExperience() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useFrame((state, delta) => {
    state.scene.background = new THREE.Color(0x000000)
    state.camera.updateProjectionMatrix()
    state.scene.rotation.x += (mouse.x - state.scene.rotation.x) * 0.05
    state.scene.rotation.y += (mouse.y - state.scene.rotation.y) * 0.05
  })

  const [est] = useLoader(THREE.TextureLoader, [estImg])
  const [devil] = useLoader(THREE.TextureLoader, [devilImg])

  const data = useMemo(() => ({
    extensions: {
      derivatives: '#extension GL_OES_standard_derivatives : enable',
    },
    uniforms: {
      time: { type: 'f', value: 0 },
      blend: { type: 'f', value: 0 },
      original: {
        type: 't',
        value: est,
      },
      target: {
        type: 't',
        value: devil,
      },
    },
    transparent: true,
    fragmentShader,
    vertexShader,
  }))

  useEffect(() => {
    addEventListener('mousemove', onMousemove)
  }, [])

  function onMousemove(e) {
    var x = (e.clientX - innerWidth / 2) / (innerWidth / 2) / 2
    var y = (e.clientY - innerHeight / 2) / (innerHeight / 2) / 2
    setMouse({ x: x, y: y })
  }

  $('body').on('click', () => {
    console.log(data)
    if ($('body').hasClass('done')) {
      gsap.to(data.uniforms.blend, 2, {
        value: 0,
      })
      $('body').removeClass('done')
    } else {
      gsap.to(data.uniforms.blend, 2, {
        value: 1,
        ease: Elastic.easeOut.config(1, 0.3),
      })
      $('body').addClass('done')
    }
  })

  return (
    <>
      <mesh>
        <planeGeometry args={[1, 1, 200, 200]} />
        <shaderMaterial attach='material' {...data} />
      </mesh>
    </>
  )
}
