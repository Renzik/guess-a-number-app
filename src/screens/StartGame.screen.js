import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
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
  const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);
  const [orientation, setOrientation] = useState(
    Dimensions.get('window').width > 500 ? true : false
  );
  console.log('portrait', orientation);
  const numInputHandler = inputText => {
    setNum(inputText.replace(/[^0-9]/g, ''));
  };

  const handleReset = () => {
    setNum('');
    setConfirmed(false);
  };

  useEffect(() => {
    const orientationTracker = () =>
      setOrientation(Dimensions.get('window').width > 500 ? true : false);
    Dimensions.addEventListener('change', orientationTracker);
    return () => Dimensions.removeEventListener('change');
  });

  useEffect(() => {
    const updateLayout = () => setButtonWidth(Dimensions.get('window').width / 4);
    Dimensions.addEventListener('change', updateLayout);
    return () => Dimensions.removeEventListener('change', updateLayout);
  });

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
      <ScrollView>
        <KeyboardAvoidingView behavior='position'>
          <View style={styles.screen}>
            <Card style={orientation ? styles.summaryContainerLandscape : styles.summaryContainer}>
              <View style={{ alignItems: 'center' }}>
                <BodyText style={styles.afterConfirmButtonTitle}>You selected</BodyText>
                <NumberContainer>{selectedNum}</NumberContainer>
              </View>
              <View>
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
              </View>
            </Card>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }

  return !confirmedOutput ? (
    <ScrollView>
      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={50}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.screen}>
            <Text style={styles.title}>Start a New Game!</Text>
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
                <View style={{ width: buttonWidth }}>
                  <Button title='Reset' color={theme.secondary} onPress={handleReset} />
                </View>
                <View style={{ width: buttonWidth }}>
                  <Button title='Confirm' color={theme.primary} onPress={handleConfirm} />
                </View>
              </View>
            </Card>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
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
  inputContainer: {
    width: '80%',
    maxWidth: '90%',
    minWidth: 300,
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  textInput: {
    width: 35,
    fontSize: 20,
    textAlign: 'center',
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  summaryContainerLandscape: {
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: Dimensions.get('window').height > 350 ? '68%' : '78%',
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
