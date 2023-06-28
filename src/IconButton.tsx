import React, { ReactElement } from 'react'
import { StyleProp, StyleSheet, ViewStyle } from 'react-native'
import Pressable from './Pressable'

export interface ButtonProps {
  onPress?: () => void
  icon: ReactElement
  rippleSize?: number
}

export const IconButton = ({ onPress, icon, rippleSize }: ButtonProps) => {
  return (
    <Pressable
      style={styles.main}
      onPress={onPress}
      radius={rippleSize || 20}
    >
      {icon}
    </Pressable>
  )
}

const styles = StyleSheet.create({ main: { padding: 9, justifyContent: 'center', alignItems: 'center' } })

export default IconButton
