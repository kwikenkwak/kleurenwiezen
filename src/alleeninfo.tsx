import { AlleenData } from './pointcalculation'
import StandardModalPage from './StandardModalPage'
import React from 'react'
import { Multiselect } from './Multiselect'
import Choose from './Choose'

export interface AlleenPageProps {
  data: AlleenData
  setData: (data: AlleenData) => void
  toNext: () => void
  toPrev: () => void
}

export const AlleenSpelers = ({ data, setData, toNext, toPrev }: AlleenPageProps) => {
  const onChange = (newSelected: string) => {
    const newData = data.slice() as AlleenData
    newData[2] = newSelected
    setData(newData)
    toNext()
  }
  return (
    <StandardModalPage
      title={`Wie ging er ${data[0]}?`}
      toPrev={toPrev}
      body={
        <Choose
          options={data[1]}
          onChoose={onChange}
        />
      }
    />
  )
}

export const AlleenSlagenTarget = ({ data, setData, toNext, toPrev }: AlleenPageProps) => {
  const onChange = (newSelected: string) => {
    const newData = data.slice() as AlleenData
    newData[3] = Number(newSelected)
    setData(newData)
    toNext()
  }
  return (
    <StandardModalPage
      title={`Voor hoeveel slagen ging ${data[2]}?`}
      toPrev={toPrev}
      body={
        <Choose
          options={Array.from(Array(4).keys()).map(i =>
            (Number(i) + (data[0] == 'alleen' ? 5 : 9)).toString()
          )}
          onChoose={onChange}
        />
      }
    />
  )
}
export const AlleenSlagenBehaald = ({ data, setData, toNext, toPrev }: AlleenPageProps) => {
  const onChange = (newSelected: string) => {
    const newData = data.slice() as AlleenData
    newData[4] = Number(newSelected)
    setData(newData)
    toNext()
  }
  return (
    <StandardModalPage
      title={`Hoeveel slagen heeft ${data[2]} behaald?`}
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
export const createAlleenInfo = (
  data: AlleenData,
  setData: (data: AlleenData) => void,
  toNext: () => void,
  toPrev: () => void
) => {
  return [
    <AlleenSpelers
      data={data}
      setData={setData}
      toNext={toNext}
      toPrev={toPrev}
    />,
    <AlleenSlagenTarget
      data={data}
      setData={setData}
      toNext={toNext}
      toPrev={toPrev}
    />,
    <AlleenSlagenBehaald
      data={data}
      setData={setData}
      toNext={toNext}
      toPrev={toPrev}
    />,
  ]
}
