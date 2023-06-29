import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'

import SelectedSvg from '../icons/selected.svg'
import NextSvg from '../icons/smallnext.svg'

import { colors } from './colors'

export interface OptionProps {
  value: string
  selected: boolean
  onPress: () => void
  next?: boolean
}

export const Option = ({ value, selected, onPress, next }: OptionProps) => {
  return (
    <Pressable
      style={styles.wrapper}
      onPress={onPress}
    >
      <Text style={styles.value}>{value}</Text>
      {selected ? <SelectedSvg color={colors.PRIMARY} /> : next && <NextSvg />}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    height: 40,
    width: '47%',
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 0,
    elevation: 3,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 3,
    backgroundColor: colors.BACKGROUND,
  },
  value: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.PRIMARY,
  },
})

export default Option
