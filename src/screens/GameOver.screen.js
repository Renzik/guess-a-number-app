import React from 'react';
import { StyleSheet, Text, View, Button, Image, Dimensions, ScrollView } from 'react-native';

import BodyText from '../components/BodyText';
import CustomButton from '../components/CustomButton';

import theme from '../../constants/colors';

const GameOver = ({ totalRounds, userNum, onNewGame }) => {
  return (
    <ScrollView>
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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  imageContainer: {
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').width * 0.5,
    borderRadius: (Dimensions.get('window').width * 0.7) / 2,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: Dimensions.get('window').height / 30,
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
    marginVertical: Dimensions.get('window').height / 60,
  },
  resultText: {
    fontSize: Dimensions.get('window').height > 550 ? 20 : 14,
    textAlign: 'center',
  },
  newGameBtn: {
    backgroundColor: theme.primary,
  },
});

export default GameOver;
