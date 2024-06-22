import { phrasesEs } from 'assets/phrases'
import { createContext, ReactNode, useContext, useState } from 'react'

// TODO: Make throw roulette and got points, bonus, or penalty

// TODO: Make end game when players lose all points
// TODO: Make end game when all letters are revealed
// TODO: Make end game when all players solve the phrase
// TODO: Make restart game when click on Iniciar Partida
// TODO: Refactor prompt modals
// TODO: Make HUD displays designs
// TODO: Make change turn and all the turn phases
// TODO: Make purchase vowels
// TODO: Make solve the phrase
// TODO: Make bonus cards get and use
// TODO: Separate the logics from the components
// TODO: Make Github readme and repository
// TODO: Implement animations
// TODO: Implement sounds
// TODO: Implement mobile responsive design
// TODO: Implement Language switcher
// TODO: Make ES and EN translations

// Define the type for a player
export type Player = {
  playerNumber: number
  points: number
  bonusCards: string[]
}

// Define the type for the game state
export type GameState = {
  isGameStarted: boolean
  numberOfPlayers: number
  phrase: string
  tip: string
  playerTurn: number
  players: Player[]
  lettersRevealed: string[]
  startGame: (numberOfPlayers: number, phrase: string, tip: string) => void
  nextPlayer: () => void
  increaseScore: () => void
  throwRoulette: () => void
  buyLetter: (letterToBuy: string) => void
}

// Define the context type
type GameStatusContextType = GameState

// Create the context
const GameStatusContext = createContext<GameStatusContextType>({} as GameState)

// Export initial game state for external use
export const initialGameState: GameState = {
  isGameStarted: false,
  numberOfPlayers: 0,
  phrase: '',
  tip: '',
  playerTurn: 1,
  players: [],
  lettersRevealed: [],
  startGame: () => {},
  nextPlayer: () => {},
  increaseScore: () => {},
  throwRoulette: () => {},
  buyLetter: () => {}
}

// Provider component
export function GameStatusProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState(initialGameState)
  const [choosenPhrase, setChoosenPhrase] = useState({
    id: 0,
    phrase: '',
    tip: ''
  })
  const initialPlayerPoints = 300

  // Function to start the game with the given parameters
  const startGame = (numberOfPlayers: number): void => {
    if (numberOfPlayers <= 0) {
      throw new Error('Number of players must be greater than 0')
    }
    const randomPhrasePick = () => {
      return phrasesEs.find(
        (phraseItem) =>
          phraseItem.id ===
          Math.floor(Math.random().toFixed(0) * phrasesEs.length)
      )
    }

    const choosenPhraseResult = randomPhrasePick()
    setChoosenPhrase(choosenPhraseResult)
    console.log('choosenPhrase', choosenPhraseResult)

    // Initialize player array with default values
    const players: Player[] = Array.from(
      { length: numberOfPlayers },
      (_, index) => ({
        playerNumber: index + 1,
        points: initialPlayerPoints,
        bonusCards: []
      })
    )
    setGameState((prevState) => ({
      ...prevState,
      isGameStarted: true,
      numberOfPlayers,
      lettersRevealed: [],
      phrase: choosenPhraseResult?.phrase,
      tip: choosenPhraseResult?.tip,
      players
    }))
  }

  // Function to move to the next player's turn
  const nextPlayer = (): void => {
    setGameState((prevState) => ({
      ...prevState,
      playerTurn: (prevState.playerTurn % prevState.numberOfPlayers) + 1
    }))
  }

  // Function to increase the score of the current player
  const increaseScore = (): void => {
    setGameState((prevState) => {
      const updatedPlayers = [...prevState.players]
      updatedPlayers[prevState.playerTurn].points += 100
      return {
        ...prevState,
        players: updatedPlayers
      }
    })
  }

  const throwRoulette = () => {
    setGameState((prevState: GameState) => {
      const randomNumber = Math.random()
    })
  }

  // Function to buy a letter and subtract 100 points from the player's score
  const buyLetter = (letterToBuy: string): void => {
    setGameState((prevState: GameState) => {
      const updatedPlayers = [...prevState.players]
      const currentPlayer = updatedPlayers[prevState.playerTurn - 1]
      if (currentPlayer.points >= 100) {
        const letterWasPurchasedBefore = prevState.lettersRevealed.find(
          (letter: string) => letter.toUpperCase() === letterToBuy.toUpperCase()
        )
        if (letterWasPurchasedBefore) {
          console.error('Letter was already purchased')
          currentPlayer.points -= 200
          return prevState
        }
        const letterExists = prevState.phrase
          .split('')
          .find(
            (letter: string) =>
              letter.toUpperCase() === letterToBuy.toUpperCase()
          )

        if (letterExists) {
          const howManyLetterInstances = prevState.phrase
            .split('')
            .filter(
              (letter: string) =>
                letter.toUpperCase() === letterToBuy.toUpperCase()
            ).length
          currentPlayer.points += howManyLetterInstances * 100
        }
        currentPlayer.points -= 100
        // Agrega la letra comprada al array lettersRevealed
        return {
          ...prevState,
          players: updatedPlayers,
          lettersRevealed: [...prevState.lettersRevealed, letterToBuy]
        }
      } else {
        console.error('Not enough points to buy the letter')
        return prevState
      }
    })
  }

  return (
    <GameStatusContext.Provider
      value={{
        ...gameState,
        startGame,
        nextPlayer,
        increaseScore,
        throwRoulette,
        buyLetter
      }}
    >
      {children}
    </GameStatusContext.Provider>
  )
}

// Custom hook to use the game status context
export function useGameStatus(): GameState {
  const context = useContext(GameStatusContext)
  if (!context) {
    throw new Error('useGameStatus must be used within a GameStatusProvider')
  }
  return context
}
