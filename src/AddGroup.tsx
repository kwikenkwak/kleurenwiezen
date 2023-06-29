import React, { useState } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'

import AddGroupSvg from '../icons/addgroup.svg'

import { colors } from './colors'
import Input from './Input'
import Modal from './Modal'
import StandardModalPage from './StandardModalPage'
import { useGames } from './store'

export const AddGroup = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const { addGame } = useGames()
  const [name, setName] = useState('')
  const onAdd = () => {
    if (name) {
      setModalVisible(!modalVisible)
      addGame(name)
    }
  }
  return (
    <>
      <Pressable
        style={styles.buttonWrapper}
        onPress={() => setModalVisible(true)}
      >
        <AddGroupSvg color={colors.BACKGROUND} />
      </Pressable>
      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <StandardModalPage
          title={'Voeg een groep toe'}
          body={
            <View style={styles.wrapper}>
              <Input
                autoFocus={true}
                placeholder={'De naam van de nieuwe groep'}
                onChangeText={n => setName(n)}
                onSubmitEditing={onAdd}
                style={styles.input}
              />
              <Pressable
                style={styles.button}
                onPress={onAdd}
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
  buttonWrapper: {
    backgroundColor: colors.TINT,
    borderRadius: 10,
    width: 70,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
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

export default AddGroup
