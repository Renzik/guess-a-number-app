import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Header from './components/Header';
import StartGame from './screens/StartGame.screen';

export default function App() {
  return (
    <View style={styles.screen}>
      <Header title={'Guess a Number'} />
      <StartGame />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
