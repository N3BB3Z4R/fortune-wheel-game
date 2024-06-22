import { useGameStatus } from 'context/GameStatusContext'
import PlayerBoardItem from './PlayerBoardItem'
import { useEffect } from 'react'

const PlayersBoard = () => {
  const {
    isGameStarted,
    numberOfPlayers,
    phrase,
    lettersRevealed,
    tip,
    playerTurn,
    players, // Obtén la lista de jugadores
    startGame,
    nextPlayer,
    increaseScore,
    throwRoulette,
    buyLetter
  } = useGameStatus()

  const wannaThrowRoulette = () => {
    throwRoulette()
    console.log('result roulette', randomNumber)
  }

  const wannaBuyLetter = () => {
    const whatLetter = prompt('Which Letter Do You Wanna Buy?')
    if (whatLetter === null) wannaBuyLetter()
    const isLetterAlreadyPurchased = lettersRevealed?.find((letter) => {
      letter.toUpperCase() === whatLetter.toUpperCase()
    })
    if (!isLetterAlreadyPurchased) {
      buyLetter(whatLetter)
    }
  }

  useEffect(() => {
    console.log('lettersRevealed', lettersRevealed)
  }, [lettersRevealed])

  return (
    <div className="flex flex-col bg-gray-600">
      {isGameStarted ? (
        <>
          <div className="flex w-full justify-between bg-gray-600 p-4">
            <div className="flex gap-2">
              <button className="btn btn-link" onClick={wannaBuyLetter}>
                Buy Letter
              </button>
              <button className="btn btn-link" onClick={wannaBuyLetter}>
                Solve?
              </button>
              <button className="btn btn-link" onClick={wannaBuyLetter}>
                Use Bonus Card
              </button>
              {/* <div className="flex items-center justify-center px-4 text-xl font-semibold text-gray-200">
                {lettersRevealed.map((letter) => (
                  <span key={letter}>{letter}</span>
                ))}
              </div> */}
            </div>
            <div className="flex gap-2">
              <div className="flex items-center justify-center px-4 text-xl font-semibold text-gray-200">
                TURN {playerTurn}
              </div>
              <button className="btn btn-link" onClick={nextPlayer}>
                Next Turn
              </button>
            </div>
          </div>
          <div>
            <div className="flex flex-wrap items-start justify-start gap-4 p-4">
              {players.map((player) => (
                <PlayerBoardItem key={player.playerNumber} player={player} />
              ))}
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}
export default PlayersBoard
