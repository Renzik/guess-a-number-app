import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const CustomButton = ({ children, style, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ ...styles.button, ...style }}>
        <Text style={styles.text}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  text: {
    color: 'white',
    fontFamily: 'open-sans',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default CustomButton;
