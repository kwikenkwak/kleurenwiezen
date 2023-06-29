import React from 'react'
import { TextInput, TextInputProps, StyleSheet } from 'react-native'

import { colors } from './colors'

export const Input = (props: TextInputProps) => (
  <TextInput
    style={styles.input}
    underlineColorAndroid={'#0000'}
    {...props}
  />
)
const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.BACKGROUND,
    color: colors.PRIMARY,
    borderRadius: 5,
  },
})

export default Input
