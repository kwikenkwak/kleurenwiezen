import React, { ReactElement } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import Button from './Button'
import PrevSvg from '../icons/prev.svg'
import NextSvg from '../icons/next.svg'
import { colors } from './colors'
import CheckSvg from '../icons/selected.svg'
import { Shadow } from 'react-native-shadow-2'

export interface StandardModalPageProps {
  title: string
  toNext?: () => void
  toPrev?: () => void
  body: ReactElement
}

export const StandardModalPage = ({ title, toNext, toPrev, body }: StandardModalPageProps) => {
  return (
    <Shadow distance={70}>
      <View style={styles.wrapper}>
        <View style={styles.titleGroup}>
          <View style={styles.titleSide} />
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.bodyWrapper}>{body}</View>
        <View style={styles.buttons}>
          {toPrev ? (
            <Button
              style={styles.prev}
              onPress={toPrev}
              icon={<PrevSvg />}
            />
          ) : (
            <View style={styles.buttonPlaceholder} />
          )}
          <View style={styles.separator} />
          {toNext ? (
            <Button
              style={styles.next}
              onPress={toNext}
              icon={<NextSvg />}
            />
          ) : (
            <View style={styles.buttonPlaceholder} />
          )}
        </View>
      </View>
    </Shadow>
  )
}

const styles = StyleSheet.create({
  buttonPlaceholder: {
    height: 30,
    width: 30,
  },
  bodyWrapper: {
    height: 352,
    paddingVertical: 10,
  },
  separator: {
    backgroundColor: colors.PRIMARY,
    height: 3,
    flexGrow: 1,
  },
  wrapper: {
    backgroundColor: colors.BACKGROUND,
    borderRadius: 10,
    padding: 10,
    width: 310,
    height: 467,
    elevation: 40,
    paddingVertical: 15,
    paddingHorizontal: 17,
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderColor: colors.PRIMARY,
    borderBottomWidth: 3,
    paddingBottom: 7,
    height: 60,
  },
  title: {
    fontSize: 19,
    color: colors.PRIMARY,
  },
  titleSide: {
    width: 0,
    height: 26,
    borderColor: colors.PRIMARY,
    borderLeftWidth: 3,
  },
  buttons: {
    flexDirection: 'row',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  next: {
    marginLeft: 'auto',
  },
  prev: {
    marginRight: 'auto',
  },
  finish: {
    marginLeft: 'auto',
  },
})

export default StandardModalPage
