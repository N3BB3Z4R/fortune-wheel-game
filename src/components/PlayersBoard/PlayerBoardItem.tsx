import { useGameStatus } from 'context/GameStatusContext'

const PlayerBoardItem = ({ player }) => {
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
    increaseScore,
    buyLetter
  } = useGameStatus()

  return (
    <div
      className={`flex flex-col items-start justify-center rounded-lg px-4 py-2 ${
        playerTurn !== player.playerNumber
          ? 'scale-100 bg-gray-700 text-white transition'
          : 'scale-110 bg-gray-300 text-gray-800'
      }`}
    >
      <span className="font-medium">Player {player.playerNumber}</span>
      <span className="">Points: {player.points}</span>
      <span className="">Bonus: {player.bonusCards}</span>
    </div>
  )
}
export default PlayerBoardItem
