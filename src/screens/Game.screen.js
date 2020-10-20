import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import { ScreenOrientation } from 'expo';
import * as ScreenOrientation from 'expo-screen-orientation';

import theme from '../../constants/colors';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import CustomButton from '../components/CustomButton';
import BodyText from '../components/BodyText';

const generateNumBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNum = Math.floor(Math.random() * (max - min) + min);
  return randomNum === exclude ? generateNumBetween(min, max, exclude) : randomNum;
};

const renderListItem = (value, numOfRound) => (
  <View key={value} style={styles.listItem}>
    <BodyText style={styles.listItemText}>#{numOfRound}</BodyText>
    <BodyText style={styles.listItemText}>{value}</BodyText>
  </View>
);

const GameScreen = ({ userGuess, onGameOver }) => {
  // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

  const initialGuess = generateNumBetween(1, 100, userGuess);
  const [currentGuess, setcurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const [deviceHeight, setDeviceHeight] = useState(Dimensions.get('window').height);
  const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    userGuess === currentGuess ? onGameOver(pastGuesses.length) : null;
  }, [currentGuess, userGuess, onGameOver]);

  const nextGuessHandler = direction => {
    if (
      (direction === 'lower' && currentGuess < userGuess) ||
      (direction === 'greater' && currentGuess > userGuess)
    ) {
      Alert.alert("Don't Lie!", "You shouldn't do that, bitch.", [
        { text: 'Okay, fuck off', style: 'cancel' },
      ]);
      return;
    }

    direction === 'lower'
      ? (currentHigh.current = currentGuess)
      : (currentLow.current = currentGuess + 1);

    const nextGuess = generateNumBetween(currentLow.current, currentHigh.current, currentGuess);

    setcurrentGuess(nextGuess);
    setPastGuesses(currPastGuesses => [nextGuess, ...currPastGuesses]);
  };

  useEffect(() => {
    const orientationTracker = () => (
      setDeviceHeight(Dimensions.get('window').height),
      setDeviceWidth(Dimensions.get('window').width)
    );

    Dimensions.addEventListener('change', orientationTracker);
    return () => Dimensions.removeEventListener('change', orientationTracker);
  });

  if (deviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <Text>Opponent's Guess</Text>

        <View style={styles.controls}>
          <CustomButton style={styles.greaterBtn} onPress={() => nextGuessHandler('greater')}>
            <Ionicons name='md-add' size={24} color='white' />
          </CustomButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <CustomButton style={styles.lowerBtn} onPress={() => nextGuessHandler('lower')}>
            <Ionicons name='md-remove' size={24} color='white' />
          </CustomButton>
        </View>

        <View style={styles.listContainer}>
          <ScrollView contentContainerStyle={styles.list}>
            {pastGuesses.map((guess, i) => renderListItem(guess, pastGuesses.length - i))}
          </ScrollView>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <CustomButton style={styles.greaterBtn} onPress={() => nextGuessHandler('greater')}>
          <Ionicons name='md-add' size={24} color='white' />
        </CustomButton>
        <CustomButton style={styles.lowerBtn} onPress={() => nextGuessHandler('lower')}>
          <Ionicons name='md-remove' size={24} color='white' />
        </CustomButton>
      </Card>
      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, i) => renderListItem(guess, pastGuesses.length - i))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
    width: 300,
    maxWidth: '80%',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: Dimensions.get('window').width < 600 ? '40%' : '30%',
    alignItems: 'center',
  },
  greaterBtn: {
    backgroundColor: theme.primary,
    width: 60,
  },
  lowerBtn: {
    backgroundColor: theme.secondary,
    width: 60,
  },
  list: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  listContainer: {
    flex: 1,
    width: Dimensions.get('window').width > 375 ? '60%' : '80%',
  },
  listItem: {
    borderColor: '#ccc',
    padding: 15,
    borderWidth: 1,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default GameScreen;
