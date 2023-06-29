import React, { useState } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'

import AddPersonSvg from '../icons/addperson.svg'

import Button from './Button'
import { colors } from './colors'
import Input from './Input'
import Modal from './Modal'
import StandardModalPage from './StandardModalPage'
import { Player } from './store'

export interface AddPlayerProps {
  add: (player: Player) => void
}

export const AddPlayer = ({ add }: AddPlayerProps) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [name, setName] = useState('')
  const onSubmit = () => {
    if (name) {
      setModalVisible(!modalVisible)
      add({ name, score: 0 })
    }
  }
  return (
    <>
      <Button
        onPress={() => setModalVisible(true)}
        icon={<AddPersonSvg />}
      />
      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <StandardModalPage
          title={'Voeg een speler toe'}
          body={
            <View style={styles.wrapper}>
              <Input
                autoFocus={true}
                placeholder={'De naam van de nieuwe speler'}
                onChangeText={n => setName(n)}
                style={styles.input}
                onSubmitEditing={onSubmit}
              />
              <Pressable
                style={styles.button}
                onPress={onSubmit}
              >
                <Text style={styles.textStyle}>Voeg toe</Text>
              </Pressable>
            </View>
          }
        />
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    fontSize: 19,
    borderBottomWidth: 3,
  },
  wrapper: {
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

export default AddPlayer
