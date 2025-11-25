import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../../utils/colors';
import { FONTS } from '../../utils/fonts';

const ThermalChart = () => (
  <View style={styles.container}>
    <Text style={styles.label}>Thermal Balance</Text>
    <LinearGradient
      colors={[
        COLORS.pressure.low,
        COLORS.pressure.moderate,
        COLORS.pressure.high,
        COLORS.pressure.critical,
      ]}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface.background,
    borderRadius: 16,
    padding: 16,
  },
  label: {
    ...FONTS.bodySmall,
    color: COLORS.neutral.dark,
    marginBottom: 12,
  },
  gradient: {
    height: 16,
    borderRadius: 12,
  },
});

export default ThermalChart;

