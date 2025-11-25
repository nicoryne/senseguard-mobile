import React from 'react';
import { Image, ImageStyle, StyleSheet, ViewStyle } from 'react-native';

interface LogoProps {
  size?: number;
  style?: ImageStyle | ViewStyle;
}

const Logo: React.FC<LogoProps> = ({ size = 80, style }) => {
  return (
    <Image
      source={require('../../assets/images/icon.png')}
      style={[styles.logo, { width: size, height: size }, style]}
      resizeMode="contain"
    />
  );
};

const styles = StyleSheet.create({
  logo: {
    borderRadius: 20,
  },
});

export default Logo;

