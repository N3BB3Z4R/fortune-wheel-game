import { useGameStatus } from 'context/GameStatusContext'
import { gsap } from 'gsap'
import { useEffect, useState } from 'react'

const BoardItem = ({ letter }: { letter: string }) => {
  const [reveal, setReveal] = useState(false)
  const [showLetter, setShowLetter] = useState(false)

  const {
    isGameStarted,
    numberOfPlayers,
    lettersRevealed,
    phrase,
    tip,
    playerTurn,
    players, // Obtén la lista de jugadores
    startGame,
    nextPlayer,
    increaseScore
  } = useGameStatus()

  useEffect(() => {
    const isRevealed = lettersRevealed.find(
      (letterToAnalyze) =>
        letter.toUpperCase() === letterToAnalyze.toUpperCase()
    )
    if (isRevealed) {
      setReveal(true)
    }
  }, [lettersRevealed, letter])

  useEffect(() => {
    gsap.set(`.board-item-${letter}`, { rotationY: 180 })
    if (reveal) {
      gsap
        .to(`.board-item-${letter}`, {
          rotationY: 0,
          duration: 0.5,
          ease: 'power2.inOut'
        })
        .then(() => setShowLetter(true))
    }
  }, [reveal])

  return (
    <div
      className={`board-item-${letter} perspective flex size-8 items-center justify-center rounded-md px-2 py-1 font-bold transition md:size-12 ${
        showLetter
          ? 'rotate-z-0 bg-gray-100 text-black shadow-lg shadow-white/50 transition duration-500 ease-in-out'
          : 'rotate-z-180 bg-gray-400 text-transparent transition duration-500 ease-in-out'
      }`}
    >
      {showLetter ? letter : ''}
    </div>
  )
}
export default BoardItem
