import React from 'react'
import { Multiselect } from './Multiselect'
import { GameData } from './pointcalculation'
import StandardModalPage from './StandardModalPage'
import { useCurrentGame } from './store'

export interface PlayerChooserPageProps {
  data: GameData
  setData: (data: GameData) => void
  toNext: () => void
  toPrev: () => void
}

export const PlayerChooserPage = ({ data, setData, toNext, toPrev }: PlayerChooserPageProps) => {
  const { players, setPreviousPlayers, alertPlayerChoose } = useCurrentGame()
  const onChange = (selected: string[]) => {
    const newData = data.slice()
    newData[1] = selected
    setPreviousPlayers(selected)
    setData(newData as GameData)
  }
  const onGoNext = () => {
    alertPlayerChoose()
    toNext()
  }
  const selected = data[1]
  const canGoToNext = data[1].length == 4
  return (
    <StandardModalPage
      title={'Wie speelde er mee?'}
      toPrev={toPrev}
      toNext={canGoToNext ? onGoNext : undefined}
      body={
        <Multiselect
          options={players.map(p => p.name)}
          selected={selected}
          onChange={onChange}
        />
      }
    />
  )
}

export default PlayerChooserPage
