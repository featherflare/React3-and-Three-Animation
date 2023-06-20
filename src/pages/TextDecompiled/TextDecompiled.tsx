import { MutableRefObject, useEffect, useRef } from 'react'
import '../../assets/styles/App.css'
import { vec2 } from 'gl-matrix'

export default function TextDecompiled() {
  const cRef: MutableRefObject<any> = useRef()

  useEffect(() => {
    const ctx = cRef.current.getContext('2d')
    ctx.strokeStyle = 'rgba(255,255,255,0.8)'
    let cloud = new Cloud(ctx, cRef.current)
  }, [])

  return (
    <>
      <div className='text'>Hello!</div>
      <canvas
        ref={cRef}
        width={innerWidth}
        height={innerHeight}
        className='canvas'
      ></canvas>
    </>
  )
}

function setmag(t: number[], e: number[], n: number) {
  var i = e[0],
    o = e[1],
    r = i * i + o * o
  return (
    r > 0 &&
      ((r = 1 / Math.sqrt(r)), (t[0] = e[0] * r * n), (t[1] = e[1] * r * n)),
    t
  )
}
function limit(t: number[], e: number[], n: number) {
  var i = e[0],
    o = e[1],
    r = i * i + o * o
  return (
    r > n * n && ((r = 1 / Math.sqrt(r)), (t[0] = e[0] * n), (t[1] = e[1] * n)),
    t
  )
}

class Cloud {
  ctx: CanvasRenderingContext2D
  time
  numberofparticles
  particles: any[]
  mouseX
  mouseY
  width = innerWidth
  height = innerHeight

  constructor(ctx: CanvasRenderingContext2D, c: any) {
    this.ctx = ctx
    this.time = 0
    this.numberofparticles = 4000
    this.ctx.strokeStyle = 'rgba(255,255,255,0.8)'
    this.particles = []
    this.mouseX = 0
    this.mouseY = 0
    this.createparticles()
    this.update()
    this.bindmouse(c)
  }

  createparticles() {
    let self = this
    for (var i = 0; i < this.numberofparticles; i++) {
      let radius = Math.sqrt(200 * 200 * Math.random())
      let angle = 2 * Math.PI * Math.random()

      let x = this.width / 2 + radius * Math.sin(angle)
      let y = this.height / 2 + radius * Math.cos(angle)
      this.particles.push(new Thing(self.ctx, x, y))
    }
  }

  update() {
    let self = this
    this.time++
    this.ctx.clearRect(0, 0, this.width, this.height)
    this.particles.forEach((p) => {
      p.calculateForces(self.mouseX, self.mouseY)
      p.update(self.time)
      p.draw()
    })
    requestAnimationFrame(this.update.bind(this))
  }

  bindmouse(c: any) {
    let self = this
    c.addEventListener('mousemove', function (e: any) {
      self.mouseX = e.clientX
      self.mouseY = e.clientY
    })
  }
}

class Thing {
  ctx: CanvasRenderingContext2D
  pos
  original
  shifted
  vel
  acc
  maxForce
  maxSpeed
  constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
    this.ctx = ctx
    this.pos = vec2.fromValues(x, y)
    this.original = vec2.fromValues(x, y)
    this.shifted = vec2.fromValues(x + Math.random() * 2, y + Math.random() * 2)
    this.vel = vec2.fromValues(Math.random() * 2 - 1, Math.random() * 2 - 1)
    this.acc = vec2.fromValues(0, 0)
    this.maxForce = 0.05
    this.maxSpeed = 5
  }

  calculateForces(x: number, y: number) {
    // calc runaway
    let runawayForce = this.runaway(x, y)
    let goinhomeForce = this.goinghomeForce()

    // calc going home
    this.applyForce(runawayForce)
    this.applyForce(goinhomeForce)
  }

  applyForce(force: vec2) {
    this.acc = vec2.add(this.acc, this.acc, force)
  }

  runaway(x: number, y: number) {
    let dist: any = vec2.create()
    let mouse = vec2.fromValues(x, y)
    vec2.subtract(dist, mouse, this.pos)

    if (vec2.length(dist) < 100) {
      //
      setmag(dist, dist, this.maxSpeed)
      dist = vec2.scale(dist, dist, -1)

      let runawayforce: any = vec2.create()

      vec2.subtract(runawayforce, dist, this.vel)
      limit(runawayforce, runawayforce, this.maxForce)
      return runawayforce
    }

    return vec2.fromValues(0, 0)
  }

  goinghomeForce() {
    let dist: any = vec2.create()
    dist = vec2.subtract(dist, this.original, this.pos)
    let length = vec2.length(dist)
    let speedkoeff = 8
    if (length < 100) {
      speedkoeff = (this.maxSpeed * length) / 100
      setmag(dist, dist, speedkoeff)
    }
    let force: any = vec2.create()
    vec2.subtract(force, dist, this.vel)

    limit(force, force, this.maxForce)
    return force

    // return vec2.fromValues(0,0);
  }

  update() {
    vec2.add(this.pos, this.pos, this.vel)
    vec2.add(this.vel, this.vel, this.acc)
    vec2.scale(this.acc, this.acc, 0)
  }

  draw() {
    this.ctx.beginPath()

    this.ctx.moveTo(this.pos[0], this.pos[1])
    this.ctx.lineTo(this.shifted[0], this.shifted[1])

    this.ctx.stroke()
    this.ctx.closePath()
  }
}
