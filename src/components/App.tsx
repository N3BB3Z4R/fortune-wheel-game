import 'assets/tailwind.css'
import { GameStatusProvider } from 'context/GameStatusContext'
import HeaderMenu from './HeaderMenu/HeaderMenu'
import Board from './Board/Board'
import PlayersBoard from './PlayersBoard/PlayerBoard'

// Import GSAP
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

import { CustomEase } from 'gsap/CustomEase'
import { RoughEase, ExpoScaleEase, SlowMo } from 'gsap/EasePack'

import { Flip } from 'gsap/Flip'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Observer } from 'gsap/Observer'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { Draggable } from 'gsap/Draggable'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { EaselPlugin } from 'gsap/EaselPlugin'
import { PixiPlugin } from 'gsap/PixiPlugin'
import { TextPlugin } from 'gsap/TextPlugin'
import Roulette from './Roulette/Roulette'

gsap.registerPlugin(
  useGSAP,
  Flip,
  ScrollTrigger,
  Observer,
  ScrollToPlugin,
  Draggable,
  MotionPathPlugin,
  EaselPlugin,
  PixiPlugin,
  TextPlugin,
  RoughEase,
  ExpoScaleEase,
  SlowMo,
  CustomEase
)

function App() {
  return (
    <GameStatusProvider>
      <div className="relative box-border flex h-full w-screen flex-col justify-start overflow-hidden bg-gray-900">
        <HeaderMenu />
        <Board />
        <Roulette />
        <PlayersBoard />
      </div>
    </GameStatusProvider>
  )
}

export default App
