import { Picker } from '@react-native-picker/picker'
import React, { useState } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'

import { colors } from './colors'
import Input from './Input'
import Modal from './Modal'
import StandardModalPage from './StandardModalPage'
import { useCurrentGame } from './store'

export interface EditPlayerProps {
  player: string
  visible: boolean
  setVisible: (visible: boolean) => void
}

export const EditPlayer = ({ player, visible, setVisible }: EditPlayerProps) => {
  const { players, editPlayers } = useCurrentGame()
  const oldPos = players.findIndex(p => p.name === player) + 1
  const [newName, setNewName] = useState(player)
  const [newScore, setNewScore] = useState(players[oldPos].score)
  const [newPos, setNewPos] = useState(oldPos)
  const isCorrect = newName !== ''
  const onConfirmChanges = () => {
    const newPlayers = players.map(p => ({ ...p }))
    const changed = newPlayers[oldPos - 1]
    changed.score = newScore
    changed.name = newName
    if (newPos !== oldPos) {
      newPlayers.splice(oldPos - 1, 1)
      newPlayers.splice(newPos - 1, 0, changed)
    }
    editPlayers(newPlayers)
  }
  return (
    <>
      <Modal
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <StandardModalPage
          title={'Speler aanpassen'}
          body={
            <View style={styles.wrapper}>
              <View style={styles.editItem}>
                <Text style={styles.editItemTitle}>Naam</Text>
                <Input
                  autoFocus={true}
                  placeholder={'Naam van de speler'}
                  onChangeText={setNewName}
                  value={newName}
                  style={styles.input}
                />
              </View>

              <View style={styles.editItem}>
                <Text style={styles.editItemTitle}>Score</Text>
                <Input
                  autoFocus={true}
                  placeholder={'Score'}
                  inputMode={'numeric'}
                  onChangeText={s => setNewScore(Number(s))}
                  value={newScore.toString()}
                  style={styles.input}
                />
              </View>
              <View style={styles.editItem}>
                <Text style={styles.editItemTitle}>Positie</Text>
                <View style={styles.pickerWrapper}>
                  <Picker
                    selectedValue={newPos}
                    onValueChange={pos => setNewPos(pos)}
                  >
                    {players.map((_, idx) => (
                      <Picker.Item
                        value={idx + 1}
                        key={idx}
                        label={(idx + 1).toString()}
                      />
                    ))}
                  </Picker>
                  <View style={styles.pickerBorder} />
                </View>
              </View>
              <Pressable
                style={styles.button}
                onPress={() => {
                  if (isCorrect) {
                    setVisible(!visible)
                    onConfirmChanges()
                  }
                }}
              >
                <Text style={styles.textStyle}>Opslaan</Text>
              </Pressable>
            </View>
          }
        />
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  pickerWrapper: {
    flexGrow: 1,
  },
  editItem: {
    flexDirection: 'row',
    gap: 20,
  },
  editItemTitle: {
    fontSize: 20,
    marginTop: 25,
    width: 70,
    color: colors.PRIMARY,
  },
  pickerBorder: {
    borderBottomWidth: 3,
    borderBottomColor: colors.PRIMARY,
    width: '100%',
  },
  input: {
    flexGrow: 1,
    marginTop: 10,
    fontSize: 20,
    borderBottomWidth: 3,
  },
  wrapper: {
    justifyContent: 'space-between',
    height: '100%',
  },
  button: {
    borderRadius: 5,
    padding: 10,
    marginTop: 15,
    backgroundColor: colors.BACKGROUND,
    borderWidth: 3,
  },
  textStyle: {
    color: colors.PRIMARY,
    textAlign: 'center',
  },
})

export default EditPlayer
