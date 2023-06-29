import React, { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

import ManageGroupsSvg from '../icons/managegroups.svg'
import NextSvg from '../icons/next.svg'
import SelectedSvg from '../icons/selected.svg'

import AddGroup from './AddGroup'
import { colors } from './colors'
import Modal from './Modal'
import RemoveGroup from './RemoveGroup'
import StandardModalPage from './StandardModalPage'
import { useGames } from './store'

export const ManageGames = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const { currentGame, setCurrentGame, games } = useGames()

  const selectGroup = (name: string) => {
    setCurrentGame(name)
    setModalVisible(false)
  }
  return (
    <>
      <Pressable onPress={() => setModalVisible(true)}>
        <ManageGroupsSvg />
      </Pressable>
      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <StandardModalPage
          title={'Groepen'}
          body={
            <View style={styles.wrapper}>
              <ScrollView>
                <Pressable style={styles.gamesWrapper}>
                  {Object.keys(games).map(game => (
                    <Pressable
                      style={styles.gameItem}
                      key={game}
                    >
                      <View style={styles.group}>
                        <Text style={styles.gameTitle}>{game}</Text>
                        {currentGame === game && <SelectedSvg color={colors.TINT} />}
                      </View>
                      <View style={styles.group}>
                        {currentGame !== game && <NextSvg onPress={() => selectGroup(game)} />}
                        <RemoveGroup name={game} />
                      </View>
                    </Pressable>
                  ))}
                </Pressable>
              </ScrollView>
              <View style={styles.addGroupWrapper}>
                <AddGroup />
              </View>
            </View>
          }
        />
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  addGroupWrapper: {
    position: 'absolute',
    top: 265,
    right: 10,
  },
  gameTitle: {
    fontSize: 20,
    color: colors.PRIMARY,
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  gameItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: 10,
    padding: 5,
    justifyContent: 'space-between',
  },

  gamesWrapper: {
    gap: 7,
    flexGrow: 1,
    padding: 10,
  },
  wrapper: {
    height: 352,
  },
})

export default ManageGames
