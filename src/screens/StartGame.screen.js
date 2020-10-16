import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';

import theme from '../../constants/colors';

import BodyText from '../components/BodyText';
import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import CustomButton from '../components/CustomButton';

const StartGame = props => {
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

    isNaN(chosenNum) || chosenNum <= 0 || chosenNum > 99
      ? Alert.alert('Invalid Number!', 'Number has to be between 1 and 99.', [
          { text: 'Okay', style: 'destructive', onPress: handleReset },
        ])
      : setConfirmed(true),
      setSelectedNum(chosenNum),
      setNum(''),
      Keyboard.dismiss();
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <View style={styles.screen}>
        <Card style={styles.summaryContainer}>
          <BodyText style={styles.afterConfirmButtonTitle}>You selected</BodyText>
          <NumberContainer>{selectedNum}</NumberContainer>
          <View style={styles.afterConfirmButtonContainer}>
            <CustomButton
              style={styles.selectedNumScreen}
              // btnAction={props.gameSwitch}
              onPress={() => props.gameSwitch(selectedNum)}>
              START GAME
            </CustomButton>
          </View>
          <View style={styles.afterConfirmButtonContainer}>
            <Button title='Retry Number' color={theme.secondary} onPress={handleReset} />
          </View>
        </Card>
      </View>
    );
  }

  return !confirmedOutput ? (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game! </Text>
        <Card style={styles.inputContainer}>
          <BodyText style={{ fontSize: 16 }}>Select a Number</BodyText>
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
  ) : (
    <>{confirmedOutput}</>
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
    fontFamily: 'open-sans-bold',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 15,
  },
  button: {
    width: '43%',
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  afterConfirmButtonContainer: {
    marginVertical: 10,
    width: 130,
  },
  afterConfirmButton: {
    width: '30%',
    marginVertical: 10,
  },
  afterConfirmButtonTitle: {
    fontSize: 20,
    marginVertical: 10,
  },
  selectedNumScreen: {
    backgroundColor: theme.primary,
  },
});

export default StartGame;
