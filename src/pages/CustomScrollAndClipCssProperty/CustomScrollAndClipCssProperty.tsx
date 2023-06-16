import img1 from '../../assets/images/CustomScrollAndClipCssProperty/1.jpg'
import img2 from '../../assets/images/CustomScrollAndClipCssProperty/2.jpg'
import img3 from '../../assets/images/CustomScrollAndClipCssProperty/3.jpg'
import img4 from '../../assets/images/CustomScrollAndClipCssProperty/4.jpg'
import img5 from '../../assets/images/CustomScrollAndClipCssProperty/5.jpg'
import Repeat from '../../utils/repeatFunc'
import $ from 'jquery'

import '../../assets/styles/CustomScrollAndClipCssProperty.scss'
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function CustomScrollAndClipCssProperty() {
  const sections = [
    {
      img: img1,
      title: 'Slide1',
    },
    {
      img: img2,
      title: 'Slide2',
    },
    {
      img: img3,
      title: 'Slide3',
    },
    {
      img: img4,
      title: 'Slide4',
    },
    {
      img: img5,
      title: 'Slide5',
    },
    {
      img: img1,
      title: 'Slide1',
    },
    {
      img: img2,
      title: 'Slide2',
    },
    {
      img: img3,
      title: 'Slide3',
    },
    {
      img: img4,
      title: 'Slide4',
    },
    {
      img: img5,
      title: 'Slide5',
    },
    {
      img: img1,
      title: 'Slide1',
    },
    {
      img: img2,
      title: 'Slide2',
    },
    {
      img: img3,
      title: 'Slide3',
    },
    {
      img: img4,
      title: 'Slide4',
    },
    {
      img: img5,
      title: 'Slide5',
    },
  ]

  const [current, setCurrent] = useState<number>(
    (sections.length / 2 - 0.5) * innerHeight
  )
  const [lastS, setLastS] = useState<number>(0)
  const [lastTime, setLastTime] = useState<number>(0)
  const [isScrolling, setIsScrolling] = useState<boolean>(true)
  const [skew, setSkew] = useState<number>(0)
  const [liheight, setLiheight] = useState<number>(150)
  const [top, setTop] = useState<number>((innerHeight - liheight) / 2)
  let factor = innerHeight / liheight
  const [clip, setClip] = useState<string>(
    'rect( 0px,' + innerWidth + 'px, 150px,0)'
  )

  const mainRef: MutableRefObject<any> = useRef()
  const navRef: MutableRefObject<any> = useRef()
  const textRefs = useRef([])
  textRefs.current = []

  const handleWheel = (e: any) => {
    const currentTime = new Date().getTime()
    if (!isScrolling) setIsScrolling(true)
    let norm = normalizeWheel(e)
    let lenght = sections.length / 2 - 0.5

    setCurrent((prev) => prev - norm.spinY * 10)

    if (current < -lenght * innerHeight) setCurrent(-lenght * innerHeight)
    if (current > lenght * innerHeight) setCurrent(lenght * innerHeight)

    gsap.to(mainRef.current, 0.5, {
      y: current,
      overflow: 5,
      onUpdate: function () {
        gsap.to(navRef.current, {
          y:
            ((current - lenght * innerHeight) / (lenght * innerHeight * 2)) *
            2100,
          top: top,
        })
        setClip(
          'rect(' +
            (0 -
              ((current - lenght * innerHeight) / (lenght * innerHeight * 2)) *
                2100) +
            'px,' +
            innerWidth +
            'px,' +
            (10 -
              ((current - lenght * innerHeight) / (lenght * innerHeight * 2)) *
                2100 +
              liheight) +
            'px,0)'
        )
      },
      onComplete: function () {
        setTimeout(() => {
          gotoClosest()
        }, 200)
        setIsScrolling(false)
        setLastTime(currentTime)
      },
    })
  }

  var PIXEL_STEP = 10
  var LINE_HEIGHT = 40
  var PAGE_HEIGHT = 800

  function normalizeWheel(event: any) {
    var sX = 0,
      sY = 0,
      pX = 0,
      pY = 0

    // Legacy
    if ('detail' in event) {
      sY = event.detail
    }
    if ('wheelDelta' in event) {
      sY = -event.wheelDelta / 120
    }
    if ('wheelDeltaY' in event) {
      sY = -event.wheelDeltaY / 120
    }
    if ('wheelDeltaX' in event) {
      sX = -event.wheelDeltaX / 120
    }

    // side scrolling on FF with DOMMouseScroll
    if ('axis' in event && event.axis === event.HORIZONTAL_AXIS) {
      sX = sY
      sY = 0
    }

    pX = sX * PIXEL_STEP
    pY = sY * PIXEL_STEP

    if ('deltaY' in event) {
      pY = event.deltaY
    }
    if ('deltaX' in event) {
      pX = event.deltaX
    }

    if ((pX || pY) && event.deltaMode) {
      if (event.deltaMode === 1) {
        // delta in LINE units
        pX *= LINE_HEIGHT
        pY *= LINE_HEIGHT
      } else {
        // delta in PAGE units
        pX *= PAGE_HEIGHT
        pY *= PAGE_HEIGHT
      }
    }

    // Fall-back if spin cannot be determined
    if (pX && !sX) {
      sX = pX < 1 ? -1 : 1
    }
    if (pY && !sY) {
      sY = pY < 1 ? -1 : 1
    }

    return { spinX: sX, spinY: sY, pixelX: pX, pixelY: pY }
  }

  function velocity(e: any) {
    if (isScrolling) {
      let speed = current - lastS

      if (speed < -5) setSkew(-5)
      if (speed > 5) setSkew(5)
      if (Number.isNaN(speed)) setSkew(0)

      textRefs.current.forEach((el) => {
        gsap.to(el, 0.5, {
          skewY: -skew * 5,
          onComplete: () => {
            gsap.to(el, 0.5, {
              skewY: 0,
            })
          },
        })
      })

      setLastS(current)
    }
  }

  const addToRefs = (el: never) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el)
    }
  }

  function gotoClosest() {
    console.log(current / innerHeight)
    // let closest = Math.round(current / innerHeight)
    //     ? Math.round(current / innerHeight)
    //     : current / innerHeight
    // console.log(closest)
    // goto(closest)
  }

  function goto(n: any) {
    gsap.to(mainRef.current, 1, {
      y: innerHeight * n,
      overflow: 5,
      onComplete: function () {
        setCurrent(innerHeight * n)
        setIsScrolling(false)
      },
    })
    gsap.to(navRef.current, {
      y: (-n + 7) * -150,
      top: top,
    })
    setClip(
      'rect(' +
        (-n + 7) * 150 +
        'px,' +
        innerWidth +
        'px,' +
        ((-n + 7) * 150 + liheight) +
        'px,0)'
    )
  }

  useEffect(() => {
    $('.nav__2').css('clip', clip)
  }, [clip])

  return (
    <>
      <div
        ref={mainRef}
        className='main-scroller'
        onWheel={(e) => {
          handleWheel(e), velocity(e)
        }}
        style={{
          transform: `translate(0,${
            (sections.length / 2 - 0.5) * innerHeight
          }px)`,
        }}
      >
        <Repeat numTimes={sections.length}>
          {(j: number) => (
            <div
              key={j}
              className='section'
              style={{ backgroundImage: `url(${sections[j].img})` }}
            ></div>
          )}
        </Repeat>
      </div>

      <div className='nav' ref={navRef} style={{ top: top }}>
        <div className='nav__1'>
          <ul>
            <Repeat numTimes={sections.length}>
              {(j: number) => (
                <li key={j} ref={addToRefs}>
                  {sections[j].title}
                </li>
              )}
            </Repeat>
          </ul>
        </div>
        <div className='nav__2' ref={addToRefs}>
          <ul>
            <Repeat numTimes={sections.length}>
              {(j: number) => <li key={j}>{sections[j].title}</li>}
            </Repeat>
          </ul>
        </div>
      </div>
    </>
  )
}
