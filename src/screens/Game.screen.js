import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

const generateNumBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNum = Math.floor(Math.random() * (max - min) + min);
  return randomNum === exclude ? generateNumBetween(min, max, exclude) : randomNum;
};

const GameScreen = ({ userGuess, onGameOver }) => {
  const [machineGuess, setMachineGuess] = useState(generateNumBetween(1, 100, userGuess));
  const [rounds, setRounds] = useState(0);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    userGuess === machineGuess ? onGameOver(rounds) : null;
  }, [machineGuess, userGuess, onGameOver]);

  const nextGuessHandler = direction => {
    if (
      (direction === 'lower' && machineGuess < userGuess) ||
      (direction === 'greater' && machineGuess > userGuess)
    ) {
      Alert.alert("Don't Lie!", "You shouldn't do that, bitch.", [
        { text: 'Okay, fuck off', style: 'cancel' },
      ]);
      return;
    }

    direction === 'lower'
      ? (currentHigh.current = machineGuess)
      : (currentLow.current = machineGuess);
    setMachineGuess(generateNumBetween(currentLow.current, currentHigh.current, machineGuess));
    setRounds(currRounds => currRounds + 1);
  };

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{machineGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title='Greater' onPress={() => nextGuessHandler('greater')} />
        <Button title='Lower' onPress={() => nextGuessHandler('lower')} />
      </Card>
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 300,
    maxWidth: '80%',
  },
});

export default GameScreen;
