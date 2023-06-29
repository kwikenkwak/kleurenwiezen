import React from 'react'

import Choose from './Choose'
import { Multiselect } from './Multiselect'
import { TroelData } from './pointcalculation'
import StandardModalPage from './StandardModalPage'

export interface TroelPageProps {
  data: TroelData
  setData: (data: TroelData) => void
  toNext: () => void
  toPrev: () => void
}

export const TroelSpelers = ({ data, setData, toNext, toPrev }: TroelPageProps) => {
  const onChange = (newSelected: string[]) => {
    const newData = data.slice() as TroelData
    newData[2] = newSelected
    setData(newData)
  }
  return (
    <StandardModalPage
      title={`Wie gingen er samen troel?`}
      toNext={data[2].length === 2 ? toNext : undefined}
      toPrev={toPrev}
      body={
        <Multiselect
          options={data[1]}
          selected={data[2]}
          onChange={onChange}
        />
      }
    />
  )
}

export const TroelSlagenTarget = ({ data, setData, toNext, toPrev }: TroelPageProps) => {
  const onChange = (opt: string) => {
    const newData = data.slice() as TroelData
    newData[3] = opt === 'Ja' ? true : false
    toNext()
    setData(newData)
  }
  return (
    <StandardModalPage
      title={'Is er met de aas (of harten koning) uitgekomen?'}
      toPrev={toPrev}
      body={
        <Choose
          options={['Ja', 'Nee']}
          onChoose={onChange}
        />
      }
    />
  )
}
export const TroelSlagenBehaald = ({ data, setData, toNext, toPrev }: TroelPageProps) => {
  const onChange = (newSelected: string) => {
    const newData = data.slice() as TroelData
    newData[4] = Number(newSelected)
    setData(newData)
    toNext()
  }
  return (
    <StandardModalPage
      title={`Hoeveel slagen hebben ze behaald?`}
      toPrev={toPrev}
      body={
        <Choose
          options={Array.from(Array(14).keys()).map(i => i.toString())}
          onChoose={onChange}
        />
      }
    />
  )
}
export const createTroelInfo = (
  data: TroelData,
  setData: (data: TroelData) => void,
  toNext: () => void,
  toPrev: () => void
) => {
  return [
    <TroelSpelers
      data={data}
      setData={setData}
      toNext={toNext}
      toPrev={toPrev}
    />,
    <TroelSlagenTarget
      data={data}
      setData={setData}
      toNext={toNext}
      toPrev={toPrev}
    />,
    <TroelSlagenBehaald
      data={data}
      setData={setData}
      toNext={toNext}
      toPrev={toPrev}
    />,
  ]
}
