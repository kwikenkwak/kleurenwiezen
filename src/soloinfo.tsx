import { SoloData } from './pointcalculation'
import StandardModalPage from './StandardModalPage'
import React from 'react'
import Choose from './Choose'

export interface SoloPageProps {
  data: SoloData
  setData: (data: SoloData) => void
  toNext: () => void
  toPrev: () => void
}

export const SoloSpeler = ({ data, setData, toNext, toPrev }: SoloPageProps) => {
  const onChange = (opt: string) => {
    const newData = data.slice() as SoloData
    newData[2] = opt
    setData(newData)
    toNext()
  }
  return (
    <StandardModalPage
      title={'Wie ging er solo slim?'}
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

export const SoloGewonnen = ({ data, setData, toNext, toPrev }: SoloPageProps) => {
  const onChange = (opt: string) => {
    const newData = data.slice() as SoloData
    newData[3] = opt == 'Ja' ? true : false
    toNext()
    setData(newData)
  }
  return (
    <StandardModalPage
      title={'Is het gelukt?!'}
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

export const createSoloInfo = (
  data: SoloData,
  setData: (data: SoloData) => void,
  toNext: () => void,
  toPrev: () => void
) => {
  return [
    <SoloSpeler
      data={data}
      setData={setData}
      toNext={toNext}
      toPrev={toPrev}
    />,
    <SoloGewonnen
      data={data}
      setData={setData}
      toNext={toNext}
      toPrev={toPrev}
    />,
  ]
}
