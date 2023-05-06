import { MiserieData } from './pointcalculation'
import StandardModalPage from './StandardModalPage'
import React from 'react'
import { Multiselect } from './Multiselect'

export interface MiseriePageProps {
  data: MiserieData
  setData: (data: MiserieData) => void
  toNext: () => void
  toPrev: () => void
}

export const MiserieSpelers = ({ data, setData, toNext, toPrev }: MiseriePageProps) => {
  const onChange = (newSelected: string[]) => {
    const newData = data.slice() as MiserieData
    newData[2] = newSelected
    setData(newData)
  }
  return (
    <StandardModalPage
      title={`Wie ging er allemaal ${data[0]}?`}
      toNext={data[2].length > 0 ? toNext : undefined}
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

export const MiserieWinnaars = ({ data, setData, toNext, toPrev }: MiseriePageProps) => {
  const onChange = (newSelected: string[]) => {
    const newData = data.slice() as MiserieData
    newData[3] = newSelected
    setData(newData)
  }
  return (
    <StandardModalPage
      title={`Wie zijn ${data[0]} is gelukt?`}
      toNext={toNext}
      toPrev={toPrev}
      body={
        <Multiselect
          options={data[2]}
          selected={data[3]}
          onChange={onChange}
        />
      }
    />
  )
}

export const createMiserieInfo = (
  data: MiserieData,
  setData: (data: MiserieData) => void,
  toNext: () => void,
  toPrev: () => void
) => {
  return [
    <MiserieSpelers
      data={data}
      setData={setData}
      toNext={toNext}
      toPrev={toPrev}
    />,
    <MiserieWinnaars
      data={data}
      setData={setData}
      toNext={toNext}
      toPrev={toPrev}
    />,
  ]
}
