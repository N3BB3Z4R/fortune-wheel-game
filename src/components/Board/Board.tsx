import { useGameStatus } from 'context/GameStatusContext'
import BoardItem from './BoardItem'

const Board = () => {
  const {
    isGameStarted,
    numberOfPlayers,
    lettersRevealed,
    phrase,
    tip,
    playerTurn,
    playerScore,
    startGame,
    nextPlayer,
    increaseScore
  } = useGameStatus()

  const letterExistsCss = (letter: string) => {
    const letterExists = phrase
      .slice(0)
      .split('')
      .some((incomeLetter) => {
        return incomeLetter.toLocaleUpperCase() === letter.toLocaleUpperCase()
      })
    console.log('this letter exists on phrase? ', letterExists, letter, phrase)
    return letterExists
  }

  return (
    <div className="grow">
      <div className="relative mx-auto flex w-full flex-wrap items-center justify-center gap-1 text-nowrap bg-gray-800 p-20">
        <div className="absolute left-2 top-2 flex gap-2 p-4 text-xl font-medium text-white">
          {lettersRevealed.map((letter) => (
            <div
              key={letter}
              className={
                letterExistsCss(letter) ? 'text-white' : 'text-red-400'
              }
            >
              {letter.toUpperCase()}
            </div>
          ))}
        </div>
        {isGameStarted &&
          phrase.split(' ').map((word, index) => (
            <div
              key={index}
              className="flex items-center justify-center gap-1 "
            >
              <div className="flex size-8 items-center justify-center rounded-md bg-gray-700 px-4 py-2 font-bold text-black md:size-12"></div>
              {word.split('').map((letter, index) => {
                return <BoardItem letter={letter} key={index} />
              })}
              <div className="flex size-8 items-center justify-center rounded-md bg-gray-700 px-4 py-2 font-bold text-black md:size-12"></div>
            </div>
          ))}
      </div>
      <div className="flex w-full -translate-y-7 justify-center text-xl text-white">
        <span className="rounded-lg bg-gray-600 px-6 py-2">{tip}</span>
      </div>
    </div>
  )
}
export default Board
