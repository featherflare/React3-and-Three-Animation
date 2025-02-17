import { Component } from 'react'
import { Canvas } from '@react-three/fiber'
import CannonPhysicExperience from './experience'
import '../../../assets/styles/App.css'
import * as THREE from 'three'

interface State {
  aspect: number
}

export default class CannonPhysic extends Component<{}, State> {
  constructor(props: {}) {
    super(props)
    this.state = {
      aspect: window.innerWidth / window.innerHeight,
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize = () => {
    this.setState({
      aspect: window.innerWidth / window.innerHeight,
    })
  }

  render() {
    return (
      <Canvas
        shadows={true}
        className='canvas'
        camera={{
          fov: 70,
          aspect: this.state.aspect,
          near: 0.001,
          far: 1000,
          position: [0, 5, 10],
        }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          pixelRatio: window.devicePixelRatio,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
      >
        <CannonPhysicExperience />
      </Canvas>
    )
  }
}
