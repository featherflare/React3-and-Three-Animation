import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Rain from '../pages/RainEffect/rain'
import Nebular from '../pages/NebularEffect/nebular'
import Space from '../pages/SpaceWarpEffect/space'
import MovingTriangle from '../pages/MovingTriangle/movingTriangle'
import Distortion from '../pages/DistortionImg/distortion'
import SvgTo3D from '../pages/SVGTo3D/svgTo3D'
import MandalaEffect from '../pages/MandalaEffect/mandalaEffect'
import CustomScrollAndClipCssProperty from '../pages/CustomScrollAndClipCssProperty/CustomScrollAndClipCssProperty'
import ChrismasTree from '../pages/ChrismasTree/ChrismasTree'
import ParticleBlobing from '../pages/ParticleBlobing/ParticleBlobing'
import LiquidParticle from '../pages/LiquidParticle/LiquidParticle'
import EarthMap from '../pages/EarthMap/EarthMap'
import TextDecompiled from '../pages/TextDecompiled/TextDecompiled'
import AsciiEffect from '../pages/AsciiEffect/AsciiEffect'
import EmojiAnimation from '../pages/EmojiAnimation/EmojiAnimation'
import WaveAndReflectEffect from '../pages/WaveAndReflectEffect/WaveAndReflect'

export const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/rain', element: <Rain /> },
  { path: '/nebular', element: <Nebular /> },
  { path: '/space', element: <Space /> },
  { path: '/movTri', element: <MovingTriangle /> },
  { path: '/distortion', element: <Distortion /> },
  { path: '/svgto3d', element: <SvgTo3D /> },
  { path: '/mandalaEffect', element: <MandalaEffect /> },
  {
    path: '/customScroll',
    element: <CustomScrollAndClipCssProperty />,
  },
  {
    path: '/chrismasTree',
    element: <ChrismasTree />,
  },
  {
    path: '/particleBlobing',
    element: <ParticleBlobing />,
  },
  {
    path: '/liquidParticle',
    element: <LiquidParticle />,
  },
  {
    path: '/earthMap',
    element: <EarthMap />,
  },
  {
    path: '/textDecompiled',
    element: <TextDecompiled />,
  },
  {
    path: '/asciiEffect',
    element: <AsciiEffect />,
  },
  {
    path: '/emojiAnimation',
    element: <EmojiAnimation />,
  },
  {
    path: '/waveAndReflectEffect',
    element: <WaveAndReflectEffect />,
  },
])
