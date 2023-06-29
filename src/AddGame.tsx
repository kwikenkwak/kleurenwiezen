import React, { useEffect, useMemo, useState } from 'react'
import Button from './Button'
import AddGameSvg from '../icons/addgame.svg'
import Modal from './Modal'
import PlayerChooserPage from './PlayerChooserPage'
import { GameData, getDefaultData } from './pointcalculation'
import { useCurrentGame } from './store'
import { GamemodeChooserPage } from './GamemodeChooserPage'
import { createConditionalPages } from './conditionalPages'
import GameResultPage from './GameResultPage'
import { StyleSheet } from 'react-native'
import { colors } from './colors'

export const AddGame = () => {
  const { gameName, previousPlayers, addPoints, lastPlayerChoose } = useCurrentGame()
  const defaultData: GameData = ['troel', previousPlayers, [], false, 9]
  const [data, setData] = useState<GameData>(defaultData)
  const [modalVisible, setModalVisible] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    // When the game changes reset the selected players to the previousPlayers of this game
    setData(getDefaultData(data[0], previousPlayers))
  }, [gameName])

  const toNext = () => {
    setCurrentPage(p => {
      const hoursPassedSincePlayerChoose =
        (new Date().getTime() - new Date(lastPlayerChoose).getTime()) / 3_600_000
      return p == 0 && hoursPassedSincePlayerChoose < 2 ? p + 2 : p + 1
    })
  }
  const toPrev = () => {
    setCurrentPage(p => p - 1)
  }

  const conditionalPages = useMemo(() => createConditionalPages(data, setData, toNext, toPrev), [data])

  const onFinish = () => {
    setCurrentPage(0)
    setModalVisible(false)
  }

  const pages = [
    <GamemodeChooserPage
      setData={setData}
      data={data}
      toNext={toNext}
    />,
    <PlayerChooserPage
      toNext={toNext}
      setData={setData}
      data={data}
      toPrev={toPrev}
    />,
    ...conditionalPages,
    <GameResultPage
      data={data}
      addPoints={addPoints}
      onFinish={onFinish}
      toPrev={toPrev}
    />,
  ]

  return (
    <>
      <Button
        style={styles.button}
        iconSize={40}
        icon={<AddGameSvg style={styles.icon} />}
        onPress={() => setModalVisible(true)}
      />
      <Modal
        onRequestClose={() => onFinish()}
        visible={modalVisible}
      >
        {pages[currentPage]}
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 81,
    height: 81,
    backgroundColor: colors.TINT,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  icon: {
    position: 'absolute',
    top: 22,
    left: 22,
  },
})
