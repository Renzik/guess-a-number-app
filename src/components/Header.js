import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';

import theme from '../../constants/colors';

const Header = ({ title }) => {
  return (
    <View
      style={{
        ...styles.headerBase,
        ...Platform.select({ ios: styles.headerIOS, android: styles.headerAndroid }),
      }}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBase: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIOS: {
    backgroundColor: theme.primary,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  headerAndroid: {
    backgroundColor: theme.primary,
  },
  headerTitle: {
    color: Platform.OS === 'android' ? '#ccc' : 'red',
    fontSize: 18,
    fontFamily: 'open-sans-bold',
  },
});

export default Header;
