export const gamemodes = [
  'alleen',
  'samen',
  'troel',
  'abondance',
  'solo slim',
  'kleine miserie',
  'grote miserie',
  'open miserie',
] as const

export const miseries = ['kleine miserie', 'grote miserie', 'open miserie'] as const

export type miserieType = (typeof miseries)[number]

export type gameType = (typeof gamemodes)[number]

export type MiserieData = ['kleine miserie' | 'grote miserie' | 'open miserie', string[], string[], string[]]

export type SoloData = ['solo slim', string[], string, boolean]

export type AlleenData = ['alleen' | 'abondance', string[], string, number, number]

export type SamenData = ['samen', string[], string[], number, number]

export type TroelData = ['troel', string[], string[], boolean, number]

export type GameData = MiserieData | SoloData | AlleenData | TroelData | SamenData

export const getDefaultData = (value: gameType, players: string[]): GameData => {
  if (value == 'kleine miserie' || value == 'grote miserie' || value == 'open miserie')
    return [value, players, [], []]
  else if (value == 'solo slim') return [value, players, '', false]
  else if (value == 'alleen' || value == 'abondance') return [value, players, '', 0, 0]
  else if (value == 'troel') return [value, players, [], false, 0]
  else return [value, players, [], 0, 0]
}

export type PointsChange = { [key: string]: number }

export interface PointsInfo {
  points: PointsChange
  description: string
}

const distrPoints = (players: string[], othersPoints: number, goers: string[]) => {
  const res = {} as PointsChange
  if (goers.length == 2) {
    players.forEach(p => {
      if (goers.includes(p)) res[p] = -othersPoints
      else res[p] = othersPoints
    })
  } else {
    players.forEach(p => {
      if (goers.includes(p)) res[p] = -othersPoints * 3
      else res[p] = othersPoints
    })
  }
  return res
}

const mergePoints = (data: PointsChange[]) => {
  const res = data[0]
  data.slice(1).forEach(points => {
    Object.keys(points).forEach(player => {
      res[player] += points[player]
    })
  })
  return res
}

export const calculatePoints = (data: GameData): PointsInfo => {
  if (data[0] == 'kleine miserie' || data[0] == 'grote miserie' || data[0] == 'open miserie') {
    const changes: PointsChange[] = []
    data[2].forEach(goer => {
      const othersPoints = data[0] == 'kleine miserie' ? 6 : data[0] == 'grote miserie' ? 12 : 24
      changes.push(distrPoints(data[1], othersPoints * (data[3].includes(goer) ? -1 : 1), [goer]))
    })
    return { points: mergePoints(changes), description: '' }
  } else if (data[0] == 'solo slim') {
    const change = distrPoints(data[1], 60 * (data[3] ? -1 : 1), [data[2]])
    return { points: change, description: '' }
  } else if (data[0] == 'troel') {
    let change: PointsChange = {}
    if (data[4] == 13) {
      change = distrPoints(data[1], -30, data[2])
    } else {
      const gelukt = data[4] >= 8 + (data[3] ? 0 : 1)
      change = distrPoints(data[1], 16 * (gelukt ? -1 : 1), data[2])
    }
    return { points: change, description: '' }
  } else if (data[0] == 'alleen') {
    if (data[3] <= data[4]) {
      let othersPoints = 0
      if (data[3] == 8) {
        othersPoints = 7
      } else {
        const behaaldeSlagen = Math.min(8, data[4])
        othersPoints = behaaldeSlagen - 2
      }
      return { points: distrPoints(data[1], othersPoints * -1, [data[2]]), description: '' }
    } else {
      let othersPoints = [3, 4, 5, 7][data[3] - 5] + (data[3] - data[4])
      return { points: distrPoints(data[1], othersPoints, [data[2]]), description: '' }
    }
  } else if (data[0] == 'abondance') {
    if (data[3] <= data[4]) {
      const othersPoints = [10, 15, 20, 30][data[4] - 9]
      return { points: distrPoints(data[1], othersPoints * -1, [data[2]]), description: '' }
    } else {
      const othersPoints = [10, 15, 20, 30][data[3] - 9]
      return { points: distrPoints(data[1], othersPoints, [data[2]]), description: '' }
    }
  } else if (data[0] == 'samen') {
    if (data[3] <= data[4]) {
      const othersPoints = [8, 11, 14, 17, 20, 30][data[4] - 8]
      return { points: distrPoints(data[1], othersPoints * -1, data[2]), description: '' }
    } else {
      const othersPoints = data[3] == 13 ? 30 : [8, 11, 14, 17, 20][data[3] - 8] + 3 * (data[3] - data[4])
      return { points: distrPoints(data[1], othersPoints, data[2]), description: '' }
    }
  }
  // TYPESCRIPT IS TRASH
  return {} as PointsInfo
}
