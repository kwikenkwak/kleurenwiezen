import React, { useState } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'

import CrossSvg from '../icons/close.svg'

import { colors } from './colors'
import Modal from './Modal'
import StandardModalPage from './StandardModalPage'
import { useGames } from './store'

export interface RemoveGroupProps {
  name: string
}

export const RemoveGroup = ({ name }: RemoveGroupProps) => {
  const { removeGame } = useGames()
  const [modalVisible, setModalVisible] = useState(false)
  return (
    <>
      <Pressable onPress={() => setModalVisible(true)}>
        <CrossSvg />
      </Pressable>
      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <StandardModalPage
          title={`Ben je zeker dat je de group '${name}' wil verwijderen?`}
          body={
            <View style={styles.wrapper}>
              <Pressable
                style={styles.button}
                onPress={() => {
                  setModalVisible(!modalVisible)
                }}
              >
                <Text style={styles.textStyle}>Nee niet verwijderen</Text>
              </Pressable>

              <Pressable
                style={styles.button}
                onPress={() => {
                  setModalVisible(!modalVisible)
                  removeGame(name)
                }}
              >
                <Text style={styles.textStyle}>Verwijderen</Text>
              </Pressable>
            </View>
          }
        />
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    gap: 10,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    backgroundColor: colors.BACKGROUND,
    borderWidth: 3,
  },
  textStyle: {
    color: colors.PRIMARY,
    textAlign: 'center',
  },
})

export default RemoveGroup
