import { PointsChange } from './pointcalculation'
import { createStore } from './zustandHelper'

export interface Settings {}

export interface Points {
  players: Player[]
  history: Player[][]
  historyIndex: number
  previousPlayers: string[]
  lastPlayerChoose: string
}

export interface Player {
  name: string
  score: number
}

export interface Store {
  settings: Settings
  games: { [key: string]: Points }
  currentGame: string
}

export interface StoreStore extends Store {
  set: (settings: Partial<Store>) => void
}

export const useStore = createStore<StoreStore>(
  set => ({
    settings: {},
    games: {
      Kleurenwiezen: {
        players: [],
        history: [[]],
        historyIndex: -1,
        previousPlayers: [],
        lastPlayerChoose: new Date().toISOString(),
      },
    },
    currentGame: 'Kleurenwiezen',
    set: set,
  }),
  {
    uuid: 'mainstore',
    version: 0.1,
  }
)

export const getWinners = (players: Player[]) => {
  if (!players.length) return []
  let maxPoints = players[0].score
  let maxNames = [players[0].name] as string[]
  players.forEach(p => {
    if (p.score > maxPoints) {
      maxNames = [p.name]
      maxPoints = p.score
    } else if (p.score == maxPoints) {
      maxNames.push(p.name)
      maxPoints = p.score
    }
  })
  return maxNames
}

export const useCurrentGame = () => {
  const { set, games, currentGame } = useStore()
  // useEffect(reset, [])
  const game = games[currentGame]
  const { players, history, historyIndex, previousPlayers, lastPlayerChoose } = game
  const winners = getWinners(players)

  const addState = (newPlayers: Player[], resetLastPlayerChoose = false) => {
    const newHistory = [...(historyIndex == -1 ? history : history.slice(0, historyIndex + 1)), newPlayers]
    set({
      games: {
        ...games,
        [currentGame]: {
          history: newHistory,
          historyIndex: -1,
          players: newPlayers,
          previousPlayers: resetLastPlayerChoose ? [] : previousPlayers,
          lastPlayerChoose: resetLastPlayerChoose ? Date.parse('2014').toString() : lastPlayerChoose,
        },
      },
    })
  }

  const addPlayer = (player: Player) => {
    const newPlayers = [...players, player]
    addState(newPlayers, true)
  }

  const addPoints = (points: PointsChange) => {
    const newPlayers: Player[] = []
    players.forEach(p => {
      newPlayers.push({ name: p.name, score: p.score + (points[p.name] || 0) })
    })
    addState(newPlayers)
  }

  const removePlayer = (name: string) => {
    const newPlayers = players.filter(p => p.name != name)
    addState(newPlayers, true)
  }
  const canRedo = historyIndex != -1 && historyIndex < history.length - 1
  const canUndo = (historyIndex == -1 && history.length > 1) || (historyIndex > 0 && history.length)

  const setPreviousPlayers = (newPlayers: string[]) => {
    set({
      games: {
        ...games,
        [currentGame]: { history, historyIndex, previousPlayers: newPlayers, players, lastPlayerChoose },
      },
    })
  }

  const undo = () => {
    if (!canUndo) return
    const newHistoryIndex = historyIndex == -1 ? history.length - 2 : historyIndex - 1
    const newPlayers = history[newHistoryIndex]
    set({
      games: {
        ...games,
        [currentGame]: {
          history,
          historyIndex: newHistoryIndex,
          players: newPlayers,
          previousPlayers,
          lastPlayerChoose,
        },
      },
    })
  }

  const redo = () => {
    if (!canRedo) return
    const newHistoryIndex = historyIndex + 1
    const newPlayers = history[newHistoryIndex]
    set({
      games: {
        ...games,
        [currentGame]: {
          history,
          historyIndex: newHistoryIndex == history.length - 1 ? -1 : newHistoryIndex,
          players: newPlayers,
          previousPlayers,
          lastPlayerChoose,
        },
      },
    })
  }

  const alertPlayerChoose = () => {
    set({
      games: {
        ...games,
        [currentGame]: {
          history,
          historyIndex,
          players,
          previousPlayers,
          lastPlayerChoose: new Date().toISOString(),
        },
      },
    })
  }

  const editPlayers = (players: Player[]) => {
    addState(players, true)
  }

  return {
    ...game,
    winners,
    players,
    addNewScore: addState,
    addPlayer,
    removePlayer,
    undo,
    redo,
    canUndo,
    canRedo,
    previousPlayers,
    setPreviousPlayers,
    addPoints,
    alertPlayerChoose,
    editPlayers,
  }
}

export const useGames = () => {
  const { set, games, currentGame } = useStore()
  const removeGame = (name: string) => {
    if (Object.keys(games).length <= 1) return
    const newGames = { ...games }
    delete newGames[name]
    set({ games: newGames })
    if (currentGame == name) {
      setCurrentGame(Object.keys(newGames)[0])
    }
  }

  const addGame = (name: string) => {
    const newGames = { ...games }
    newGames[name] = {
      players: [],
      history: [[]],
      historyIndex: -1,
      previousPlayers: [],
      lastPlayerChoose: new Date().toISOString(),
    }
    set({ games: newGames })
  }

  const setCurrentGame = (date: string) => {
    set({ currentGame: date })
  }
  return {
    games,
    removeGame,
    addGame,
    setCurrentGame,
    currentGame,
  }
}

export const useLastPlayerChoose = () => {}
