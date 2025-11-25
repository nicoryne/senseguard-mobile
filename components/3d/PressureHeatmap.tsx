import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../../lib/colors';
import { FONTS } from '../../lib/fonts';

interface Props {
  zones: Array<{ label: string; value: number }>;
}

const PressureHeatmap: React.FC<Props> = ({ zones }) => (
  <View style={styles.container}>
    {zones.map((zone) => (
      <View key={zone.label} style={styles.row}>
        <Text style={styles.label}>{zone.label}</Text>
        <View style={styles.barTrack}>
          <View style={[styles.barFill, { width: `${zone.value}%` }]} />
        </View>
        <Text style={styles.value}>{zone.value}</Text>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface.background,
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  label: {
    width: 80,
    ...FONTS.bodySmall,
    color: COLORS.neutral.dark,
  },
  barTrack: {
    flex: 1,
    height: 10,
    backgroundColor: COLORS.surface.tertiary,
    borderRadius: 8,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
  },
  value: {
    width: 40,
    textAlign: 'right',
    ...FONTS.bodySmall,
    color: COLORS.neutral.medium,
  },
});

export default PressureHeatmap;



