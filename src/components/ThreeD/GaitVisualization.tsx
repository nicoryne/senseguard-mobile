import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../../utils/colors';
import { FONTS } from '../../utils/fonts';

interface Props {
  symmetry: number;
  stability: number;
}

const GaitVisualization: React.FC<Props> = ({ symmetry, stability }) => (
  <View style={styles.container}>
    <View style={styles.column}>
      <Text style={styles.label}>Symmetry</Text>
      <Text style={styles.score}>{symmetry}%</Text>
    </View>
    <View style={styles.divider} />
    <View style={styles.column}>
      <Text style={styles.label}>Stability</Text>
      <Text style={styles.score}>{stability}%</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface.background,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  column: {
    alignItems: 'center',
    flex: 1,
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: COLORS.surface.tertiary,
  },
  label: {
    ...FONTS.bodySmall,
    color: COLORS.neutral.medium,
    marginBottom: 6,
  },
  score: {
    ...FONTS.h2,
    color: COLORS.primary,
  },
});

export default GaitVisualization;

