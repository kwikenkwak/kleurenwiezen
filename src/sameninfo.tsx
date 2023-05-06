import { SamenData } from './pointcalculation'
import StandardModalPage from './StandardModalPage'
import React from 'react'
import { Multiselect } from './Multiselect'
import Choose from './Choose'

export interface SamenPageProps {
  data: SamenData
  setData: (data: SamenData) => void
  toNext: () => void
  toPrev: () => void
}

export const SamenSpelers = ({ data, setData, toNext, toPrev }: SamenPageProps) => {
  const onChange = (newSelected: string[]) => {
    const newData = data.slice() as SamenData
    newData[2] = newSelected
    setData(newData)
  }
  return (
    <StandardModalPage
      title={`Wie gingen er samen?`}
      toNext={data[2].length == 2 ? toNext : undefined}
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

export const SamenSlagenTarget = ({ data, setData, toNext, toPrev }: SamenPageProps) => {
  const onChange = (newSelected: string) => {
    const newData = data.slice() as SamenData
    newData[3] = Number(newSelected)
    setData(newData)
    toNext()
  }
  return (
    <StandardModalPage
      title={`Voor hoeveel slagen gingen ${data[2][0]} en ${data[2][1]}?`}
      toPrev={toPrev}
      body={
        <Choose
          options={Array.from(Array(6).keys()).map(i => (i + 8).toString())}
          onChoose={onChange}
        />
      }
    />
  )
}
export const SamenSlagenBehaald = ({ data, setData, toNext, toPrev }: SamenPageProps) => {
  const onChange = (newSelected: string) => {
    const newData = data.slice() as SamenData
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
export const createSamenInfo = (
  data: SamenData,
  setData: (data: SamenData) => void,
  toNext: () => void,
  toPrev: () => void
) => {
  return [
    <SamenSpelers
      data={data}
      setData={setData}
      toNext={toNext}
      toPrev={toPrev}
    />,
    <SamenSlagenTarget
      data={data}
      setData={setData}
      toNext={toNext}
      toPrev={toPrev}
    />,
    <SamenSlagenBehaald
      data={data}
      setData={setData}
      toNext={toNext}
      toPrev={toPrev}
    />,
  ]
}
