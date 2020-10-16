import React from 'react';
import { StyleSheet, Text } from 'react-native';

const BodyText = ({ children, style, ...otherProps }) => {
  return (
    <Text {...otherProps} style={{ ...styles.text, ...style }}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'open-sans',
  },
});

export default BodyText;
