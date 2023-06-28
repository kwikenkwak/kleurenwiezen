import React, { ReactNode } from 'react'
import { StyleProp, StyleSheet, TouchableNativeFeedback, View, ViewStyle } from 'react-native'

export interface PressableProps {
  onPress?: () => void
  style?: StyleProp<ViewStyle>
  children?: ReactNode
  radius?: number
}

export const Pressable = ({ style, onPress, children, radius }: PressableProps) => {
  return (
    <TouchableNativeFeedback
      style={null}
      onPress={onPress}
      background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, .32)', false, radius)}
    >
      <View style={style}>{children}</View>
    </TouchableNativeFeedback>
  )
}

export default Pressable
