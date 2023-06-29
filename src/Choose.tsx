import React from 'react'
import { StyleSheet, View } from 'react-native'

import Option from './Option'

export interface ChooseProps {
  options: readonly string[]
  onChoose: (value: string) => void
}

export const Choose = ({ options, onChoose }: ChooseProps) => {
  return (
    <View style={styles.wrapper}>
      {options.map(opt => (
        <Option
          key={opt}
          value={opt}
          selected={false}
          next={true}
          onPress={() => onChoose(opt)}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    rowGap: 5,
  },
})

export default Choose
