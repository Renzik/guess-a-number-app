import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  Platform,
  TouchableOpacity,
} from 'react-native';

const CustomButton = ({ children, style, onPress }) => {
  let ButtonComponent = TouchableOpacity;

  Platform.Version >= 21 ? (ButtonComponent = TouchableNativeFeedback) : null;

  return (
    <View style={styles.buttonContainer}>
      <ButtonComponent onPress={onPress}>
        <View style={{ ...styles.button, ...style }}>
          <Text style={styles.text}>{children}</Text>
        </View>
      </ButtonComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  buttonContainer: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  text: {
    color: 'white',
    fontFamily: 'open-sans',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default CustomButton;
