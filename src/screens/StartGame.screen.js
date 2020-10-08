import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import theme from '../../constants/colors';

import Card from '../components/Card';
import Input from '../components/Input';

const StartGame = () => {
  const [num, setNum] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNum, setSelectedNum] = useState();

  const numInputHandler = inputText => {
    setNum(inputText.replace(/[^0-9]/g, ''));
  };

  const handleReset = () => {
    setNum('');
    setConfirmed(false);
  };

  const handleConfirm = () => {
    const chosenNum = parseInt(num);

    chosenNum === NaN || chosenNum <= 0 || chosenNum > 99
      ? alert('Invalid Input')
      : setConfirmed(true),
      setSelectedNum(),
      setNum('');

    // setSelectedNum(+num);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game! </Text>
        <Card style={styles.inputContainer}>
          <Text>Select a Number</Text>
          <Input
            style={styles.textInput}
            blurOnSubmit
            autoCorrect={false}
            maxLength={2}
            autoCapitalize='none'
            keyboardType='number-pad'
            onChangeText={numInputHandler}
            value={num}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button title='Reset' color={theme.secondary} onPress={handleReset} />
            </View>
            <View style={styles.button}>
              <Button title='Confirm' color={theme.primary} onPress={handleConfirm} />
            </View>
          </View>
        </Card>
      </View>
    </TouchableWithoutFeedback>
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
  textInput: {
    width: 35,
    fontSize: 20,
    textAlign: 'center',
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
