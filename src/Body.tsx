import { useState } from 'react'
import { Pressable, Text, ScrollView, StyleSheet, View, TouchableNativeFeedback } from 'react-native'
import RemoveSvg from '../icons/close.svg'
import { Player, useCurrentGame } from './store'
import BorderRightSvg from '../icons/borderright.svg'
import BorderLeftSvg from '../icons/borderleft.svg'
import FlagSvg from '../icons/flag.svg'
import { colors, ripple, ripple_small } from './colors'
import { AddGame } from './AddGame'
import { Shadow } from 'react-native-shadow-2'
import EditPlayer from './EditPlayer'
import Button from './Button'

interface PlayerScoreProps {
  player: Player
  remove: () => void
  isWinner: boolean
}

const PlayerScore = ({ player, remove, isWinner }: PlayerScoreProps) => {
  const [editingPlayer, setEditingPlayer] = useState(false)

  return (
    <>
      <Shadow
        distance={7}
        offset={[2, 2]}
        startColor={'#00000050'}
        endColor={colors.BACKGROUND}
      >
        <View style={{ borderRadius: 7 }}>
          <TouchableNativeFeedback
            onLongPress={() => setEditingPlayer(true)}
            delayPressIn={0}
            background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, .32)', false)}
          >
            <View style={styles.scoreBox}>
              <View style={styles.nameBox}>
                <View style={styles.nameAndFlag}>
                  {isWinner && <FlagSvg />}
                  <Text style={styles.name}>{player.name.toUpperCase()}</Text>
                </View>
                <Button
                  onPress={remove}
                  icon={<RemoveSvg />}
                />
              </View>
              <View style={styles.scoreTextBox}>
                <Text style={styles.score}>{player.score}</Text>
                <View style={styles.bordersBox}>
                  <BorderLeftSvg />
                  <BorderRightSvg />
                </View>
              </View>
            </View>
          </TouchableNativeFeedback>
        </View>
      </Shadow>

      <EditPlayer
        player={player.name}
        visible={editingPlayer}
        setVisible={setEditingPlayer}
      />
    </>
  )
}

const Body = () => {
  const { players, winners, removePlayer } = useCurrentGame()
  return (
    <>
      <View style={styles.wrapper}>
        <ScrollView>
          <View style={styles.scrollWrapper}>
            {players.map(p => (
              <PlayerScore
                key={p.name}
                player={p}
                isWinner={winners.includes(p.name)}
                remove={() => removePlayer(p.name)}
              />
            ))}
          </View>
        </ScrollView>
      </View>
      <View style={styles.addGameWrapper}>
        <AddGame />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  bordersBox: {
    flexDirection: 'row',
    flexGrow: 1,
    width: '100%',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
  },
  borderLeft: {
    width: 43,
    height: 26,
    borderLeftWidth: 3,
    borderBottomWidth: 3,
    borderColor: colors.PRIMARY,
    borderRadius: 3,
  },

  nameAndFlag: {
    flexDirection: 'row',
    gap: 10,
  },
  addGameWrapper: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  scrollWrapper: {
    flexGrow: 1,
    marginBottom: 160,
    gap: 15,
    paddingVertical: 10,
    alignItems: 'center',
  },
  wrapper: {
    flexGrow: 1,
    height: '100%',
  },
  scoreBox: {
    height: 158,
    width: 329,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 15,
    backgroundColor: colors.BACKGROUND,
    borderRadius: 7,
  },
  nameBox: {
    flexGrow: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    height: 43,
    borderBottomWidth: 3,
    borderColor: colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 37,
    textAlignVertical: 'bottom',
    fontWeight: '400',
    color: colors.PRIMARY,
  },
  scoreTextBox: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  score: {
    fontSize: 71,
    color: colors.PRIMARY,
  },
})

export default Body
