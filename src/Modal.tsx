import React from 'react'
import { View, Modal as ModalDefault, StyleSheet, ModalProps, Pressable } from 'react-native'
import { colors } from './colors'

const Modal = (props: ModalProps) => (
  <ModalDefault
    transparent={true}
    animationType={'fade'}
    visible={props.visible}
    onRequestClose={props.onRequestClose}
  >
    <Pressable
      style={styles.centeredView}
      onPress={props.onRequestClose}
    >
      <Pressable>{props.children}</Pressable>
    </Pressable>
  </ModalDefault>
)

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Modal
