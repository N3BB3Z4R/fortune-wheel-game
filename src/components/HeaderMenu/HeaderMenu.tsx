import { useGameStatus } from 'context/GameStatusContext'
import { useEffect, useState } from 'react'

const HeaderMenu = () => {
  const { isGameStarted, startGame, playerTurn } = useGameStatus()
  const [howManyPlayers, setHowManyPlayers] = useState(0)

  useEffect(() => {
    if (isGameStarted) {
      console.log('Game started')
    }
  }, [isGameStarted])

  const askHowManyPlayers = () => {
    let players
    do {
      players = Number(prompt('How many players? (1-4)'))
    } while (!(players >= 1 && players <= 4))

    console.log('players', players)
    setHowManyPlayers(parseInt(players))
  }

  useEffect(() => {
    if (howManyPlayers > 0) {
      startGame(
        howManyPlayers,
        'CUANDO TE PONES CALCETINES DIFERENTES',
        'tip: PROBLEMAS CON LA ROPA'
      )
    }
  }, [howManyPlayers])

  return (
    <div className="flex w-full items-center justify-between bg-gray-600 p-4 text-white">
      <button className="" onClick={askHowManyPlayers}>
        INICIAR PARTIDA
      </button>
      <div className="flex flex-col items-end justify-center">
        <div>
          <span>JUGADORES: {howManyPlayers}</span>
        </div>
        <div>
          <span>TURNO: Player {playerTurn}</span>
        </div>
      </div>
    </div>
  )
}
export default HeaderMenu
