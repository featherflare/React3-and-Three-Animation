import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Rain from '../pages/RainEffect/rain'
import Nebular from '../pages/NebularEffect/nebular'
import Space from '../pages/SpaceWarpEffect/space'
import MovingTriangle from '../pages/MovingTriangle/movingTriangle'
import Distortion from '../pages/DistortionImg/distortion'

export const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/rain', element: <Rain /> },
  { path: '/nebular', element: <Nebular /> },
  { path: '/space', element: <Space /> },
  { path: '/movTri', element: <MovingTriangle /> },
  { path: '/distortion', element: <Distortion /> },
])
