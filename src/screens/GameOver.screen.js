import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const GameOver = ({ totalRounds, userNum, onGameOver, onNewGame }) => {
  return (
    <View style={styles.screen}>
      <Text>THE GAME IS OVER!</Text>
      <Text>Number of rounds: {totalRounds}</Text>
      <Text>Number was: {userNum}</Text>
      <Button
        title='NEW GAME'
        onPress={() => {
          onNewGame();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GameOver;
