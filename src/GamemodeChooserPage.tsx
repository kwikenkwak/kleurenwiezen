import React from 'react'
import Choose from './Choose'
import StandardModalPage from './StandardModalPage'
import { GameData, gamemodes, gameType, getDefaultData } from './pointcalculation'

export interface GamemodeChooserPageProps {
  setData: (data: GameData) => void
  data: GameData
  toNext: () => void
}

export const GamemodeChooserPage = ({ setData, data, toNext }: GamemodeChooserPageProps) => {
  const onChoose = (value: string) => {
    if (data[0] == value.toLowerCase()) toNext()
    else {
      setData(getDefaultData(value.toLowerCase() as gameType, data))
      toNext()
    }
  }
  return (
    <StandardModalPage
      title={'Wat is er gespeeld?'}
      body={
        <Choose
          options={gamemodes.map(i => i[0].toUpperCase() + i.slice(1))}
          onChoose={onChoose}
        />
      }
    />
  )
}
