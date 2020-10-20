import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import Header from './components/Header';
import StartGame from './screens/StartGame.screen';
import GameScreen from './screens/Game.screen';
import GameOver from './screens/GameOver.screen';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('../assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('../assets/fonts/OpenSans-Bold.ttf'),
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [loading, setLoading] = useState(false);

  if (!loading)
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setLoading(true)}
        onError={e => console.error(e)}
      />
    );

  const newGameHandler = () => {
    setUserNumber(null);
    setGuessRounds(0);
  };

  const startGameHandler = userNum => setUserNumber(userNum);

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  };

  let screenToRender;

  userNumber && guessRounds <= 0
    ? (screenToRender = <GameScreen userGuess={userNumber} onGameOver={gameOverHandler} />)
    : userNumber && guessRounds > 0
    ? (screenToRender = (
        <GameOver
          onGameOver={gameOverHandler}
          onNewGame={newGameHandler}
          totalRounds={guessRounds}
          userNum={userNumber}
        />
      ))
    : (screenToRender = <StartGame gameSwitch={startGameHandler} />);

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={'Guess a Number'} />
      {screenToRender}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
