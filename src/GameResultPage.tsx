import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import SelectedSvg from '../icons/selected.svg'

import { colors } from './colors'
import { calculatePoints, GameData, PointsChange } from './pointcalculation'
import StandardModalPage from './StandardModalPage'

export interface GameResultPageProps {
  data: GameData
  addPoints: (data: PointsChange) => void
  toPrev: () => void
  onFinish: () => void
}

export interface ScoreBoxProps {
  name: string
  points: number
}

const ScoreBox = ({ name, points }: ScoreBoxProps) => {
  return (
    <View style={styles.scorebox}>
      <Text style={styles.player}>{name}</Text>
      <Text style={[styles.score, { color: points > 0 ? colors.WON : colors.LOSE }]}>{points}</Text>
    </View>
  )
}

export const GameResultPage = ({ data, addPoints, toPrev, onFinish }: GameResultPageProps) => {
  const score = calculatePoints(data)
  const onPressFinish = () => {
    addPoints(score.points)
    onFinish()
  }
  return (
    <StandardModalPage
      title={'De punten'}
      toPrev={toPrev}
      body={
        <View style={styles.container}>
          {Object.keys(score.points).map(player => (
            <ScoreBox
              key={player}
              name={player}
              points={score.points[player]}
            />
          ))}
          <Pressable
            style={styles.complete}
            onPress={onPressFinish}
          >
            <Text style={styles.completeText}>OKE</Text>
            <SelectedSvg color={colors.BACKGROUND} />
          </Pressable>
        </View>
      }
    />
  )
}

const styles = StyleSheet.create({
  completeText: {
    color: colors.BACKGROUND,
    fontSize: 30,
  },
  complete: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colors.TINT,
    marginTop: 60,
    width: '70%',
    alignSelf: 'center',
    paddingVertical: 5,
    paddingHorizontal: 15,
    elevation: 5,
  },
  container: {
    gap: 10,
  },
  scorebox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: 10,
    padding: 5,
    justifyContent: 'space-between',
  },
  player: {
    fontSize: 20,
    color: colors.PRIMARY,
  },
  score: {
    fontSize: 20,
    fontWeight: '600',
  },
})

export default GameResultPage
