import React from 'react'
import { StyleSheet, View } from 'react-native'
import { StatusBar } from 'react-native'

import Body from './Body'
import { colors } from './colors'
import Header from './Header'
import { useStore } from './store'

const Main = () => {
  const { _hasHydrated } = useStore()
  if (!_hasHydrated) return null

  return (
    <View style={styles.main}>
      <StatusBar
        backgroundColor={colors.BACKGROUND}
        barStyle={'dark-content'}
      />
      <Header />
      <Body />
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    maxHeight: '100%',
    backgroundColor: colors.BACKGROUND,
  },
})

export default Main
