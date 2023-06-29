import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Shadow } from 'react-native-shadow-2'

import RedoSvg from '../icons/redo.svg'
import UndoSvg from '../icons/undo.svg'

import AddPlayer from './AddPlayer'
import Button from './Button'
import { colors } from './colors'
import ManageGames from './ManageGames'
import { useCurrentGame } from './store'

const Header = () => {
  const { redo, undo, canRedo, canUndo, addPlayer } = useCurrentGame()
  return (
    <View>
      <Shadow
        distance={2}
        offset={[0, 2]}
      >
        <View style={styles.header}>
          <View style={styles.buttonGroup}>
            <ManageGames />
            <AddPlayer add={addPlayer} />
          </View>
          <View style={styles.buttonGroup}>
            <Button
              icon={<UndoSvg />}
              onPress={() => canUndo && undo()}
            />
            <Button
              icon={<RedoSvg />}
              onPress={() => canRedo && redo()}
            />
          </View>
        </View>
      </Shadow>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
    backgroundColor: colors.BACKGROUND,
    width: '100%',
  },
  buttonGroup: {
    flexDirection: 'row',
    marginHorizontal: 10,
    gap: 10,
    marginVertical: 8,
  },
})

export default Header
