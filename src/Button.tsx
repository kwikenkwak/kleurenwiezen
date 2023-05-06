import React, { ReactElement } from 'react'
import { Pressable, StyleProp, ViewStyle } from 'react-native'

export interface ButtonProps {
  onPress?: () => void
  icon: ReactElement
  style?: StyleProp<ViewStyle>
  iconSize?: number
}

export const Button = ({ style, onPress, icon, iconSize }: ButtonProps) => {
  return (
    <Pressable
      style={style}
      onPress={onPress}
    >
      {React.cloneElement(icon, { width: iconSize || 30, height: iconSize || 30 })}
    </Pressable>
  )
}

export default Button
