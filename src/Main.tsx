import React from 'react'
import { StyleSheet, View } from 'react-native'
import Header from './Header'
import Body from './Body'
import { StatusBar } from 'react-native'
import { useStore } from './store'
import { colors } from './colors'

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
