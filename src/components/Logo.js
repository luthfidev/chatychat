import React, {memo} from 'react';
import {Image, StyleSheet, Dimensions} from 'react-native';
import logo from '../assets/bg.png';

export const Logo = () => <Image source={logo} style={styles.image} />;

const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  image: {
    width: screenWidth,
    height: 300,
    marginBottom: 12,
    borderBottomLeftRadius: 150,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
});

export default memo(Logo);
