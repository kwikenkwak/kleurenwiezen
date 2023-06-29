import React from 'react'
import { StyleSheet, View } from 'react-native'

import Option from './Option'

export interface MultiSelectProps {
  options: string[]
  selected: string[]
  onChange: (value: string[]) => void
}

export const Multiselect = ({ options, selected, onChange }: MultiSelectProps) => {
  const change = (opt: string) => {
    if (selected.includes(opt)) onChange(selected.filter(p => opt !== p))
    else {
      const newSelected = [...selected, opt]
      newSelected.sort((a, b) => options.indexOf(a) - options.indexOf(b))
      onChange(newSelected)
    }
  }
  return (
    <View style={styles.wrapper}>
      {options.map(opt => (
        <Option
          key={opt}
          selected={selected.includes(opt)}
          value={opt}
          onPress={() => change(opt)}
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
