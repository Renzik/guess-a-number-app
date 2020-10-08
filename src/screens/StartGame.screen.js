import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

import Card from '../components/Card';

const StartGame = () => {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Start a New Game! </Text>
      <Card style={styles.inputContainer}>
        <Text>Select a Number</Text>
        <TextInput />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title='Reset' color={'red'} />
          </View>
          <View style={styles.button}>
            <Button title='Confirm' />
          </View>
        </View>
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
  title: {
    fontSize: 20,
    marginVertical: 20,
  },
  inputContainer: {
    alignItems: 'center',
    width: 300,
    maxWidth: '80%',
  },
  buttonContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 15,
  },
  button: {
    width: '43%',
  },
});

export default StartGame;
