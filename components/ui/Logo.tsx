import React from 'react';
import { Image, ImageStyle, StyleSheet, ViewStyle } from 'react-native';

interface LogoProps {
  size?: number;
  style?: ImageStyle | ViewStyle;
  variant?: 'default' | 'transparent';
}

const Logo: React.FC<LogoProps> = ({ size = 80, style, variant = 'default' }) => {
  const source = variant === 'transparent' 
    ? require('../../assets/images/icon-transparent.png')
    : require('../../assets/images/icon.png');

  return (
    <Image
      source={source}
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

