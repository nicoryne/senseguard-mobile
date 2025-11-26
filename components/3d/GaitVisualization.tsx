import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '../../lib/colors';
import { FONTS } from '../../lib/fonts';
import { DESIGN_TOKENS } from '../../lib/design-tokens';

interface Props {
  symmetry: number;
  stability: number;
}

const GaitVisualization: React.FC<Props> = ({ symmetry, stability }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return COLORS.success;
    if (score >= 60) return COLORS.warning;
    return COLORS.error;
  };

  const symmetryColor = getScoreColor(symmetry);
  const stabilityColor = getScoreColor(stability);

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <View style={styles.iconContainer}>
          <Ionicons name="git-merge" size={24} color={symmetryColor} />
        </View>
        <Text style={styles.label}>Symmetry</Text>
        <View style={styles.scoreContainer}>
          <LinearGradient
            colors={[symmetryColor, `${symmetryColor}80`]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.scoreCircle}
          >
            <Text style={styles.score}>{symmetry}%</Text>
          </LinearGradient>
        </View>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${symmetry}%`, backgroundColor: symmetryColor },
            ]}
          />
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.column}>
        <View style={styles.iconContainer}>
          <Ionicons name="shield-checkmark" size={24} color={stabilityColor} />
        </View>
        <Text style={styles.label}>Stability</Text>
        <View style={styles.scoreContainer}>
          <LinearGradient
            colors={[stabilityColor, `${stabilityColor}80`]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.scoreCircle}
          >
            <Text style={styles.score}>{stability}%</Text>
          </LinearGradient>
        </View>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${stability}%`, backgroundColor: stabilityColor },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: DESIGN_TOKENS.spacing.base,
  },
  column: {
    alignItems: 'center',
    flex: 1,
    gap: DESIGN_TOKENS.spacing.sm,
  },
  divider: {
    width: 1,
    height: 80,
    backgroundColor: COLORS.surface.tertiary,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: DESIGN_TOKENS.radius.md,
    backgroundColor: COLORS.surface.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    ...DESIGN_TOKENS.typography.bodySmall,
    color: COLORS.neutral.medium,
    fontWeight: '600',
  },
  scoreContainer: {
    marginVertical: DESIGN_TOKENS.spacing.xs,
  },
  scoreCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    ...DESIGN_TOKENS.shadows.md,
  },
  score: {
    ...DESIGN_TOKENS.typography.h2,
    color: COLORS.neutral.lightest,
    fontWeight: '700',
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: COLORS.surface.secondary,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
});

export default GaitVisualization;



