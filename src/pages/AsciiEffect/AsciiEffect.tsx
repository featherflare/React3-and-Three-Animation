import { useEffect } from 'react'
import '../../assets/styles/ascii.scss'
import ASC from './Ascii'

export default function AsciiEffect() {
  useEffect(() => {
    new ASC()
  }, [])

  return <></>
}
