import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'
// import './Roulette.css'

const FortuneWheel = () => {
  const wheelRef = useRef(null)

  useEffect(() => {
    // Calcula los grados por sección
    const degreesPerSection = 360 / 24

    // Configura los puntos de anclaje para el Draggable en cada sección
    const anchors = Array.from(
      { length: 24 },
      (_, index) => index * degreesPerSection
    )

    if (!wheelRef.current) return

    // Configura Draggable con puntos de anclaje
    // Draggable.create('.wheel', {
    //   type: 'rotation',
    //   inertia: true,
    //   snap: anchors,
    //   throwResistance: 2000,
    //   maxDuration: 4,
    //   onThrowComplete: () => {
    //     // Determina la sección en la que se detuvo la ruleta
    //     const currentRotation = wheelRef.current._gsTransform.rotation % 360
    //     const sectionIndex = Math.floor(currentRotation / degreesPerSection)
    //     console.log('Se detuvo en la sección:', sectionIndex)

    //     // Gira la ruleta al ángulo de la sección correspondiente
    //     const targetRotation = sectionIndex * degreesPerSection
    //     gsap.to(wheelRef.current, {
    //       rotation: targetRotation,
    //       duration: 0.5,
    //       ease: 'power3.out'
    //     })
    //   }
    // })
    // }, [])
    // useEffect(() => {
    const transformer = gsap.utils.pipe(
      gsap.utils.wrap(0, 360),
      gsap.utils.mapRange(0, 360, 0, 1)
    )

    const numOfSections = 24
    const degrees = 360 / numOfSections

    Draggable.create('.wheel', {
      type: 'rotation',
      inertia: true,
      snap: function (endValue) {
        return Math.round(endValue / degrees) * degrees
      },
      throwResistance: 2000,
      maxDuration: 4,
      onThrowUpdate: function () {
        // Actualiza el progreso del ticker
        ticker.totalProgress(transformer(this.rotation))
        // Puedes obtener la velocidad también
        console.log(gsap.getProperty(this.target, 'rotation'))
      },
      onDrag: function () {
        // Actualiza el progreso del ticker durante el arrastre
        ticker.totalProgress(transformer(this.rotation))
      }
    })

    const ticker = gsap
      .to('.ticker', {
        transformOrigin: 'top center',
        keyframes: {
          rotation: [-60, 0, 0, 0]
        },
        repeat: numOfSections - 1,
        paused: true
      })
      .play() // Inicia la animación del ticker

    return () => {
      // Limpia los recursos cuando el componente se desmonta
      ticker.kill()
    }
  }, []) // Ejecuta solo una vez después de que el componente se monta

  const startSpin = () => {
    const rotationAmount = Math.random() * 360 * 5 + 360 * 5 // Girar al menos 5 vueltas + una cantidad aleatoria extra
    gsap.to(wheelRef.current, {
      rotation: rotationAmount,
      duration: 5, // Duración del giro
      ease: 'power4.inOut', // Efecto de aceleración/desaceleración
      onComplete: () => {
        // Aquí puedes agregar lógica para manejar el resultado del giro
        console.log('El giro ha finalizado')
      }
    })
  }

  // const handleSliceClick = (index) => {
  //   // Aquí puedes agregar la lógica para manejar las diferentes acciones
  //   console.log('Haz hecho clic en la sección', index)
  // }

  const renderWheelSections = () => {
    const actions = ['Pierdes turno', 'Bancarrota', 'Premio especial']

    const points = [
      25, 50, 25, 75, 25, 25, 50, 25, 100, 25, 50, 25, 75, 25, 100, 25, 25, 75,
      25, 50, 25, 75, 25, 300
    ]

    const numOfSections = 24
    const degrees = 360 / numOfSections

    return (
      <div className="flex items-center justify-center">
        <div className="container relative">
          <div className="ticker absolute -top-[2.5vmin] left-1/2 z-[2] h-[5vmin] w-[1vmin] bg-black"></div>
          <div className="absolute flex size-full items-center justify-center">
            <div className="z-10 flex aspect-square size-32 flex-wrap items-center justify-center rounded-full bg-blue-600 text-center text-white">
              La Ruleta de la Fortuna
            </div>
          </div>
          <div
            className="wheel aspect-square w-[50vmin] rounded-full"
            ref={wheelRef}
            style={{
              background: `repeating-conic-gradient(red 0deg 15deg, black 15deg 30deg, white 30deg 45deg, green 45deg 60deg, yellow 60deg 75deg, orange 75deg 90deg, purple 90deg 105deg, pink 105deg 120deg, cyan 120deg 135deg, magenta 135deg 150deg, lightblue 150deg 165deg, lightgreen 165deg 180deg, lightyellow 180deg 195deg, lightpink 195deg 210deg, lightcyan 210deg 225deg, lightgray 225deg 240deg, darkred 240deg 255deg, darkblue 255deg 270deg, darkgreen 270deg 285deg, yellow 285deg 300deg, darkorange 300deg 315deg, purple 315deg 330deg, darkcyan 330deg 345deg, darkmagenta 345deg 360deg, red 0deg 15deg, black 15deg 30deg, white 30deg 45deg, green 45deg 60deg, yellow 60deg 75deg, orange 75deg 90deg, purple 90deg 105deg, pink 105deg 120deg, cyan 120deg 135deg, magenta 135deg 150deg, lightblue 150deg 165deg, lightgreen 165deg 180deg, lightyellow 180deg 195deg, lightpink 195deg 210deg, lightcyan 210deg 225deg, lightgray 225deg 240deg, darkred 240deg 255deg, darkblue 255deg 270deg, darkgreen 270deg 285deg, green 285deg 300deg, darkorange 300deg 315deg, red 315deg 330deg, darkcyan 330deg 345deg, darkmagenta 345deg 360deg)`
            }}
          ></div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid min-h-full place-items-center">
      <div
        // ref={wheelRef}
        className="flex h-auto w-64 items-start justify-center"
      >
        {renderWheelSections()}
      </div>
      <button onClick={startSpin}>Girar</button>
    </div>
  )
}

export default FortuneWheel
