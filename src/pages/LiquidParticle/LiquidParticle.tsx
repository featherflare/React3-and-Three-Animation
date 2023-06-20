import { MutableRefObject, useEffect, useRef } from 'react'
import '../../assets/styles/App.css'

export default function LiquidParticle() {
  const cRef: MutableRefObject<any> = useRef()

  const dots: any[] = []

  function draw(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, innerWidth, innerHeight)
    dots.forEach((e, index) => {
      e.move()
      e.draw(ctx)

      if (e.vel.x < 0.1) {
        dots.splice(index, 1)
      }
    })
  }

  useEffect(() => {
    const ctx: CanvasRenderingContext2D = cRef.current.getContext('2d')

    cRef.current.onmousemove = function (e: any) {
      dots.push(new Particle(e.layerX, e.layerY))
    }

    for (var i = 0; i < 50; i++) {
      dots.push(
        new Particle(Math.random() * innerWidth, Math.random() * innerHeight)
      )
    }

    const render = () => {
      draw(ctx)
      requestAnimationFrame(render)
    }

    render()
  }, [draw])

  return (
    <>
      <canvas
        width={innerWidth}
        height={innerHeight}
        className='canvas'
        ref={cRef}
      ></canvas>
    </>
  )
}

class Particle {
  private pos
  private radius
  private vel
  private life

  constructor(x: any, y: any) {
    this.pos = { x, y }
    this.pos.x = x
    this.pos.y = y
    this.radius = 30 + Math.random() * 10
    this.vel = { x, y }
    this.vel.x = Math.random() * 2 - 1
    this.vel.y = Math.random() * 2 - 1

    this.life = 0
  }

  move() {
    this.life++

    if (this.radius > 3) this.radius *= 0.99
    this.vel.x *= 0.99
    this.vel.y *= 0.99

    this.pos.x += this.vel.x
    this.pos.y += this.vel.y

    if (this.life % 16 === 0) {
      //let newP = new Particle(this.pos.x,this.pos.y);
      //dots.push(newP);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#ffffff'
    ctx.beginPath()
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.fill()
  }
}
