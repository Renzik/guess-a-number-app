import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

import BodyText from '../components/BodyText';
import CustomButton from '../components/CustomButton';

import theme from '../../constants/colors';

const GameOver = ({ totalRounds, userNum, onNewGame }) => {
  return (
    <View style={styles.screen}>
      <BodyText>THE GAME IS OVER!</BodyText>
      <View style={styles.imageContainer}>
        <Image
          fadeDuration={1000}
          source={
            require('../../assets/success.png')
            // {
            //   uri: 'https://images.pexels.com/photos/1366909/pexels-photo-1366909.jpeg',
            // }
          }
          style={styles.image}
          resizeMode='cover'
          onError={err => console.log('image not loaded', err)}
        />
      </View>
      <View style={styles.resultTextContainer}>
        <BodyText style={styles.resultText} numberOfLines={2}>
          RenzikBot needed <Text style={styles.highlight}>{totalRounds}</Text> rounds to guess the
          number <Text style={styles.highlight}>{userNum}</Text>.
        </BodyText>
      </View>
      <CustomButton style={styles.newGameBtn} onPress={() => onNewGame()}>
        NEW GAME
      </CustomButton>
      {/* <Button
        title='NEW GAME'
        onPress={() => {
          onNewGame();
        }}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: 30,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  highlight: {
    color: theme.primary,
    fontFamily: 'open-sans-bold',
    fontSize: 18,
  },
  resultTextContainer: {
    marginHorizontal: 30,
    marginVertical: 20,
  },
  resultText: {
    fontSize: 16,
    textAlign: 'center',
  },
  newGameBtn: {
    backgroundColor: theme.primary,
  },
});

export default GameOver;
