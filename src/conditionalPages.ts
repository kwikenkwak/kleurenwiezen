import { AlleenData, GameData, MiserieData, SamenData, SoloData, TroelData } from './pointcalculation'
import { createSoloInfo } from './soloinfo'
import { createMiserieInfo } from './miserieinfo'
import { createAlleenInfo } from './alleeninfo'
import { createSamenInfo } from './sameninfo'
import { createTroelInfo } from './troelinfo'

export const createConditionalPages = (
  data: GameData,
  setData: (data: GameData) => void,
  toNext: () => void,
  toPrev: () => void
) => {
  const gamemode = data[0]
  if (['kleine miserie', 'grote miserie', 'open miserie'].includes(gamemode)) {
    return createMiserieInfo(data as MiserieData, setData, toNext, toPrev)
  } else if (gamemode == 'solo slim') {
    return createSoloInfo(data as SoloData, setData, toNext, toPrev)
  } else if (gamemode == 'alleen' || gamemode == 'abondance') {
    return createAlleenInfo(data as AlleenData, setData, toNext, toPrev)
  } else if (gamemode == 'samen') {
    return createSamenInfo(data as SamenData, setData, toNext, toPrev)
  } else if (gamemode == 'troel') {
    return createTroelInfo(data as TroelData, setData, toNext, toPrev)
  }
  return []
}
